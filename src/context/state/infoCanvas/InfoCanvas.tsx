import { createContext, useState } from 'react'
import { ConfigCanvas } from '../../../types/canvas/interface'
import {
  Context,
  initValueCanvas,
  initValueCanvasContext,
  initValueSizePixel,
  initValueUrl,
} from './context'
import { CanvasContext } from '../../../types/drawing/interface'

export const InfoCanvasContext = createContext(Context)

interface InfoCanvasProviderProps {
  children: React.ReactNode
}

export function InfoCanvasProvider({ children }: InfoCanvasProviderProps) {
  const [infoCanvas, setInfoCanvas] = useState<ConfigCanvas>(initValueCanvas)
  const [sizePixel, setSizePixel] = useState(initValueSizePixel)

  const [urlImage, setUrlImage] = useState(initValueUrl)

  const [contextCanvasDrawing, setContextCanvasDrawing] =
    useState<CanvasContext | null>(initValueCanvasContext)

  const data = {
    infoCanvas,
    setInfoCanvas,
    sizePixel,
    setSizePixel,
    urlImage,
    setUrlImage,
    contextCanvasDrawing,
    setContextCanvasDrawing,
  }

  return (
    <InfoCanvasContext.Provider value={data}>
      {children}
    </InfoCanvasContext.Provider>
  )
}
