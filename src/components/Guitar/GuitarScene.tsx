import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GuitarBody } from './GuitarBody'
import { GuitarStrings } from './GuitarStrings'
import { shadowTexture } from './textures'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useGuitar } from '../../hooks/useGuitar'

// largura do painel de projeto (max-w-md) e a partir de quando ele divide a tela
const PANEL_PX = 448
const SPLIT_MIN_PX = 1024

// caixa aproximada do instrumento inteiro (corpo + braço + headstock)
const GUITAR_LENGTH = 9.3
const GUITAR_HEIGHT = 3.45
const GUITAR_CENTER_X = 0.2

/**
 * Estúdio escuro com dois softboxes: gera reflexos em faixa no verniz e
 * nos metais, como em foto de produto, sem estourar o acabamento.
 */
function studioScene() {
  const studio = new THREE.Scene()
  const room = new THREE.Mesh(
    new THREE.SphereGeometry(20, 32, 16),
    new THREE.MeshBasicMaterial({ color: '#0d0a08', side: THREE.BackSide }),
  )
  studio.add(room)
  const box = (w: number, h: number, color: string, pos: [number, number, number], power: number) => {
    const mat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    mat.color.multiplyScalar(power) // HDR: mais forte que o branco
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)
    m.position.set(...pos)
    m.lookAt(0, 0, 0)
    studio.add(m)
  }
  box(14, 3, '#ffd9a8', [-6, 9, 8], 3) // softbox principal, quente
  box(2, 12, '#8a9bc0', [12, 0, 4], 2.2) // faixa lateral, fria
  box(16, 6, '#3a2c22', [0, 0, 14], 1.6) // luz difusa de frente, para os metais
  box(10, 1.2, '#5a4636', [0, -9, 6], 1.5) // rebatedor de baixo
  return studio
}

function Lighting() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const studio = studioScene()
    const env = pmrem.fromScene(studio, 0.02).texture
    scene.environment = env
    return () => {
      env.dispose()
      pmrem.dispose()
      scene.environment = null
    }
  }, [gl, scene])

  return (
    <>
      <ambientLight intensity={0.15} />
      {/* luz principal quente, como um refletor de palco discreto */}
      <directionalLight position={[-7, 6, 2.5]} intensity={2.6} color="#ffe2b8" />
      <directionalLight position={[6, -3, 3]} intensity={0.6} color="#9fb4ff" />
      <pointLight position={[-1, 1.5, 5]} intensity={2.5} distance={12} color="#ffcf8a" />
    </>
  )
}

function Rig({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const { viewport, size } = useThree()
  const born = useRef(performance.now())
  const shadow = useMemo(() => shadowTexture(), [])

  const { activeString } = useGuitar()

  // com o painel aberto em telas largas, a guitarra recua para a área livre
  const split = !!activeString && size.width >= SPLIT_MIN_PX
  const freeWidth = split ? viewport.width * (1 - PANEL_PX / size.width) : viewport.width
  const targetX = split ? -(viewport.width - freeWidth) / 2 : 0

  const portrait = size.height > size.width * 1.05
  const targetScale = portrait
    ? Math.min((freeWidth * 0.86) / GUITAR_HEIGHT, (viewport.height * 0.94) / GUITAR_LENGTH)
    : Math.min((freeWidth * 0.94) / GUITAR_LENGTH, (viewport.height * 0.9) / GUITAR_HEIGHT)
  const baseRotZ = portrait ? Math.PI / 2 : 0.0

  useFrame((state) => {
    const g = group.current
    if (!g) return
    // entrada única: a guitarra gira até a posição de repouso
    const t = Math.min(1, (performance.now() - born.current) / 1600)
    const ease = reducedMotion ? 1 : 1 - Math.pow(1 - t, 3)
    const px = reducedMotion ? 0 : state.pointer.x
    const py = reducedMotion ? 0 : state.pointer.y

    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.32 * (1 - ease) - py * 0.08 - 0.12, 0.08)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, 0.5 * (1 - ease) + px * 0.1, 0.08)
    g.rotation.z = baseRotZ

    const k = reducedMotion || !g.userData.placed ? 1 : 0.1
    g.userData.placed = true
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, k)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, k))
  })

  return (
    <group ref={group}>
      <group position={[-GUITAR_CENTER_X, 0, -0.3]}>
        <mesh position={[GUITAR_CENTER_X - 0.6, -0.15, -0.35]} scale={[10, 4.6, 1]}>
          <planeGeometry />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={0.9} />
        </mesh>
        <GuitarBody />
        <GuitarStrings reducedMotion={reducedMotion} />
      </group>
    </group>
  )
}

export default function GuitarScene() {
  const reducedMotion = usePrefersReducedMotion()
  const wrapper = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  // pausa a renderização quando o hero sai da tela
  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0 touch-pan-y">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 30 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onPointerMissed={() => (document.body.style.cursor = '')}
        aria-hidden="true"
      >
        <Lighting />
        <Rig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
