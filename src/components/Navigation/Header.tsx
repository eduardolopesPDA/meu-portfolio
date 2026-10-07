import { useState } from 'react'
import { SoundToggle } from '../Audio/SoundToggle'

export const SECTIONS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'contato', label: 'Contato' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-grille/70 bg-tolex/85 backdrop-blur">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-tube focus:px-3 focus:py-1.5 focus:text-tolex"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" className="font-display text-2xl font-extrabold tracking-tight" aria-label="Eduardo Lopes, voltar ao início">
          EL<span className="text-tube">.</span>
        </a>

        <nav aria-label="Seções" className="hidden md:block">
          <ol className="flex items-center gap-1 text-sm">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="rounded px-3 py-1.5 text-chrome transition-colors hover:text-parchment">
                  <span className="mr-1 text-tube/80" aria-hidden="true">♪{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <button
            type="button"
            className="rounded border border-grille px-3 py-1.5 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Seções" className="border-t border-grille md:hidden">
          <ol className="px-4 py-2">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => setOpen(false)} className="block py-2.5 text-parchment">
                  <span className="mr-2 font-mono text-sm text-tube" aria-hidden="true">♪{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </header>
  )
}
