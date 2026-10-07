import { TabStaff } from '../../components/Tablature/TabStaff'
import { CONTACT } from '../../data/experience'

const LINKS = [
  { label: 'GitHub', href: CONTACT.github, detail: 'Código dos projetos' },
  { label: 'LinkedIn', href: CONTACT.linkedin, detail: 'Trajetória profissional' },
  { label: 'E-mail', href: `mailto:${CONTACT.email}`, detail: CONTACT.email },
]

export function Contact() {
  return (
    <section aria-labelledby="contato" className="scroll-mt-14 border-t border-grille pb-16 pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-sm text-tube" aria-hidden="true">
          ♪ 05
        </p>

        {/* a última nota da música, com a barra dupla de final */}
        <TabStaff gap={1.4} ending notes={[{ line: 2, at: 96, fret: '12' }]} className="mt-6">
          <div className="relative pl-10 pt-[0.7rem]">
            <h2 id="contato" className="inline-block bg-tolex pr-4 font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.9]">
              Vamos criar alguma coisa?
            </h2>
          </div>
        </TabStaff>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-lg border border-grille bg-grille sm:grid-cols-3">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group block h-full bg-cab px-6 py-6 transition-colors hover:bg-[#2e251f]"
              >
                <span className="block font-display text-3xl font-bold group-hover:text-tube">{l.label}</span>
                <span className="mt-1 block text-sm text-chrome">{l.detail}</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 text-sm text-chrome">
          <p>Fim da música. Obrigado por ouvir.</p>
          <p>© {new Date().getFullYear()} Eduardo Lopes</p>
        </footer>
      </div>
    </section>
  )
}
