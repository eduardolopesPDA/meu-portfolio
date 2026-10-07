import { SectionTitle } from '../../components/SectionTitle'
import { GUITAR_STRINGS } from '../../data/strings'
import { PROJECTS } from '../../data/projects'
import { useGuitar } from '../../hooks/useGuitar'

/**
 * Os mesmos seis projetos, agora como cordas esticadas na página.
 * É o caminho tradicional para quem prefere não usar a guitarra.
 */
export function Projects() {
  const { select, activeString } = useGuitar()

  return (
    <section aria-labelledby="projetos" className="scroll-mt-14 border-t border-grille py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle index={2} id="projetos" lead="Uma corda para cada projeto, da mais grave à mais aguda.">
          Projetos
        </SectionTitle>

        <ul className="divide-y divide-grille/0">
          {GUITAR_STRINGS.map((s) => {
            const p = PROJECTS.find((proj) => proj.string === s.id)!
            const on = activeString === s.id
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => select(s.id)}
                  className="group grid w-full grid-cols-[2rem_1fr] items-center gap-x-4 py-5 text-left md:grid-cols-[2rem_minmax(0,18rem)_1fr_auto]"
                >
                  <span className={`font-mono text-lg ${on ? 'text-tube' : 'text-chrome'}`} aria-hidden="true">
                    {s.note}
                  </span>
                  <span className="font-display text-3xl font-bold leading-none transition-colors group-hover:text-tube sm:text-4xl">
                    {p.title}
                  </span>
                  {/* a corda */}
                  <span aria-hidden="true" className="relative col-span-2 mt-3 h-4 md:col-span-1 md:mt-0">
                    <span
                      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full transition-colors group-hover:bg-tube ${
                        on ? 'bg-tube' : 'bg-chrome/45'
                      } group-active:vibrate`}
                      style={{ height: `${1 + s.gauge * 2.4}px` }}
                    />
                  </span>
                  <span className="col-span-2 mt-2 text-sm text-chrome md:col-span-1 md:mt-0">
                    {p.technologies.slice(0, 3).join(', ')}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
