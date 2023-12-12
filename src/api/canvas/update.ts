import { cleanBgCanvas } from '../../const/infoCanvas'
import { CleanCanvas } from '../../types/canvas/type'
import { CanvasContext } from '../../types/drawing/interface'


/**
 * erase the entire canvas
 * @param {CleanCanvas} value
 * @prop {CanvasRenderingContext2D} ctx - context of canvas
 * @prop {number} w - width of canvas
 * @prop {number} h - height of canvas
 * @prop {string | null} bg - background color of canvas
 */

export function cleanCanvas({ ctx, w, h, bg }: CleanCanvas) {
  if (!bg) {
    ctx.beginPath()
    ctx.clearRect(0, 0, w, h)
    ctx.closePath()
  } else {
    ctx.beginPath()
    ctx.fillStyle = bg
    ctx.clearRect(0, 0, w, h)
    ctx.fill()
    ctx.closePath()
  }
}

/**
 * paints the canvas with the information stored in the variable
 * @param {CanvasContext} CanvasContext
 * @prop {CanvasRenderingContext2D} ctx - context of canvas
 */

export function handleCleanBg({ ctx }: CanvasContext) {
  for (const clean of cleanBgCanvas) {
    ctx.clearRect(clean.x, clean.y, clean.w, clean.h)
  }
}
