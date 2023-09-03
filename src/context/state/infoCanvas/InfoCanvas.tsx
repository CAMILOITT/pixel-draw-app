import { createContext, useState } from 'react'
import { ConfigCanvas } from '../../../types/canvas/interface'
import {
  Context,
  initValueCanvas,
  initValueCanvasContext,
  initValueOpenConfiguration,
  initValueOpenMenuDownload,
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
  const [openConfiguration, setOpenConfiguration] = useState(
    initValueOpenConfiguration
  )
  const [urlImage, setUrlImage] = useState(initValueUrl)
  const [openMenuDownload, setOpenMenuDownload] = useState(
    initValueOpenMenuDownload
  )
  const [contextCanvasDrawing, setContextCanvasDrawing] =
    useState<CanvasRenderingContext2D | null>(initValueCanvasContext)

  const data = {
    infoCanvas,
    setInfoCanvas,
    sizePixel,
    setSizePixel,
    openConfiguration,
    setOpenConfiguration,
    urlImage,
    setUrlImage,
    openMenuDownload,
    setOpenMenuDownload,
    contextCanvasDrawing,
    setContextCanvasDrawing,
  }

  return (
    <InfoCanvasContext.Provider value={data}>
      {children}
    </InfoCanvasContext.Provider>
  )
}
