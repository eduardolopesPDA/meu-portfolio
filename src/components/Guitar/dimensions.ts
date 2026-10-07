/**
 * Medidas da guitarra em unidades da cena. Proporções inspiradas em uma
 * Stratocaster: escala de 25,5", braço preso por volta do 16º traste.
 * O eixo X percorre o instrumento (corpo à esquerda, headstock à direita).
 */
export const BODY_X = -2.1 // deslocamento do corpo
export const BODY_TOP = 0.45 // espessura do corpo (face frontal em z = BODY_TOP)

export const NUT_X = 3.0
export const SADDLE_X = BODY_X - 1.45
export const SCALE = NUT_X - SADDLE_X
export const FRET_COUNT = 21

export const NECK_HALF_NUT = 0.21
export const NECK_HALF_HEEL = 0.28
export const NECK_END_X = BODY_X + 0.9 // dentro do bolso do corpo
export const FRETBOARD_END_X = NUT_X - SCALE * (1 - Math.pow(2, -(FRET_COUNT + 0.6) / 12))

export const FRETBOARD_TOP = BODY_TOP + 0.11
export const STRING_Z = BODY_TOP + 0.165

export const STRING_HALF_NUT = 0.165
export const STRING_HALF_BRIDGE = 0.215

/** Distância do traste n até a pestana (regra dos 12 semitons). */
export const fretX = (n: number) => NUT_X - SCALE * (1 - Math.pow(2, -n / 12))

/** Meia largura do braço em uma posição X. */
export const neckHalfAt = (x: number) => {
  const t = (NUT_X - x) / (NUT_X - NECK_END_X)
  return NECK_HALF_NUT + (NECK_HALF_HEEL - NECK_HALF_NUT) * Math.min(1, Math.max(0, t))
}

/** Posição Y de uma corda (0 = E grave, em cima) na pestana e na ponte. */
export const stringY = (index: number, atBridge: boolean) => {
  const half = atBridge ? STRING_HALF_BRIDGE : STRING_HALF_NUT
  return half - (index * (half * 2)) / 5
}

export const TUNER_X = (index: number) => NUT_X + 0.42 + index * 0.215
export const TUNER_Y = 0.36
