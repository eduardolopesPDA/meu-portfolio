interface SectionTitleProps {
  index: number
  id: string
  children: string
  lead?: string
}

/** Título de seção como faixa de um disco: ♪ número da faixa + nome. */
export function SectionTitle({ index, id, children, lead }: SectionTitleProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="font-mono text-sm text-tube" aria-hidden="true">
        ♪ {String(index).padStart(2, '0')}
      </p>
      <h2 id={id} className="mt-2 font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-7xl">
        {children}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-chrome">{lead}</p>}
    </div>
  )
}
