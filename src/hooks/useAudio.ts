import { useCallback, useEffect, useRef, useState } from 'react'
import type { StringId } from '../types'
import { GUITAR_STRINGS } from '../data/strings'

const STORAGE_KEY = 'edudev:sound'

function readPreference(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

/**
 * Síntese Karplus-Strong: um ruído curto circula por uma linha de atraso
 * do tamanho de um período da nota e é suavizado a cada volta, imitando
 * a energia de uma corda real se dissipando. Nenhum arquivo de áudio é baixado.
 */
function synthesizeString(ctx: BaseAudioContext, frequency: number): AudioBuffer {
  const sr = ctx.sampleRate
  const length = Math.floor(sr * 2.6)
  const buffer = ctx.createBuffer(1, length, sr)
  const out = buffer.getChannelData(0)

  const period = Math.max(2, Math.round(sr / frequency - 0.5))
  // cordas graves sustentam um pouco mais
  const decay = frequency < 150 ? 0.9965 : 0.9945

  // ruído inicial com passa-baixa simples: palhetada mais macia
  let last = 0
  for (let i = 0; i < period; i++) {
    const noise = Math.random() * 2 - 1
    last = last + 0.55 * (noise - last)
    out[i] = last
  }
  for (let i = period; i < length; i++) {
    out[i] = decay * 0.5 * (out[i - period] + out[i - period - 1 >= 0 ? i - period - 1 : 0])
  }

  // fade-out para não estalar no fim
  const fade = Math.floor(sr * 0.3)
  for (let i = 0; i < fade; i++) out[length - 1 - i] *= i / fade

  // normaliza
  let peak = 0
  for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(out[i]))
  if (peak > 0) for (let i = 0; i < length; i++) out[i] /= peak

  return buffer
}

export function useAudio() {
  const [enabled, setEnabled] = useState(readPreference)
  const ctxRef = useRef<AudioContext | null>(null)
  const bufferCache = useRef(new Map<StringId, AudioBuffer>())
  const busRef = useRef<GainNode | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
    } catch {
      /* armazenamento indisponível: só não lembra a preferência */
    }
  }, [enabled])

  // AudioContext só nasce no primeiro toque do usuário
  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return null
      const ctx = new Ctor()
      const bus = ctx.createGain()
      bus.gain.value = 0.32 // discreto
      const tone = ctx.createBiquadFilter()
      tone.type = 'lowpass'
      tone.frequency.value = 4200
      bus.connect(tone).connect(ctx.destination)
      ctxRef.current = ctx
      busRef.current = bus
    }
    if (ctxRef.current.state === 'suspended') void ctxRef.current.resume()
    return ctxRef.current
  }, [])

  const play = useCallback(
    (id: StringId, velocity = 1) => {
      if (!enabled) return
      const ctx = ensureContext()
      if (!ctx || !busRef.current) return
      const string = GUITAR_STRINGS.find((s) => s.id === id)
      if (!string) return

      let buffer = bufferCache.current.get(id)
      if (!buffer) {
        buffer = synthesizeString(ctx, string.frequency)
        bufferCache.current.set(id, buffer)
      }
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const gain = ctx.createGain()
      gain.gain.value = 0.35 + 0.65 * Math.min(1, velocity)
      source.connect(gain).connect(busRef.current)
      source.start()
    },
    [enabled, ensureContext],
  )

  const toggle = useCallback(() => setEnabled((v) => !v), [])

  return { enabled, toggle, play }
}
