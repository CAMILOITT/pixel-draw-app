import { CleanCanvas } from '../../types/canvas/type'

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
