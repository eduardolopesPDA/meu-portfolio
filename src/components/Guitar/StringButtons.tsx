import { GUITAR_STRINGS } from '../../data/strings'
import { PROJECTS } from '../../data/projects'
import { useGuitar } from '../../hooks/useGuitar'

const ORDINAL = ['6ª', '5ª', '4ª', '3ª', '2ª', '1ª']

/**
 * Seletor acessível das cordas: funciona com teclado, leitor de tela
 * e também quando o 3D não carrega. Fica alinhado como as tarraxas.
 */
export function StringButtons() {
  const { select, pluck, setHoveredString, hoveredString, activeString } = useGuitar()

  return (
    <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-grille bg-grille sm:grid-cols-6">
      {GUITAR_STRINGS.map((s, i) => {
        const project = PROJECTS.find((p) => p.string === s.id)
        const on = activeString === s.id
        const lit = on || hoveredString === s.id
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => select(s.id)}
              onPointerEnter={(e) => {
                setHoveredString(s.id)
                if (e.buttons === 1) pluck(s.id, 0.7)
              }}
              onPointerLeave={() => setHoveredString(null)}
              onFocus={() => setHoveredString(s.id)}
              onBlur={() => setHoveredString(null)}
              aria-pressed={on}
              aria-label={`Tocar ${ORDINAL[i]} corda, nota ${s.note}: abrir projeto ${project?.title}`}
              className={`group flex h-full w-full items-center gap-3 bg-cab px-3 py-2.5 text-left transition-colors hover:bg-[#2e251f] ${on ? 'bg-[#33281f]' : ''}`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border font-mono text-sm transition-colors ${
                  lit ? 'border-tube bg-tube text-tolex' : 'border-chrome/40 text-parchment'
                }`}
              >
                {s.note}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[11px] text-chrome">{ORDINAL[i]} corda</span>
                <span className="block truncate text-sm font-medium">{project?.title}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
