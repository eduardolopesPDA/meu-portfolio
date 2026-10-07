import type { Milestone } from '../../types'

/**
 * Trajetória no braço da guitarra: cada traste é um ano e os marcadores
 * de madrepérola indicam o período. Na tela pequena o braço fica vertical.
 */
export function FretboardTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className="relative grid gap-0 md:grid-cols-4">
      {/* madeira da escala */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-0 h-full w-14 rounded-sm bg-[linear-gradient(90deg,#2d1a10,#3b2216_40%,#2a170e)] md:left-0 md:top-0 md:h-16 md:w-full md:bg-[linear-gradient(180deg,#2d1a10,#3b2216_40%,#2a170e)]"
      />
      {/* cordas sobre a escala */}
      <span aria-hidden="true" className="absolute left-5 top-0 flex h-full w-14 justify-evenly md:hidden">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="w-px bg-chrome/50" />
        ))}
      </span>
      <span aria-hidden="true" className="absolute left-0 top-0 hidden h-16 w-full flex-col justify-evenly md:flex">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="h-px bg-chrome/50" />
        ))}
      </span>

      {milestones.map((m, i) => (
        <li key={m.year} className="relative pb-12 pl-24 md:pb-0 md:pl-0 md:pr-8">
          {/* traste */}
          <span aria-hidden="true" className="absolute left-5 top-0 h-1 w-14 bg-gradient-to-b from-[#e6e8ec] to-[#8d9097] md:left-0 md:h-16 md:w-1 md:bg-gradient-to-r" />
          {/* inlay */}
          <span
            aria-hidden="true"
            className={`absolute left-[3.25rem] top-[calc(50%-0.5rem)] size-4 -translate-x-1/2 rounded-full bg-[#f6f1e6] shadow-[0_0_10px_rgb(255_255_255/0.25)] md:left-1/2 md:top-6 ${
              i === milestones.length - 1 ? 'ring-4 ring-tube/50' : ''
            }`}
          />
          <div className="md:mt-24">
            <p className="font-display text-4xl font-extrabold leading-none text-tube">{m.year}</p>
            <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
            <p className="mt-1 max-w-[30ch] leading-relaxed text-chrome">{m.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
