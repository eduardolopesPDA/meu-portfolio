import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { GUITAR_STRINGS } from '../../data/strings'
import { PROJECTS } from '../../data/projects'
import { useGuitar } from '../../hooks/useGuitar'
import type { Project } from '../../types'

const ORDINAL = ['6ª', '5ª', '4ª', '3ª', '2ª', '1ª']

function Preview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Tela do projeto ${project.title}`}
        loading="lazy"
        className="aspect-video w-full rounded-md border border-grille object-cover"
      />
    )
  }
  // sem imagem: uma "tela" desenhada com as tecnologias em forma de tablatura
  return (
    <div aria-hidden="true" className="aspect-video w-full overflow-hidden rounded-md border border-grille bg-tolex">
      <div className="flex gap-1.5 border-b border-grille px-3 py-2">
        <span className="size-2 rounded-full bg-oxblood" />
        <span className="size-2 rounded-full bg-tube-dim" />
        <span className="size-2 rounded-full bg-chrome/50" />
      </div>
      <div className="space-y-2 p-4 font-mono text-[11px] leading-none text-chrome/80">
        {GUITAR_STRINGS.slice().reverse().map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-3 text-parchment/70">{s.note}</span>
            <span className="h-px flex-1 bg-chrome/25" />
            <span className="text-tube">{project.technologies[i] ?? ''}</span>
            <span className="h-px w-6 bg-chrome/25" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectPanel() {
  const { activeProject, activeString, close, select } = useGuitar()
  const reduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!activeProject) return
    returnFocus.current ??= document.activeElement as HTMLElement | null
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeProject, close])

  useEffect(() => {
    if (activeProject) return
    returnFocus.current?.focus?.({ preventScroll: true })
    returnFocus.current = null
  }, [activeProject])

  const index = GUITAR_STRINGS.findIndex((s) => s.id === activeString)
  const go = (dir: 1 | -1) => select(GUITAR_STRINGS[(index + dir + 6) % 6].id)

  return (
    <AnimatePresence>
      {activeProject && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-labelledby="project-title"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-grille bg-cab shadow-[-30px_0_60px_rgb(0_0_0/0.45)]"
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            <header className="flex items-center justify-between gap-4 border-b border-grille px-6 py-4">
              <p className="flex items-center gap-3 text-sm text-chrome">
                <span className="grid size-8 place-items-center rounded-full bg-tube font-mono text-tolex">
                  {GUITAR_STRINGS[index]?.note}
                </span>
                {ORDINAL[index]} corda
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="rounded px-2 py-1 text-sm text-chrome hover:text-parchment"
              >
                Fechar <span aria-hidden="true">✕</span>
              </button>
            </header>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeProject.id}
                className="flex-1 overflow-y-auto px-6 py-6"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <h2 id="project-title" className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight">
                  {activeProject.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-parchment/90">{activeProject.description}</p>

                <div className="mt-6">
                  <Preview project={activeProject} />
                </div>

                <h3 className="mt-7 text-sm font-semibold text-tube">Problema</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-parchment/85">{activeProject.problem}</p>

                <h3 className="mt-6 text-sm font-semibold text-tube">Tecnologias</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {activeProject.technologies.map((t) => (
                    <li key={t} className="rounded-full border border-grille px-3 py-1 text-sm text-parchment/90">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-parchment px-4 py-2.5 text-sm font-semibold text-tolex hover:bg-white"
                    >
                      Ver código no GitHub
                    </a>
                  )}
                  {!activeProject.github && (
                    <p className="rounded-md border border-dashed border-grille px-4 py-2.5 text-sm text-chrome">
                      Código no GitHub em breve
                    </p>
                  )}
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-tube px-4 py-2.5 text-sm font-semibold text-tube hover:bg-tube hover:text-tolex"
                    >
                      Abrir demonstração
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <footer className="flex items-center justify-between border-t border-grille px-6 py-3 text-sm">
              <button type="button" onClick={() => go(-1)} className="rounded px-2 py-1 text-chrome hover:text-parchment">
                ← {PROJECTS.find((p) => p.string === GUITAR_STRINGS[(index + 5) % 6].id)?.title}
              </button>
              <button type="button" onClick={() => go(1)} className="rounded px-2 py-1 text-chrome hover:text-parchment">
                {PROJECTS.find((p) => p.string === GUITAR_STRINGS[(index + 1) % 6].id)?.title} →
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
