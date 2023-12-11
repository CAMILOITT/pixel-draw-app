import { CanvasContext } from '../../types/drawing/interface'
import {
  Eraser,
  FillBackgroundCanvas,
  InfoDrawing,
} from '../../types/drawing/types'
import { Tools } from '../../types/tools/enums'
import { coords } from './coord'
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
  // const { ctx, bg, w, h } = infoCanvas
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

export function draw({ ctx, bg, x, y, w, h }: InfoDrawing) {
  ctx.beginPath()
  ctx.fillStyle = bg
  ctx.rect(x, y, w, h)
  ctx.fill()
  ctx.closePath()
  // toGroup({ tool: Tools.brush, bg,x,y,w,h })
  coords.toGroup({ tool: Tools.brush, bg, x, y, w, h })
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
    const infoDrawing = { ctx, x, y, w, h, bg }
    draw(infoDrawing)
    return
  }
  ctx.beginPath()
  ctx.clearRect(x, y, w, h)
  ctx.closePath()
  coords.toGroup({ tool: Tools.eraser, x, y, w, h, bg })
  // toGroup({ tool: Tools.eraser, x, y, w, h, bg })
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
      if (dataDraw.tool === Tools.eraser) {
        clean({ ...dataDraw, ctx })
      }
      if (dataDraw.tool === Tools.brush && dataDraw.bg) {
        draw({ ...dataDraw, bg: dataDraw.bg, ctx })
      }
    }
  }
}
