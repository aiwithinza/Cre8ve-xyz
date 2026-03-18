import { Suspense, lazy, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [canRender3D, setCanRender3D] = useState(false)

  useEffect(() => {
    setCanRender3D(true)
  }, [])

  if (!canRender3D) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="w-full h-full bg-gradient-to-br from-brand/10 via-transparent to-steel/10 rounded-3xl flex items-center justify-center">
          <span className="font-mono text-white/20 text-xs tracking-widest">3D ARCHITECTURE VIEW</span>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
