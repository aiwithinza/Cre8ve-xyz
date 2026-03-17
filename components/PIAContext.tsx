import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface PIAContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const PIAContext = createContext<PIAContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function PIAProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <PIAContext.Provider value={{ isOpen, open, close }}>
      {children}
    </PIAContext.Provider>
  )
}

export function usePIA() {
  return useContext(PIAContext)
}
