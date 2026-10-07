import { useMemo } from 'react'
import * as THREE from 'three'
import {
  BODY_TOP, BODY_X, FRETBOARD_END_X, FRETBOARD_TOP, FRET_COUNT, NECK_END_X, NUT_X,
  SADDLE_X, STRING_Z, TUNER_X, TUNER_Y, fretX, neckHalfAt, stringY,
} from './dimensions'
import { fitTextureToShape, mapleTexture, rosewoodTexture, sunburstTexture } from './textures'

/** Contorno do corpo (coordenadas locais, braço apontando para +X). */
function bodyShape() {
  const s = new THREE.Shape()
  s.moveTo(1.12, 0.29)
  // chifre superior
  s.bezierCurveTo(1.32, 0.48, 1.62, 0.78, 1.86, 1.12)
  s.bezierCurveTo(2.02, 1.36, 1.92, 1.62, 1.66, 1.56)
  s.bezierCurveTo(1.36, 1.48, 1.12, 1.22, 0.74, 1.3)
  // bojo superior e traseira
  s.bezierCurveTo(0.2, 1.48, -0.5, 1.72, -1.25, 1.62)
  s.bezierCurveTo(-1.98, 1.5, -2.36, 0.9, -2.36, 0.05)
  s.bezierCurveTo(-2.36, -0.85, -1.98, -1.5, -1.28, -1.62)
  s.bezierCurveTo(-0.55, -1.74, 0.12, -1.5, 0.6, -1.26)
  // chifre inferior (mais curto)
  s.bezierCurveTo(0.95, -1.08, 1.26, -1.16, 1.48, -1.22)
  s.bezierCurveTo(1.72, -1.28, 1.84, -1.06, 1.68, -0.86)
  s.bezierCurveTo(1.48, -0.6, 1.3, -0.44, 1.12, -0.29)
  s.closePath()
  return s
}

function pickguardShape() {
  const s = new THREE.Shape()
  s.moveTo(1.1, 0.33)
  s.bezierCurveTo(1.28, 0.55, 1.42, 0.8, 1.36, 1.0)
  s.bezierCurveTo(1.26, 1.18, 1.0, 1.08, 0.7, 1.12)
  s.bezierCurveTo(0.2, 1.22, -0.35, 1.2, -0.6, 0.92)
  s.bezierCurveTo(-0.85, 0.62, -0.95, 0.42, -1.25, 0.42)
  s.lineTo(-1.25, -0.42)
  s.bezierCurveTo(-1.45, -0.5, -1.62, -0.72, -1.55, -1.0)
  s.bezierCurveTo(-1.45, -1.3, -1.0, -1.32, -0.5, -1.22)
  s.bezierCurveTo(0.1, -1.1, 0.6, -0.95, 0.95, -0.78)
  s.bezierCurveTo(1.25, -0.62, 1.2, -0.45, 1.1, -0.33)
  s.closePath()
  return s
}

function taperedShape(x0: number, x1: number) {
  const s = new THREE.Shape()
  s.moveTo(x0, neckHalfAt(x0))
  s.lineTo(x1, neckHalfAt(x1))
  s.lineTo(x1, -neckHalfAt(x1))
  s.lineTo(x0, -neckHalfAt(x0))
  s.closePath()
  return s
}

function headstockShape() {
  const s = new THREE.Shape()
  const x = NUT_X
  s.moveTo(x - 0.05, 0.21)
  s.bezierCurveTo(x + 0.2, 0.24, x + 0.3, 0.52, x + 0.55, 0.55)
  s.lineTo(x + 1.45, 0.52)
  s.bezierCurveTo(x + 1.8, 0.5, x + 1.86, 0.18, x + 1.66, 0.06)
  s.bezierCurveTo(x + 1.45, -0.06, x + 1.3, 0.02, x + 1.05, -0.04)
  s.bezierCurveTo(x + 0.7, -0.14, x + 0.45, -0.22, x + 0.2, -0.22)
  s.lineTo(x - 0.05, -0.21)
  s.closePath()
  return s
}

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

const extrude = (shape: THREE.Shape, depth: number, bevel = 0.02) =>
  new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 48,
  })

const INLAYS = [3, 5, 7, 9, 15, 17, 19, 21]
const PG_Z = BODY_TOP + 0.03

const KNOBS: [number, number][] = [
  [BODY_X - 0.42, -0.72],
  [BODY_X - 0.86, -0.86],
  [BODY_X - 1.26, -0.98],
]

