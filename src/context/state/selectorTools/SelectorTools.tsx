import { createContext, useState } from 'react'
import { Tools } from '../../../types/tools/enums'
import { Context } from './context'

export const SelectorToolsContext = createContext(Context)

interface SelectorToolsProviderProps {
  children: React.ReactNode
}

export function SelectorToolsProvider({ children }: SelectorToolsProviderProps) {
  const [toolSelect, setToolSelect] = useState<Tools>(Tools.brush)

  const data = {
    toolSelect,
    setToolSelect,
  }

  return (
    <SelectorToolsContext.Provider value={data}>
      {children}
    </SelectorToolsContext.Provider>
  )
}
