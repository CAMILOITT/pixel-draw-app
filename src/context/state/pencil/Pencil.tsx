import { createContext, useState } from 'react'
import { Context, initValueSizeBrush } from './context'
import { ShapesBrush } from '../../../types/brush/enum'

export const BrushContext = createContext(Context)

interface BrushProviderProps {
  children: React.ReactNode
}

export function BrushProvider({ children }: BrushProviderProps) {
  const [brushSize, setBrushSize] = useState(initValueSizeBrush)
  const [selectedBrush, setSelectedBrush] = useState<ShapesBrush>(
    ShapesBrush.square
  )

  const data = {
    brushSize,
    setBrushSize,
    selectedBrush,
    setSelectedBrush,
  }

  return <BrushContext.Provider value={data}>{children}</BrushContext.Provider>
}