const PICKUPS = [
  { x: BODY_X + 0.48, angle: 0 },
  { x: BODY_X - 0.1, angle: 0 },
  { x: BODY_X - 0.74, angle: 0.16 },
]

/** Corda entre a pestana e a tarraxa: fica parada, é só acabamento. */
function headStringTransform(i: number) {
  const from = new THREE.Vector3(NUT_X + 0.02, stringY(i, false), STRING_Z - 0.01)
  const to = new THREE.Vector3(TUNER_X(i), TUNER_Y, BODY_TOP + 0.16)
  const dir = to.clone().sub(from).normalize()
  return {
    position: from.clone().add(to).multiplyScalar(0.5),
    quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir),
    length: from.distanceTo(to),
    radius: 0.006 + (5 - i) * 0.0016,
  }
}

export function GuitarBody() {
  const parts = useMemo(() => {
    const body = bodyShape()
    const neck = taperedShape(NECK_END_X, NUT_X)
    const board = taperedShape(FRETBOARD_END_X, NUT_X)
    const head = headstockShape()

    const mapleNeck = new THREE.MeshPhysicalMaterial({
      map: fitTextureToShape(mapleTexture(), neck),
      roughness: 0.45,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
    })
    const maple = mapleNeck.clone()
    maple.map = fitTextureToShape(mapleTexture(), head)

    return {
      bodyGeo: extrude(body, BODY_TOP - 0.08, 0.04),
      guardGeo: extrude(pickguardShape(), 0.018, 0.006),
      neckGeo: extrude(neck, 0.11, 0.03),
      boardGeo: extrude(board, 0.05, 0.004),
      headGeo: extrude(head, 0.1, 0.025),
      pickupGeo: extrude(roundedRect(0.2, 0.7, 0.1), 0.05, 0.012),
      finish: new THREE.MeshPhysicalMaterial({
        map: fitTextureToShape(sunburstTexture(), body),
        roughness: 0.42,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
      }),
      edge: new THREE.MeshPhysicalMaterial({ color: '#1d0c06', roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.1 }),
      maple,
      mapleNeck,
      rosewood: new THREE.MeshStandardMaterial({ map: fitTextureToShape(rosewoodTexture(), board), roughness: 0.75 }),
      // escudo preto perolado: contrasta com os captadores creme
      guard: new THREE.MeshPhysicalMaterial({
        color: '#121010',
        roughness: 0.55,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
      }),
      chrome: new THREE.MeshStandardMaterial({ color: '#e6e8ec', metalness: 0.7, roughness: 0.28, envMapIntensity: 2.5 }),
      nickel: new THREE.MeshStandardMaterial({ color: '#d4d6da', metalness: 0.65, roughness: 0.32, envMapIntensity: 2.5 }),
      bone: new THREE.MeshStandardMaterial({ color: '#f1ead8', roughness: 0.5 }),
      pearl: new THREE.MeshPhysicalMaterial({
        color: '#f6f1e6',
        roughness: 0.25,
        clearcoat: 1,
        sheen: 1,
        sheenColor: new THREE.Color('#d8e4ff'),
      }),
    }
  }, [])

  const frets = useMemo(
    () =>
      Array.from({ length: FRET_COUNT }, (_, i) => {
        const x = fretX(i + 1)
        return { x, half: neckHalfAt(x) }
      }),
    [],
  )

  const inlays = useMemo(() => {
    const dots = INLAYS.map((n) => ({ x: (fretX(n) + fretX(n - 1)) / 2, y: 0 }))
    const x12 = (fretX(12) + fretX(11)) / 2
    dots.push({ x: x12, y: 0.12 }, { x: x12, y: -0.12 })
    return dots
  }, [])

  const headStrings = useMemo(() => Array.from({ length: 6 }, (_, i) => headStringTransform(i)), [])

  return (
    <group>
      {/* corpo */}
      <mesh geometry={parts.bodyGeo} material={[parts.finish, parts.edge]} position={[BODY_X, 0, 0.04]} />
      <mesh geometry={parts.guardGeo} material={parts.guard} position={[BODY_X, 0, BODY_TOP + 0.004]} />

      {/* captadores single coil */}
      {PICKUPS.map((p, i) => (
        <group key={i} position={[p.x, 0, PG_Z]} rotation={[0, 0, p.angle]}>
          <mesh geometry={parts.pickupGeo} material={parts.bone} />
          {Array.from({ length: 6 }, (_, j) => (
            <mesh key={j} position={[0, stringY(j, true) * 1.15, 0.068]} rotation={[Math.PI / 2, 0, 0]} material={parts.nickel}>
              <cylinderGeometry args={[0.018, 0.018, 0.02, 12]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* knobs e chave seletora */}
      {KNOBS.map(([x, y], i) => (
        <group key={i} position={[x, y, PG_Z + 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={parts.bone}>
            <cylinderGeometry args={[0.1, 0.115, 0.12, 32]} />
          </mesh>
          <mesh position={[0, 0.062, 0]} material={parts.bone}>
            <cylinderGeometry args={[0.07, 0.1, 0.02, 32]} />
          </mesh>
        </group>
      ))}
      <mesh position={[BODY_X - 0.3, -0.45, PG_Z + 0.04]} rotation={[0, 0, -0.5]} material={parts.bone}>
        <boxGeometry args={[0.04, 0.08, 0.08]} />
      </mesh>

      {/* ponte */}
      <mesh position={[SADDLE_X - 0.12, 0, BODY_TOP + 0.02]} material={parts.chrome}>
        <boxGeometry args={[0.42, 0.62, 0.025]} />
      </mesh>
      {Array.from({ length: 6 }, (_, j) => (
        <mesh key={`saddle-${j}`} position={[SADDLE_X - 0.04, stringY(j, true), BODY_TOP + 0.075]} material={parts.chrome}>
          <boxGeometry args={[0.22, 0.072, 0.09]} />
        </mesh>
      ))}
      {Array.from({ length: 6 }, (_, j) => (
        <mesh key={`screw-${j}`} position={[SADDLE_X - 0.27, stringY(j, true), BODY_TOP + 0.04]} rotation={[Math.PI / 2, 0, 0]} material={parts.chrome}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 10]} />
        </mesh>
      ))}

      {/* braço, escala, trastes */}
      <mesh geometry={parts.neckGeo} material={parts.mapleNeck} position={[0, 0, BODY_TOP - 0.03]} />
      <mesh geometry={parts.boardGeo} material={parts.rosewood} position={[0, 0, FRETBOARD_TOP - 0.05]} />
      {frets.map((f, i) => (
        <mesh key={i} position={[f.x, 0, FRETBOARD_TOP + 0.004]} material={parts.nickel}>
          <boxGeometry args={[0.022, f.half * 2, 0.026]} />
        </mesh>
      ))}
      {inlays.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, FRETBOARD_TOP + 0.002]} rotation={[Math.PI / 2, 0, 0]} material={parts.pearl}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 24]} />
        </mesh>
      ))}

      {/* pestana */}
      <mesh position={[NUT_X + 0.015, 0, FRETBOARD_TOP + 0.02]} material={parts.bone}>
        <boxGeometry args={[0.04, 0.43, 0.07]} />
      </mesh>

      {/* headstock e tarraxas */}
      <mesh geometry={parts.headGeo} material={parts.maple} position={[0, 0, BODY_TOP - 0.02]} />
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[TUNER_X(i), TUNER_Y, 0]}>
          <mesh position={[0, 0, BODY_TOP + 0.12]} rotation={[Math.PI / 2, 0, 0]} material={parts.chrome}>
            <cylinderGeometry args={[0.022, 0.026, 0.14, 16]} />
          </mesh>
          <mesh position={[0, 0, BODY_TOP + 0.1]} rotation={[Math.PI / 2, 0, 0]} material={parts.chrome}>
            <cylinderGeometry args={[0.055, 0.055, 0.02, 24]} />
          </mesh>
          <mesh position={[0, 0.27, BODY_TOP + 0.02]} material={parts.chrome}>
            <boxGeometry args={[0.13, 0.06, 0.03]} />
          </mesh>
          <mesh position={[0, 0.2, BODY_TOP + 0.02]} material={parts.chrome}>
            <cylinderGeometry args={[0.014, 0.014, 0.12, 8]} />
          </mesh>
        </group>
      ))}
      <mesh position={[NUT_X + 0.95, 0.04, BODY_TOP + 0.13]} material={parts.chrome}>
        <boxGeometry args={[0.04, 0.18, 0.02]} />
      </mesh>

      {headStrings.map((s, i) => (
        <mesh key={i} position={s.position} quaternion={s.quaternion} material={i < 3 ? parts.nickel : parts.chrome}>
          <cylinderGeometry args={[s.radius, s.radius, s.length, 6]} />
        </mesh>
      ))}
    </group>
  )
}
