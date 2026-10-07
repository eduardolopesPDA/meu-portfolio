import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Skill } from '../../types'

const PAINT: Record<Skill['group'], { body: string; ink: string }> = {
  'Front-end': { body: '#c9952f', ink: '#1c1713' },
  'Back-end': { body: '#2f5b49', ink: '#ece3cf' },
  'Banco de dados': { body: '#7d2c23', ink: '#ece3cf' },
  Ferramentas: { body: '#3b4859', ink: '#ece3cf' },
}

/** Cada tecnologia é um pedal; pisar no footswitch liga o LED. */
export function Pedal({ skill }: { skill: Skill }) {
  const [on, setOn] = useState(true)
  const reduced = useReducedMotion()
  const paint = PAINT[skill.group]

  return (
    <motion.button
      type="button"
      aria-pressed={on}
      aria-label={`${skill.name}, ${skill.effect}. Pedal ${on ? 'ligado' : 'desligado'}`}
      onClick={() => setOn((v) => !v)}
      whileTap={reduced ? undefined : { scale: 0.96, y: 2 }}
      className="relative flex w-full flex-col items-center rounded-lg px-3 pb-4 pt-3 text-left shadow-[inset_0_1px_0_rgb(255_255_255/0.25),inset_0_-3px_0_rgb(0_0_0/0.3),0_10px_18px_rgb(0_0_0/0.45)]"
      style={{ background: paint.body, color: paint.ink }}
    >
      {/* knobs */}
      <span className="flex w-full justify-between px-1" aria-hidden="true">
        {[0, 1].map((k) => (
          <span key={k} className="relative size-6 rounded-full bg-[#1b1714] shadow-[inset_0_1px_1px_rgb(255_255_255/0.2)]">
            <span className="absolute left-1/2 top-0.5 h-2 w-0.5 -translate-x-1/2 rounded bg-parchment/80" style={{ rotate: `${k ? 40 : -30}deg`, transformOrigin: '50% 160%' }} />
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className={`mt-3 size-2.5 rounded-full transition-all ${on ? 'bg-[#ff3b2f] shadow-[0_0_8px_2px_rgb(255_59_47/0.7)]' : 'bg-[#4a1512]'}`}
      />
      <span className="mt-3 w-full text-center font-display text-xl font-extrabold leading-none tracking-tight">
        {skill.name}
      </span>
      <span className="mt-1 text-center text-[11px] opacity-75">{skill.effect}</span>
      {/* footswitch */}
      <span
        aria-hidden="true"
        className="mt-4 size-8 rounded-full bg-gradient-to-b from-[#f2f2f2] to-[#8d9097] shadow-[0_2px_0_rgb(0_0_0/0.4)] ring-2 ring-black/20"
      />
    </motion.button>
  )
}
