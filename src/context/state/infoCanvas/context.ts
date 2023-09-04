import { CanvasProvider, ConfigCanvas } from '../../../types/canvas/interface'
import { DrawingDimensiones } from '../../../types/drawing/interface'

export const initValueCanvas: ConfigCanvas = { w: 500, h: 500, bg: null }
export const initValueSizePixel: DrawingDimensiones = { w: 10, h: 10 }

export const initValueUrl = ''
export const initValueCanvasContext = null

export const Context: CanvasProvider = {
  infoCanvas: initValueCanvas,
  setInfoCanvas: value => value,
  sizePixel: initValueSizePixel,
  setSizePixel: value => value,
  urlImage: initValueUrl,
  setUrlImage: value => value,
  contextCanvasDrawing: initValueCanvasContext,
  setContextCanvasDrawing: value => value,
}
