import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Project, StringId } from '../types'
import { PROJECTS } from '../data/projects'
import { useAudio } from './useAudio'

type PluckListener = (id: StringId, velocity: number) => void

interface GuitarContextValue {
  /** Corda cujo projeto está aberto */
  activeString: StringId | null
  activeProject: Project | null
  hoveredString: StringId | null
  setHoveredString: (id: StringId | null) => void
  /** Toca a corda (som + vibração) sem abrir projeto */
  pluck: (id: StringId, velocity?: number) => void
  /** Toca a corda e abre o projeto associado */
  select: (id: StringId) => void
  close: () => void
  /** O modelo 3D se inscreve aqui para vibrar sem re-renderizar o React */
  onPluck: (listener: PluckListener) => () => void
  sound: { enabled: boolean; toggle: () => void }
}

const GuitarContext = createContext<GuitarContextValue | null>(null)

export function GuitarProvider({ children }: { children: ReactNode }) {
  const [activeString, setActiveString] = useState<StringId | null>(null)
  const [hoveredString, setHoveredString] = useState<StringId | null>(null)
  const listeners = useRef(new Set<PluckListener>())
  const audio = useAudio()

  const pluck = useCallback(
    (id: StringId, velocity = 1) => {
      listeners.current.forEach((fn) => fn(id, velocity))
      audio.play(id, velocity)
    },
    [audio],
  )

  const select = useCallback(
    (id: StringId) => {
      pluck(id)
      setActiveString(id)
    },
    [pluck],
  )

  const close = useCallback(() => setActiveString(null), [])

  const onPluck = useCallback((listener: PluckListener) => {
    listeners.current.add(listener)
    return () => {
      listeners.current.delete(listener)
    }
  }, [])

  const value = useMemo<GuitarContextValue>(
    () => ({
      activeString,
      activeProject: PROJECTS.find((p) => p.string === activeString) ?? null,
      hoveredString,
      setHoveredString,
      pluck,
      select,
      close,
      onPluck,
      sound: { enabled: audio.enabled, toggle: audio.toggle },
    }),
    [activeString, hoveredString, pluck, select, close, onPluck, audio.enabled, audio.toggle],
  )

  return <GuitarContext.Provider value={value}>{children}</GuitarContext.Provider>
}

export function useGuitar() {
  const ctx = useContext(GuitarContext)
  if (!ctx) throw new Error('useGuitar precisa estar dentro de <GuitarProvider>')
  return ctx
}
