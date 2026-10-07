import { Header } from './components/Navigation/Header'
import { StringRail } from './components/Navigation/StringRail'
import { ProjectPanel } from './components/Project/ProjectPanel'
import { GuitarProvider } from './hooks/useGuitar'
import { About } from './sections/About/About'
import { Contact } from './sections/Contact/Contact'
import { Experience } from './sections/Experience/Experience'
import { Hero } from './sections/Hero/Hero'
import { Projects } from './sections/Projects/Projects'
import { Skills } from './sections/Skills/Skills'

export default function App() {
  return (
    <GuitarProvider>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <StringRail />
      <ProjectPanel />
    </GuitarProvider>
  )
}
