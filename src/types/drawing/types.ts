import { ConfigCanvas } from '../canvas/interface'
import {
  DrawingDimensiones,
  DrawingColor,
  CoordDrawing,
  DrawingSize,
  CanvasContext,
  CleanDrawing,
} from './interface'

/**
 *
 * @type {CoordDrawing & DrawingColor & DrawingDimensiones}
 * @prop {number} w - pixel width to draw
 * @prop {number} h - pixel height to draw
 * @prop {number} x - coordinate on the x-axis in the two-dimensional plane
 * @prop {number} y - coordinate on the y-axis in the two-dimensional plane
 * @prop {string} bg - color of the pixel being painted
 */

export type DrawingCanvas = DrawingDimensiones & DrawingColor & CoordDrawing

export type DrawingCircleAndSquare = DrawingSize & DrawingColor & CoordDrawing

export type DrawingRectangle = DrawingDimensiones & DrawingColor & CoordDrawing

export type DrawingLine = CoordDrawing & DrawingColor & DrawingSize

// export type Correction = CoordDrawing & DrawingColor & DrawingSize

/**
 * Represents a canvas context with additional configuration options for filling the background.
 * @type { CanvasContext & ConfigCanvas }
 */
export type FillBackgroundCanvas = CanvasContext & ConfigCanvas

export type CorrectionCanvas = CanvasContext & ConfigCanvas & CoordDrawing

/**
 * @type { CanvasContext & DrawingCanvas }
 * @prop { CanvasContext } ctx - context of canvas
 */

export type InfoDrawing = CanvasContext & DrawingCanvas

/**
 *
 * @type {CanvasContext & CoordDrawing & DrawingColor & DrawingSize}
 * @prop {CanvasContext} ctx - Canvas context
 * @prop {CoordDrawing} x - x coordinate
 * @prop {CoordDrawing} y - y coordinate
 * @prop {CleanDrawing} bg - pixel color
 */

export type Eraser = CanvasContext &
  CoordDrawing &
  DrawingDimensiones &
  CleanDrawing

/**
 * @type {CanvasContext & CoordDrawing & DrawingColor & DrawingDimensiones}
 *  @prop {CanvasContext} ctx - Canvas context
 *  @prop {CoordDrawing} x - coordinate in the x-axis
 *  @prop {CoordDrawing} y - coordinate in the y-axis
 *  @prop {DrawingDimensiones} w - pixel width
 *  @prop {DrawingDimensiones} h - pixel height
 *  @prop {DrawingColor} bg - pixel color
 *  @prop {CoordDrawing} prevPosition - previous coordinates of the drawing
 *  @prop {CoordDrawing} movementX - mouse movement in the x-direction
 *  @prop {CoordDrawing} movementY - mouse movement in the y-direction
 */

export type CorrectionDrawing = CanvasContext &
  CoordDrawing &
  DrawingDimensiones &
  DrawingColor & {
    prevPosition: CoordDrawing
    movementX: number
    movementY: number
  }

