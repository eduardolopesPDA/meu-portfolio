import { useGuitar } from '../../hooks/useGuitar'

/** Interruptor de som no estilo da chave standby de um amplificador. */
export function SoundToggle() {
  const { sound } = useGuitar()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={sound.enabled}
      onClick={sound.toggle}
      className="flex items-center gap-2.5 rounded-full border border-grille py-1 pl-1 pr-3 text-sm text-chrome hover:text-parchment"
    >
      <span className={`relative h-5 w-9 rounded-full transition-colors ${sound.enabled ? 'bg-tube/25' : 'bg-grille'}`}>
        <span
          className={`absolute top-0.5 size-4 rounded-full transition-all ${
            sound.enabled ? 'left-[18px] bg-tube shadow-[0_0_10px_var(--color-tube)]' : 'left-0.5 bg-chrome/60'
          }`}
        />
      </span>
      {sound.enabled ? 'Som ligado' : 'Som desligado'}
    </button>
  )
}
