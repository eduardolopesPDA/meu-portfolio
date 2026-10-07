import type { ReactNode } from 'react'

const LETTERS = ['e', 'B', 'G', 'D', 'A', 'E']

export interface TabNote {
  /** 0 = 1ª corda (e aguda, linha de cima) … 5 = 6ª corda */
  line: number
  /** posição horizontal em % */
  at: number
  fret: string
}

interface TabStaffProps {
  notes?: TabNote[]
  /** distância entre as linhas, em rem */
  gap?: number
  /** desenha a barra dupla de final de música */
  ending?: boolean
  showLetters?: boolean
  className?: string
  children?: ReactNode
}

/** Seis linhas de tablatura. As notas são marcadas com o número do traste. */
export function TabStaff({ notes = [], gap = 1.25, ending, showLetters = true, className = '', children }: TabStaffProps) {
  const height = gap * 5
  return (
    <div className={`relative ${className}`} style={{ minHeight: `${height}rem` }}>
      <div className="absolute inset-x-0 top-0 flex" style={{ height: `${height}rem` }} aria-hidden="true">
        {showLetters && (
          <div className="relative w-6 shrink-0 font-mono text-[11px] text-chrome/70">
            {LETTERS.map((l, i) => (
              <span key={l + i} className="absolute left-0 -translate-y-1/2 leading-none" style={{ top: `${i * gap}rem` }}>
                {l}
              </span>
            ))}
          </div>
        )}
        <div className="relative flex-1 border-l border-chrome/30">
          {LETTERS.map((l, i) => (
            <span key={l + i} className="absolute inset-x-0 h-px bg-chrome/25" style={{ top: `${i * gap}rem` }} />
          ))}
          {notes.map((n, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 bg-tolex px-1 font-mono text-xs font-medium leading-none text-tube"
              style={{ top: `${n.line * gap}rem`, left: `${n.at}%` }}
            >
              {n.fret}
            </span>
          ))}
          {ending && (
            <span className="absolute right-0 top-0 flex h-full gap-[3px]">
              <span className="w-px bg-chrome/60" />
              <span className="w-[4px] bg-parchment" />
            </span>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
