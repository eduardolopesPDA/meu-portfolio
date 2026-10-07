import { useEffect, useMemo, useRef } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type { StringId } from '../../types'
import { GUITAR_STRINGS } from '../../data/strings'
import { useGuitar } from '../../hooks/useGuitar'
import { NUT_X, SADDLE_X, STRING_Z, stringY } from './dimensions'

const AMBER = new THREE.Color('#ffb547')
const HIT_DEPTH = 0.16

interface StringProps {
  id: StringId
  index: number
  gauge: number
  reducedMotion: boolean
}

function GuitarStringMesh({ id, index, gauge, reducedMotion }: StringProps) {
  const { onPluck, pluck, select, setHoveredString, hoveredString, activeString } = useGuitar()
  const meshRef = useRef<THREE.Mesh>(null)
  const vibration = useRef({ amplitude: 0, start: 0, glow: 0 })

  const layout = useMemo(() => {
    const a = new THREE.Vector2(SADDLE_X, stringY(index, true))
    const b = new THREE.Vector2(NUT_X, stringY(index, false))
    const length = a.distanceTo(b)
    const angle = Math.atan2(b.y - a.y, b.x - a.x)
    // distância até a corda vizinha define a área clicável
    const spacing = Math.abs(stringY(0, true) - stringY(1, true))
    return { length, angle, mid: a.clone().add(b).multiplyScalar(0.5), spacing }
  }, [index])

  const radius = 0.0055 + gauge * 0.0085
  const wound = index < 3

  const geometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(radius, radius, layout.length, 8, 120, true)
    g.userData.base = Float32Array.from(g.attributes.position.array as Float32Array)
    return g
  }, [radius, layout.length])

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: wound ? '#cdbb9e' : '#f1f2f4',
        envMapIntensity: 3,
        metalness: 0.75,
        roughness: wound ? 0.38 : 0.18,
        emissive: AMBER,
        emissiveIntensity: 0,
      }),
    [wound],
  )

  useEffect(
    () =>
      onPluck((plucked, velocity) => {
        if (plucked !== id) return
        vibration.current.amplitude = reducedMotion ? 0 : 0.03 * velocity * (0.6 + gauge * 0.6)
        vibration.current.start = performance.now() / 1000
        vibration.current.glow = 1
      }),
    [id, onPluck, gauge, reducedMotion],
  )

  const isHovered = hoveredString === id
  const isActive = activeString === id

  useFrame((_, delta) => {
    const v = vibration.current
    const t = performance.now() / 1000 - v.start

    // brilho: pico no toque, estável quando ativa, suave no hover
    const target = isActive ? 0.55 : isHovered ? 0.35 : 0
    v.glow = Math.max(target, v.glow - delta * 1.4)
    material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, v.glow, 0.25)

    const amp = v.amplitude * Math.exp(-t * 2.6)
    const pos = geometry.attributes.position as THREE.BufferAttribute
    const base = geometry.userData.base as Float32Array
    if (amp < 0.0004) {
      if (v.amplitude !== 0) {
        v.amplitude = 0
        pos.array.set(base)
        pos.needsUpdate = true
      }
      return
    }

    // onda estacionária: modo fundamental + 2º harmônico, presos nas pontas
    const w = 2 * Math.PI * (9 + (5 - index) * 1.4)
    const c1 = Math.cos(w * t)
    const c2 = Math.cos(w * 2.3 * t + 1)
    const arr = pos.array as Float32Array
    const L = layout.length
    for (let i = 0; i < arr.length; i += 3) {
      const u = (base[i + 1] + L / 2) / L
      const d = amp * (Math.sin(Math.PI * u) * c1 + 0.35 * Math.sin(2 * Math.PI * u) * c2)
      arr[i] = base[i] + d
    }
    pos.needsUpdate = true
  })

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHoveredString(id)
    document.body.style.cursor = 'pointer'
  }
  const handleOut = () => {
    setHoveredString(null)
    document.body.style.cursor = ''
  }
  // arrastar por cima das cordas com o botão pressionado = palhetada
  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    if (e.buttons === 1 || e.pointerType === 'touch') pluck(id, 0.8)
  }
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    select(id)
  }

  return (
    <group position={[layout.mid.x, layout.mid.y, STRING_Z]} rotation={[0, 0, layout.angle]}>
      <mesh ref={meshRef} geometry={geometry} material={material} rotation={[0, 0, -Math.PI / 2]} />
      <mesh
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onPointerEnter={handleEnter}
        onClick={handleClick}
      >
        <boxGeometry args={[layout.length, layout.spacing * 0.98, HIT_DEPTH]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}

export function GuitarStrings({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group>
      {GUITAR_STRINGS.map((s, i) => (
        <GuitarStringMesh key={s.id} id={s.id} index={i} gauge={s.gauge} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}
