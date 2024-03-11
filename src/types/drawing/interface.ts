
/**
 * context of canvas
 * @interface ConfigCanvas
 * @property {CanvasRenderingContext2D} ctx - context of canvas
 */
export interface CanvasContext {
  /** context of canvas   */
  ctx: CanvasRenderingContext2D
}

/**
 * two proportional axes of the two-dimensional Cartesian plane (x,y)
 * @interface CoordDrawing
 * @property {number} x - coordinate on the x-axis in the two-dimensional plane
 * @property {number} y - coordinate on the y-axis in the two-dimensional plane
 */
export interface CoordDrawing {
  /** coordinate on the x-axis in the two-dimensional plane */
  x: number
  y: number
}

/**
 * pixel dimensions when drawing
 * @interface DrawingSize
 * @property {number} size - tool width and height
 */
export interface DrawingSize {
  /** tool width and height */
  size: number
}

/**
 * pixel width and height when drawing
 * @interface DrawingDimensiones
 * @property {number} w - pixel width to draw
 * @property {number} h - pixel height to draw
 */
export interface DrawingDimensiones {
  /** tool width */
  w: number
  /** tool height */
  h: number
}

/**
 * pixel color
 * @interface DrawingColor
 * @property {string} bg - color of the pixel being painted
 */

export interface DrawingColor {
  /** brush color */
  color: string
}

/**
 * pixel clean
 * @interface CleanDrawing
 * @property {string | null} bg - color of the pixel being painted
 */
export interface CleanDrawing {
  /** pixel color */
  bg: string | null
}

export interface Drawing {
  clientX: number
  clientY: number
  left: number
  top: number
}

export interface DrawingMove extends Drawing {
  movementX?: number
  movementY?: number
  type?: string
}