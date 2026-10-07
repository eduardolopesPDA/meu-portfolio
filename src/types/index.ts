export type StringId = 'E2' | 'A2' | 'D3' | 'G3' | 'B3' | 'E4'

export interface GuitarString {
  id: StringId
  /** Nome da nota mostrado na interface */
  note: string
  /** Frequência fundamental em Hz (afinação padrão) */
  frequency: number
  /** Espessura relativa, usada no modelo 3D */
  gauge: number
}

export interface Project {
  id: string
  string: StringId
  title: string
  description: string
  problem: string
  technologies: string[]
  image?: string
  github?: string
  demo?: string
}

export interface Skill {
  name: string
  effect: string
  group: 'Front-end' | 'Back-end' | 'Banco de dados' | 'Ferramentas'
}

export interface Milestone {
  year: string
  title: string
  description: string
}
