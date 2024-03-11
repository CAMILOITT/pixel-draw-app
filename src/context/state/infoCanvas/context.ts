import { CanvasProvider, ConfigCanvas } from '../../../types/canvas/interface'
import { DrawingDimensiones } from '../../../types/drawing/interface'
import { SizeCanvas, SizePixel } from '../../../const/infoCanvas'

export const initValueCanvas: ConfigCanvas = { ...SizeCanvas, bg: null }
export const initValueSizePixel: DrawingDimensiones = SizePixel

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
