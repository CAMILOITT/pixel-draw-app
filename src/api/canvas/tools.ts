import { CanvasContext, CoordDrawing } from '../../types/drawing/interface'
import { FillBucket } from '../../types/tools/type'
// import { reDrawing } from './drawing'
// import { arrCoord, nextArrCoord } from './update'

/**
 * Gets the color of the canvas at the cursor position
 * @param {CanvasContext & CoordDrawing} value
 * @prop {CanvasContext} ctx - The canvas rendering context
 * @prop {CoordDrawing} x - The x-coordinate of the shape
 * @prop {CoordDrawing} y - The y-coordinate of the shape
 * @returns Object containing color
 */
export function eyeDropper({ ctx, x, y }: CanvasContext & CoordDrawing) {
  const color = ctx.getImageData(x, y, 1, 1).data
  return color
}


/**
 * Fill the adjacent area with a specific color.
 *
 * @param {object} options - The options object.
 * @prop {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @prop {number} x - The starting x-coordinate.
 * @prop {number} y - The starting y-coordinate.
 * @prop {string} bg - The color to be replaced.
 * @prop {string} fillColor - The color to fill with.
 */
export function bucketFill({ ctx, x, y, bg, fillColor }: FillBucket) {
  const pixelStack = [[x, y]]
  const { canvas } = ctx
  const w = 10
  const h = 10
  if (!pixelStack) return
  while (pixelStack.length) {
    if (!pixelStack === undefined) continue
    const coord = pixelStack.pop()
    if (!coord) continue
    const [x, y] = coord
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue
    const pixelData = ctx.getImageData(x, y, 1, 1).data
    const pixelColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
    if (pixelColor === bg) {
      ctx.fillStyle = fillColor
      ctx.fillRect(x, y, w, h)
      pixelStack.push([x + w, y])
      pixelStack.push([x - w, y])
      pixelStack.push([x, y + h])
      pixelStack.push([x, y - h])
    }
  }
}
