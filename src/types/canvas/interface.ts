import { CanvasContext, DrawingDimensiones } from '../drawing/interface'

/**
 * The description interface
 * @interface ConfigCanvas
 * @prop {number} w - width of canvas
 * @prop {number} h - height of canvas
 * @prop {string | null} h - background color of canvas
 */
export interface ConfigCanvas {
  /** width of canvas */
  w: number
  /** height of canvas */
  h: number
  /** background color of canvas */
  bg: string | null
}

export interface CanvasProvider {
  infoCanvas: ConfigCanvas
  setInfoCanvas: React.Dispatch<React.SetStateAction<ConfigCanvas>>
  sizePixel: DrawingDimensiones
  setSizePixel: React.Dispatch<React.SetStateAction<DrawingDimensiones>>
  urlImage: string
  setUrlImage: React.Dispatch<React.SetStateAction<string>>
  contextCanvasDrawing: CanvasContext | null
  setContextCanvasDrawing: React.Dispatch<
    React.SetStateAction<CanvasContext | null>
  >
}
