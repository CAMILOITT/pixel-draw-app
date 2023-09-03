import {
  CoordDrawing,
  DrawingDimensiones
} from '../drawing/interface'
import { Tools } from '../tools/enums'

/**
 * information of each pixel of the canvas
 * @interface InformationDrawing
 * @property {number} x - coordinate on the x-axis in the two-dimensional plane
 * @property {number} y - coordinate on the y-axis in the two-dimensional plane
 * @property {number} w - pixel width to draw
 * @property {number} h - pixel height to draw
 * @property {ShapesBrush} tool - tool used for painting
 * @property {string | null} bg - color of the pixel being painted
 */

export interface InformationDrawing extends CoordDrawing, DrawingDimensiones {
  /** brush */
  tool: Tools
  /** color */
  bg: string | null
}
