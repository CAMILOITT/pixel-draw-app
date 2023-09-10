import { CanvasContext, CoordDrawing, DrawingColor } from '../drawing/interface'

/**
 * context of canvas
 * @type FillBucket
 * @prop {CanvasRenderingContext2D} ctx - context of canvas
 * @prop {number} x - coordinate on the x-axis in the two-dimensional plane
 * @prop {number} y - coordinate on the y-axis in the two-dimensional plane
 * @prop {string} bg - color of the pixel being painted
 * @prop {string} fillColor - The color to fill with.
 */
export type FillBucket = CanvasContext &
  CoordDrawing &
  DrawingColor & { fillColor: string }
