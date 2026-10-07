import { Guitar } from '../../components/Guitar/Guitar'
import { StringButtons } from '../../components/Guitar/StringButtons'

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="tolex relative flex min-h-svh flex-col pt-14">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-x-10 gap-y-4 px-4 pt-10 sm:px-6 lg:pt-14">
        <div>
          <h1 id="hero-title" className="font-display text-[clamp(3.5rem,11vw,8.5rem)] font-extrabold leading-[0.82] tracking-[-0.01em]">
            Eduardo Lopes
          </h1>
          <p className="mt-3 text-xl text-parchment/90 sm:text-2xl">Desenvolvedor Full Stack, estudante de ADS</p>
        </div>
        <p className="max-w-xs pb-1 text-chrome">
          Toque uma corda para explorar meus projetos. Arraste por cima das cordas para tocar todas de uma vez.
        </p>
      </div>

      <div className="relative min-h-[78svh] flex-1 sm:min-h-[52svh] md:min-h-[46svh]">
        <Guitar />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6">
        <StringButtons />
      </div>
    </section>
  )
}
