import { CanvasContext } from '../../types/drawing/interface'
import {
  Eraser,
  FillBackgroundCanvas,
  InfoDrawing,
} from '../../types/drawing/types'
import { Tools } from '../../types/tools/enums'
import { coords } from './coord'
import { bucketFill, eyeDropper } from './tools'
import { cleanCanvas } from './update'

/**
 * Fills the background of a canvas with the specified color.
 *
 * @param {FillBackgroundCanvas} infoCanvas - A object with info about the canvas.
 * @prop {CanvasContext} ctx - Context of the canvas to be modified.
 * @prop {number} h - The height of the canvas.
 * @prop {number} w - The width of the canvas.
 * @prop {string | null} bg - The background color of the canvas.
 */

export function fillBackgroundCanvas({ ctx, bg, w, h }: FillBackgroundCanvas) {
  if (!bg) return
  ctx.beginPath()
  ctx.fillStyle = bg
  ctx.rect(0, 0, w, h)
  ctx.fill()
  ctx.closePath()
}

/**
 * Fills the background of a canvas with the specified color.
 * @param {InfoDrawing} infoDraw - The canvas context and configuration.
 */

export function draw({ ctx, color, x, y, w, h }: InfoDrawing) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.rect(x, y, w, h)
  ctx.fill()
  ctx.closePath()
  coords.toGroup({ tool: Tools.brush, color, x, y, w, h })
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

export function clean({ ctx, x, y, w, h, bg }: Eraser) {
  if (bg) {
    const infoDrawing = { ctx, x, y, w, h, color: bg }
    draw(infoDrawing)
    return
  }
  ctx.beginPath()
  ctx.clearRect(x, y, w, h)
  ctx.closePath()
  coords.toGroup({ tool: Tools.eraser, x, y, w, h, color: bg })
}

/**
 * repaint the canvas with the saved information
 *
 * @param {CanvasContext} CanvasContext
 * @prop {CanvasRenderingContext2D} ctx
 */

export function reDrawing({ ctx }: CanvasContext) {
  const sizeCanvas = { w: ctx.canvas.width, h: ctx.canvas.height }
  ctx.clearRect(0, -100, sizeCanvas.w + 500, sizeCanvas.h + 500)

  cleanCanvas({ ctx, w: ctx.canvas.width, h: ctx.canvas.height, bg: null })

  for (const blockDraw of coords.coords) {
    for (const dataDraw of blockDraw) {
      if (dataDraw.tool === Tools.eraser)
        clean({ ...dataDraw, bg: dataDraw.color, ctx })
      if (dataDraw.tool === Tools.brush && dataDraw.color)
        draw({ ...dataDraw, color: dataDraw.color, ctx })
      if (dataDraw.tool === Tools.fillBucket) {
        const { colorFormat: bg } = eyeDropper({
          ctx,
          ...dataDraw,
        })
        const fillColor = dataDraw.color || 'black'
        bucketFill({ ctx, ...dataDraw, color: bg, fillColor })
      }
    }
  }
}
