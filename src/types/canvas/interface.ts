import { CanvasContext, DrawingDimensiones } from '../drawing/interface'

/**
 * The description interface
 * @interface ConfigCanvas
 * @prop {number} w - width of canvas
 * @prop {number} h - height of canvas
 * @prop {string | null} bg - background color of canvas
 */
export interface ConfigCanvas {
  /** width of canvas */
  w: number
  /** height of canvas */
  h: number
  /** background color of canvas */
  bg: string | null
}

/**
 * brush information
 *
 * @interface BrushProvider
 * @property {ConfigCanvas} infoCanvas -surface information (height, width, background) of the canvas
 * @property {SetState<ConfigCanvas>} setInfoCanvas - function to set new values for the surface information (height, width, background) of the canvas
 * @property {DrawingDimensiones} sizePixel - width and height of the pixel to paint on the canvas
 * @property {SetState<DrawingDimensiones>} setSizePixel - function to set new values in the width and height of the pixel to paint on the canvas
 * @property {string} urlImage - url of the resulting image from the canvas
 * @property {SetState<string>} setUrlImage - function to set the url value of the resulting image of the canvas
 * @property { CanvasContext | null} contextCanvasDrawing - canvas context
 * @property {SetState<CanvasContext | null>} setContextCanvasDrawing - function to set the new value of the canvas context
 */

export interface CanvasProvider {
  /** surface information (height, width, background) of the canvas */
  infoCanvas: ConfigCanvas
  /** function to set new values for the surface information (height, width, background) of the canvas */
  setInfoCanvas: React.Dispatch<React.SetStateAction<ConfigCanvas>>
  /** width and height of the pixel to paint on the canvas */
  sizePixel: DrawingDimensiones
  /** function to set new values in the width and height of the pixel to paint on the canvas */
  setSizePixel: React.Dispatch<React.SetStateAction<DrawingDimensiones>>
  /** url of the resulting image from the canvas */
  urlImage: string
  /** function to set the url value of the resulting image of the canvas */
  setUrlImage: React.Dispatch<React.SetStateAction<string>>
  /** canvas context */
  contextCanvasDrawing: CanvasContext | null
  /** function to set the new value of the canvas context */
  setContextCanvasDrawing: React.Dispatch<
    React.SetStateAction<CanvasContext | null>
  >
}

/** value of the canvas size */
export interface CanvasSizeChange 
{
  /** old value */
  old: number
  /** new value */
  new: number
}
