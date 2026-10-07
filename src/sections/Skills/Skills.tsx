import { Pedal } from '../../components/Pedalboard/Pedal'
import { SectionTitle } from '../../components/SectionTitle'
import { SKILLS } from '../../data/skills'
import type { Skill } from '../../types'

const GROUPS: Skill['group'][] = ['Front-end', 'Back-end', 'Banco de dados', 'Ferramentas']

export function Skills() {
  return (
    <section aria-labelledby="tecnologias" className="scroll-mt-14 border-t border-grille py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle index={3} id="tecnologias" lead="Minha pedaleira: as ferramentas que uso de verdade, agrupadas por função. Pise nos pedais.">
          Tecnologias
        </SectionTitle>

        {/* a placa da pedaleira, com trilhos */}
        <div className="rounded-xl border border-grille bg-[#15110e] p-4 shadow-[inset_0_2px_12px_rgb(0_0_0/0.6)] sm:p-6">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr_1fr_1.6fr]">
            {GROUPS.map((group) => {
              const items = SKILLS.filter((s) => s.group === group)
              return (
                <div key={group}>
                  <h3 className="mb-3 text-sm text-chrome">{group}</h3>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))]">
                    {items.map((s) => (
                      <li key={s.name}>
                        <Pedal skill={s} />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
          {/* cabo patch ligando a cadeia de efeitos */}
          <div aria-hidden="true" className="mt-6 flex items-center gap-3 text-xs text-chrome/60">
            <span className="h-1 flex-1 rounded-full bg-[#2b2420]" />
            <span>guitarra → front-end → back-end → banco → ferramentas → amplificador</span>
            <span className="h-1 flex-1 rounded-full bg-[#2b2420]" />
          </div>
        </div>
      </div>
    </section>
  )
}
