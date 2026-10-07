import { Component, lazy, Suspense, type ReactNode } from 'react'

// Three.js só é baixado depois que o texto do hero já está na tela
const GuitarScene = lazy(() => import('./GuitarScene'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function Placeholder({ message }: { message?: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      {message ? (
        <p className="max-w-xs text-center text-sm text-chrome">{message}</p>
      ) : (
        <div className="h-px w-2/3 animate-pulse bg-gradient-to-r from-transparent via-tube/60 to-transparent" />
      )}
    </div>
  )
}

const NO_3D = 'Seu navegador não exibe gráficos 3D. Use os botões das cordas abaixo para ver os projetos.'

export function Guitar() {
  if (!hasWebGL()) return <Placeholder message={NO_3D} />
  return (
    <SceneBoundary fallback={<Placeholder message={NO_3D} />}>
      <Suspense fallback={<Placeholder />}>
        <GuitarScene />
      </Suspense>
    </SceneBoundary>
  )
}
