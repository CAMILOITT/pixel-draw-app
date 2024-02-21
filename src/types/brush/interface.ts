import { CoordDrawing, DrawingDimensiones } from '../drawing/interface'
import { SetState } from '../react/type'
import { Tools } from '../tools/enums'
import { ShapesBrush } from './enum'

/**
 * information of each pixel of the canvas
 * @interface InformationDrawing
 * @prop {number} x - coordinate on the x-axis in the two-dimensional plane
 * @prop {number} y - coordinate on the y-axis in the two-dimensional plane
 * @prop {number} w - pixel width to draw
 * @prop {number} h - pixel height to draw
 * @prop {ShapesBrush} tool - tool used for painting
 * @prop {string | null} bg - color of the pixel being painted
 */

export interface InformationDrawing extends CoordDrawing, DrawingDimensiones {
  /** brush */
  tool: Tools
  /** color */
  color: string | null
}

/**
 * brush information
 *
 * @interface BrushProvider
 * @prop {DrawingDimensiones} brushSize - brush size value
 * @prop {number} setBrushSize - function to set a new value for the brush size
 * @prop {ShapesBrush} selectedBrush - selected brush value
 * @prop {number} setSelectedBrush - function to set a new value for the value of the selected brush
 */

export interface BrushProvider {
  /** brush size value */
  brushSize: DrawingDimensiones
  /** function to set a new value for the brush size */
  setBrushSize: SetState<DrawingDimensiones>
  /** selected brush value */
  selectedBrush: ShapesBrush
  /** function to set a new value for the value of the selected brush */
  setSelectedBrush: SetState<ShapesBrush>
}
