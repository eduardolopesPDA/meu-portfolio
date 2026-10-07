import { SectionTitle } from '../../components/SectionTitle'
import { TabStaff, type TabNote } from '../../components/Tablature/TabStaff'

// Cada compasso da tablatura guarda um trecho da história
const MEASURES: { title: string; text: string; notes: TabNote[] }[] = [
  {
    title: 'Quem sou',
    text: 'Sou o Eduardo, desenvolvedor full stack. Gosto de construir a aplicação inteira, da tela que a pessoa usa até a API e o banco de dados por trás.',
    notes: [{ line: 2, at: 30, fret: '5' }, { line: 3, at: 62, fret: '7' }],
  },
  {
    title: 'Trajetória',
    text: 'Comecei estudando lógica e front-end por conta própria e logo quis entender o que acontecia do outro lado. Desde então venho fazendo projetos completos.',
    notes: [{ line: 4, at: 20, fret: '3' }, { line: 3, at: 50, fret: '5' }, { line: 2, at: 80, fret: '4' }],
  },
  {
    title: 'Formação',
    text: 'Estudo Análise e Desenvolvimento de Sistemas, onde aprofundo engenharia de software, banco de dados e boas práticas.',
    notes: [{ line: 1, at: 40, fret: '8' }],
  },
  {
    title: 'Objetivo',
    text: 'Quero entrar em um time de produto onde eu possa entregar funcionalidades de ponta a ponta e aprender com pessoas mais experientes.',
    notes: [{ line: 5, at: 25, fret: '0' }, { line: 4, at: 55, fret: '2' }, { line: 3, at: 85, fret: '2' }],
  },
  {
    title: 'Tecnologia',
    text: 'Me interesso por interfaces bem feitas e acessíveis, código tipado e APIs simples de usar.',
    notes: [{ line: 2, at: 35, fret: '9' }, { line: 0, at: 70, fret: '12' }],
  },
  {
    title: 'Música',
    text: 'Toco guitarra há anos. Ensaiar uma música e escrever código pedem a mesma coisa: repetição, ouvido atento e paciência com os detalhes.',
    notes: [{ line: 3, at: 30, fret: '7' }, { line: 2, at: 60, fret: '7' }, { line: 1, at: 85, fret: '5' }],
  },
]

export function About() {
  return (
    <section aria-labelledby="sobre" className="scroll-mt-14 border-t border-grille py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle index={1} id="sobre">
          Sobre
        </SectionTitle>

        <TabStaff
          gap={1.6}
          className="mb-20"
          notes={[
            { line: 2, at: 8, fret: '5' },
            { line: 3, at: 14, fret: '7' },
            { line: 2, at: 86, fret: '7' },
            { line: 1, at: 94, fret: '8' },
          ]}
        >
          {/* o nome é escrito sobre a pauta, como uma melodia */}
          <div className="relative flex flex-col items-start pl-10 pt-[1.15rem] sm:pl-[20%]">
            <p className="bg-tolex px-3 font-display text-5xl font-extrabold leading-none sm:text-7xl">Eduardo Lopes</p>
            <p className="mt-2 bg-tolex px-3 text-lg text-chrome">Desenvolvedor Full Stack. Estudante de ADS.</p>
          </div>
        </TabStaff>

        <div className="grid gap-x-0 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {MEASURES.map((m, i) => (
            <article key={m.title} className="relative sm:pr-8">
              <TabStaff notes={m.notes} gap={0.75} showLetters={i % 3 === 0} ending={i === MEASURES.length - 1} />
              <h3 className="mt-6 font-display text-3xl font-bold leading-none">{m.title}</h3>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-parchment/85">{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
