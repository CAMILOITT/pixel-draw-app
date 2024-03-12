import { CanvasContext, CoordDrawing } from '../../types/drawing/interface'
import { Tools } from '../../types/tools/enums'
import { FillBucket } from '../../types/tools/type'
import { GetColor, ConvertColor } from '../../utils/color'
import { coords } from './coord'
import { draw } from './drawing'

/**
 * Gets the color of the canvas at the cursor position
 * @param {CanvasContext & CoordDrawing} value
 * @prop {CanvasContext} ctx - The canvas rendering context
 * @prop {CoordDrawing} x - The x-coordinate of the shape
 * @prop {CoordDrawing} y - The y-coordinate of the shape
 * @returns Object containing color
 */
export function eyeDropper({ ctx, x, y }: CanvasContext & CoordDrawing) {
  const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data

  const color = ConvertColor.rgbToHsl(r, g, b, a / 255)

  const colorFormat = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`

  return { color, colorFormat }
}

/**
 * Fill the adjacent area with a specific color.
 *
 * @param {object} options - The options object.
 * @prop {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @prop {number} x - The starting x-coordinate.
 * @prop {number} y - The starting y-coordinate.
 * @prop {number} w - pixel paint width.
 * @prop {number} h - pixel paint height.
 * @prop {string} bg - The color to be replaced.
 * @prop {string} fillColor - The color to fill with.
 */
export function bucketFill({
  ctx,
  x,
  y,
  w,
  h,
  color: bg,
  fillColor,
}: FillBucket) {
  const { h: fillH, a: fillA } = GetColor.getDataHsla(fillColor)
  const {
    data: { h: bgH },
  } = GetColor.getData(bg)

  if (
    GetColor.compareColor(bg, fillColor) ||
    (fillA < 0.5 && fillH === bgH) ||
    fillA < 0.3
  )
    return

  console.log(bg, fillColor, GetColor.compareColor(bg, fillColor))

  const { canvas } = ctx
  const pixelStack = [[x, y]]

  coords.toGroup({ tool: Tools.fillBucket, color: fillColor, x, y, w, h })
  const numberMaxRepetition = 10000
  let indexRepetition = 0

  if (!pixelStack.length) return

  while (pixelStack.length > 0 && indexRepetition < numberMaxRepetition) {
    if (pixelStack.length < 1) break
    const coord = pixelStack.pop()
    if (!coord?.length) break
    const [x, y] = coord
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue
    const { colorFormat } = eyeDropper({ ctx, x, y })
    if (bg !== colorFormat) continue
    indexRepetition++
    draw({ ctx, color: fillColor, x, y, w, h })
    const { colorFormat: colorTop } = eyeDropper({ ctx, x, y: y - h })
    if (colorTop === bg) pixelStack.push([x, y - h])
    const { colorFormat: colorLeft } = eyeDropper({ ctx, x: x - w, y })
    if (colorLeft === bg) pixelStack.push([x - w, y])
    const { colorFormat: colorBottom } = eyeDropper({ ctx, x, y: y + h })
    if (colorBottom === bg) pixelStack.push([x, y + h])
    const { colorFormat: colorRight } = eyeDropper({ ctx, x: x + w, y })
    if (colorRight === bg) pixelStack.push([x + w, y])
  }

  console.log(indexRepetition)
}
