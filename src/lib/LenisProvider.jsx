import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })
    setLenis(instance)

    let rafId
    function raf(time) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}

// Returns the live Lenis instance, or null until it mounts.
export function useLenis() {
  return useContext(LenisContext)
}
