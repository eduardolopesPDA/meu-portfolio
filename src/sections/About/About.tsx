import { SectionTitle } from '../../components/SectionTitle'
import { TabStaff, type TabNote } from '../../components/Tablature/TabStaff'

// Cada compasso da tablatura guarda um trecho da história
const MEASURES: { title: string; text: string; notes: TabNote[] }[] = [
  {
    title: 'Quem sou',
    text: 'Sou apaixonado por tecnologia e encontrei na programação um caminho para transformar meu interesse em propósito. Gosto de aprender, criar soluções e enfrentar desafios que me ajudam a evoluir como desenvolvedor',
    notes: [{ line: 2, at: 30, fret: '5' }, { line: 3, at: 62, fret: '7' }],
  },
  {
    title: 'Trajetória',
    text: 'Meu interesse por tecnologia começou nas lan houses do bairro e, com o tempo, virou um projeto de vida. Desde então, venho construindo minha carreira por meio de estudos, projetos práticos e experiências colaborativas.',
    notes: [{ line: 4, at: 20, fret: '3' }, { line: 3, at: 50, fret: '5' }, { line: 2, at: 80, fret: '4' }],
  },
  {
    title: 'Formação',
    text: 'Concluí o curso de Desenvolvimento Web Full-Stack, com 720 horas, pelo Programadores do Amanhã. Atualmente, curso Análise e Desenvolvimento de Sistemas na UniFECAF e faço uma especialização em Inteligência Artificial.',
    notes: [{ line: 1, at: 40, fret: '8' }],
  },
  {
    title: 'Objetivo',
    text: 'Quero transformar conhecimento em projetos reais, criando soluções eficientes, escaláveis e com impacto. Busco continuar evoluindo tecnicamente e conquistar meu espaço na área de tecnologia como desenvolvedor.',
    notes: [{ line: 5, at: 25, fret: '0' }, { line: 4, at: 55, fret: '2' }, { line: 3, at: 85, fret: '2' }],
  },
  {
    title: 'Tecnologia',
    text: 'Desenvolvo projetos com JavaScript, Node.js, Express, React.js, MySQL e Python. Também utilizo Git e GitHub e venho estudando Docker, Kubernetes e conteinerização. Tenho contato com Scrum, Kanban, CI/CD, Machine Learning, NLP e redes neurais..',
    notes: [{ line: 2, at: 35, fret: '9' }, { line: 0, at: 70, fret: '12' }],
  },
  {
    title: 'Música',
    text: 'Toco guitarra há anos. Ensaiar uma música e escrever código pedem a mesma coisa: repetição, foco, ouvido atento e paciência com os detalhes.',
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
