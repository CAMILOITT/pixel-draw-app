import { CanvasContext } from '../../types/drawing/interface'
import {
  Eraser,
  FillBackgroundCanvas,
  InfoDrawing,
} from '../../types/drawing/types'
import { Tools } from '../../types/tools/enums'
import { arrCoord, toGroup } from './update'

/**
 * Fills the background of a canvas with the specified color.
 *
 * @param infoCanvas - A object with info about the canvas.
 * @prop {CanvasContext} ctx - Context of the canvas to be modified.
 * @prop {number} h - The height of the canvas.
 * @prop {number} w - The width of the canvas.
 * @prop {string | null} bg - The background color of the canvas.
 */

export function fillBackgroundCanvas(infoCanvas: FillBackgroundCanvas) {
  if (!infoCanvas.bg) return
  const { ctx, bg, w, h } = infoCanvas
  ctx.beginPath()
  ctx.fillStyle = bg
  ctx.rect(0, 0, w, h)
  ctx.fill()
  ctx.closePath()
}

/**
 * Fills the background of a canvas with the specified color.
 *
 * @param {InfoDrawing} infoDraw - The canvas context and configuration.
 */
export function draw(infoDraw: InfoDrawing) {
  const { ctx } = infoDraw
  ctx.beginPath()
  ctx.fillStyle = infoDraw.bg
  ctx.rect(infoDraw.x, infoDraw.y, infoDraw.w, infoDraw.h)
  ctx.fill()
  ctx.closePath()
  toGroup({ tool: Tools.brush, ...infoDraw })
}

/**
 * clear the pixelated area
 * @param valueClean
 * @prop {CanvasRenderingContext2D} value.ctx - Canvas context
 * @prop {number} x - x coordinate
 * @prop {number} y - y coordinate
 * @prop {number} w - width
 * @prop {number} h - height
 * @prop {string | null} bg - pixel color
 */

export function clean(valueClean: Eraser) {
  const { ctx, x, y, w, h, bg } = valueClean

  if (bg) {
    const infoDrawing = { ...valueClean, bg: bg }
    draw(infoDrawing)
    return
  }

  ctx.beginPath()
  ctx.clearRect(x, y, w, h)
  ctx.closePath()
  toGroup({ tool: Tools.eraser, ...valueClean })
}

export function reDrawing({
  ctx,
  multiplier,
}: CanvasContext & {
  multiplier: number
}) {
  const sizeCanvas = { w: ctx.canvas.width, h: ctx.canvas.height }
  
  ctx.clearRect(0, -100, sizeCanvas.w + 500, sizeCanvas.h + 500)

  for (const blockDraw of arrCoord) {
    for (const dataDraw of blockDraw) {
      if (dataDraw.tool === Tools.eraser) {
        clean({ ...dataDraw, ctx })
      }
      if (dataDraw.tool === Tools.brush && dataDraw.bg) {
        draw({ ...dataDraw, bg: dataDraw.bg, ctx })
      }
    }
  }
}
