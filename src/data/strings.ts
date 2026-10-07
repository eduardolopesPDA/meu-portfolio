import type { GuitarString } from '../types'

/** Da 6ª corda (mais grave) para a 1ª (mais aguda). */
export const GUITAR_STRINGS: GuitarString[] = [
  { id: 'E2', note: 'E', frequency: 82.41, gauge: 1 },
  { id: 'A2', note: 'A', frequency: 110.0, gauge: 0.85 },
  { id: 'D3', note: 'D', frequency: 146.83, gauge: 0.7 },
  { id: 'G3', note: 'G', frequency: 196.0, gauge: 0.55 },
  { id: 'B3', note: 'B', frequency: 246.94, gauge: 0.42 },
  { id: 'E4', note: 'e', frequency: 329.63, gauge: 0.34 },
]
