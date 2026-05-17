import { Suspense, lazy, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [canRender3D, setCanRender3D] = useState(false)

  useEffect(() => {
    setCanRender3D(hasWebGLSupport())
  }, [])

  if (!canRender3D) {
    return (
      <SplineFallback className={className} />
    )
  }

  return (
    <Suspense
      fallback={<SplineFallback className={className} />}
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}

function hasWebGLSupport() {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return Boolean(gl)
  } catch {
    return false
  }
}

function SplineFallback({ className }: { className?: string }) {
  return (
    <div data-spline-fallback className={`${className} flex items-center justify-center`}>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] spline-fallback-field">
        <div className="absolute h-[54vmin] w-[54vmin] rounded-full border border-brand/20 shadow-[0_0_80px_rgba(255,122,26,0.18)]" />
        <div className="absolute h-[34vmin] w-[34vmin] rounded-full border border-steel/25" />
        <div className="absolute left-[22%] top-[24%] h-3 w-3 rounded-full bg-brand/70 shadow-[0_0_26px_rgba(255,122,26,0.6)]" />
        <div className="absolute right-[24%] top-[34%] h-2.5 w-2.5 rounded-full bg-steel/75 shadow-[0_0_24px_rgba(70,130,180,0.55)]" />
        <div className="absolute bottom-[24%] left-[38%] h-2 w-2 rounded-full bg-white/35" />
        <div className="glass-panel prismatic-sheen relative z-10 max-w-[240px] rounded-2xl px-5 py-4 text-center">
          <span className="block font-mono text-[9px] tracking-[0.32em] text-brand/75">3D SCENE STANDBY</span>
          <span className="mt-2 block font-mono text-[8px] tracking-[0.22em] text-white/48">WEBGL FALLBACK ACTIVE</span>
          <span className="mt-4 block h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="mt-4 block font-mono text-[8px] tracking-[0.18em] text-steel/75">PROMPT OBJECT / PRODUCT CORE</span>
        </div>
      </div>
    </div>
  )
}
