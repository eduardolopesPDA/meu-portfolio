import type { Skill } from '../types'

export const SKILLS: Skill[] = [
  { name: 'JavaScript', effect: 'Interação', group: 'Front-end' },
  { name: 'React', effect: 'Componentes', group: 'Front-end' },
  { name: 'TypeScript', effect: 'Tipagem', group: 'Front-end' },
  { name: 'HTML', effect: 'Semântica', group: 'Front-end' },
  { name: 'CSS', effect: 'Layout', group: 'Front-end' },
  { name: 'Tailwind', effect: 'Estilo', group: 'Front-end' },
  { name: 'Node.js', effect: 'Runtime', group: 'Back-end' },
  { name: 'Express', effect: 'APIs REST', group: 'Back-end' },
  { name: 'MySQL', effect: 'Relacional', group: 'Banco de dados' },
  { name: 'Prisma', effect: 'ORM', group: 'Banco de dados' },
  { name: 'Git', effect: 'Versão', group: 'Ferramentas' },
  { name: 'GitHub', effect: 'Colaboração', group: 'Ferramentas' },
  { name: 'Docker', effect: 'Containers', group: 'Ferramentas' },
  { name: 'Kubernetes', effect: 'Orquestração', group: 'Ferramentas' },
]
