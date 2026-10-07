import { SectionTitle } from '../../components/SectionTitle'
import { FretboardTimeline } from '../../components/Timeline/FretboardTimeline'
import { MILESTONES } from '../../data/experience'

export function Experience() {
  return (
    <section aria-labelledby="experiencia" className="scroll-mt-14 border-t border-grille py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle index={4} id="experiencia" lead="Cada traste é um ano. A casa marcada é onde estou agora.">
          Experiência
        </SectionTitle>
        <FretboardTimeline milestones={MILESTONES} />
      </div>
    </section>
  )
}
