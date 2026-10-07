import * as THREE from 'three'

function canvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return [c, c.getContext('2d')!] as const
}

function rand(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function drawGrain(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, count: number, seed: number) {
  const r = rand(seed)
  ctx.strokeStyle = color
  for (let i = 0; i < count; i++) {
    const y0 = r() * h
    ctx.globalAlpha = 0.04 + r() * 0.1
    ctx.lineWidth = 0.6 + r() * 2.2
    ctx.beginPath()
    ctx.moveTo(0, y0)
    const amp = 2 + r() * 10
    const freq = 0.002 + r() * 0.006
    const phase = r() * Math.PI * 2
    for (let x = 0; x <= w; x += 16) ctx.lineTo(x, y0 + Math.sin(x * freq + phase) * amp)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}

/** Acabamento sunburst de três tons sobre madeira de amieiro. */
export function sunburstTexture(): THREE.CanvasTexture {
  const size = 1024
  const [c, ctx] = canvas(size, size)
  ctx.fillStyle = '#e9a640'
  ctx.fillRect(0, 0, size, size)
  drawGrain(ctx, size, size, '#7a3c10', 260, 7)

  ctx.save()
  ctx.translate(size * 0.47, size * 0.5)
  ctx.scale(1, 1.05)
  const g = ctx.createRadialGradient(0, 0, size * 0.1, 0, 0, size * 0.56)
  g.addColorStop(0, 'rgba(250,190,80,0)')
  g.addColorStop(0.38, 'rgba(220,120,30,0.18)')
  g.addColorStop(0.62, 'rgba(150,40,14,0.82)')
  g.addColorStop(0.8, 'rgba(60,14,6,0.97)')
  g.addColorStop(1, 'rgba(18,7,4,1)')
  ctx.fillStyle = g
  ctx.fillRect(-size, -size, size * 2, size * 2)
  ctx.restore()

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

export function rosewoodTexture(): THREE.CanvasTexture {
  const [c, ctx] = canvas(1024, 128)
  ctx.fillStyle = '#3b2216'
  ctx.fillRect(0, 0, 1024, 128)
  drawGrain(ctx, 1024, 128, '#140905', 90, 3)
  drawGrain(ctx, 1024, 128, '#6b3f27', 30, 11)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function mapleTexture(): THREE.CanvasTexture {
  const [c, ctx] = canvas(1024, 128)
  ctx.fillStyle = '#d9a866'
  ctx.fillRect(0, 0, 1024, 128)
  drawGrain(ctx, 1024, 128, '#9a6430', 70, 5)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Sombra difusa projetada atrás da guitarra. */
export function shadowTexture(): THREE.CanvasTexture {
  const [c, ctx] = canvas(256, 256)
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(0,0,0,0.55)')
  g.addColorStop(0.5, 'rgba(0,0,0,0.25)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

/** Ajusta repeat/offset para que a textura cubra a caixa da forma extrudada. */
export function fitTextureToShape(tex: THREE.Texture, shape: THREE.Shape) {
  const box = new THREE.Box2()
  shape.getPoints(64).forEach((p) => box.expandByPoint(p))
  const size = box.getSize(new THREE.Vector2())
  tex.repeat.set(1 / size.x, 1 / size.y)
  tex.offset.set(-box.min.x / size.x, -box.min.y / size.y)
  return tex
}
