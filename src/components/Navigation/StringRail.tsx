import { useEffect, useState } from 'react'
import { GUITAR_STRINGS } from '../../data/strings'
import { PROJECTS } from '../../data/projects'
import { useGuitar } from '../../hooks/useGuitar'

/**
 * Pedaço do braço da guitarra que acompanha a rolagem: as seis cordas
 * continuam tocáveis e abrem qualquer projeto sem voltar ao topo.
 */
export function StringRail() {
  const { select, activeString } = useGuitar()
  const [shown, setShown] = useState(false)
  const [plucked, setPlucked] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Projetos pelas cordas"
      className={`fixed right-2 top-1/2 z-20 hidden -translate-y-1/2 transition-opacity duration-300 min-[1360px]:block ${
        shown ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!shown}
    >
      <ul className="flex flex-col rounded-md border border-grille bg-[#2a1a12]/95 px-1 py-2 shadow-xl">
        {GUITAR_STRINGS.map((s) => {
          const project = PROJECTS.find((p) => p.string === s.id)
          const on = activeString === s.id
          return (
            <li key={s.id}>
              <button
                type="button"
                tabIndex={shown ? 0 : -1}
                onClick={() => {
                  setPlucked(s.id)
                  select(s.id)
                }}
                onAnimationEnd={() => setPlucked(null)}
                aria-label={`Corda ${s.note}: ${project?.title}`}
                className="group relative flex h-7 w-12 items-center gap-1.5 px-1.5"
              >
                <span className={`w-3 font-mono text-xs ${on ? 'text-tube' : 'text-chrome'}`}>{s.note}</span>
                <span
                  className={`block flex-1 rounded-full transition-colors ${plucked === s.id ? 'vibrate' : ''} ${
                    on ? 'bg-tube' : 'bg-chrome/60 group-hover:bg-parchment'
                  }`}
                  style={{ height: `${1 + s.gauge * 2}px` }}
                />
                <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded bg-cab px-2 py-1 text-xs text-parchment opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {project?.title}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
