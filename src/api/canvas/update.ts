import { cleanBgCanvas } from '../../const/infoCanvas'
// import { InformationDrawing } from '../../types/brush/interface'
import { CleanCanvas } from '../../types/canvas/type'
import { CanvasContext } from '../../types/drawing/interface'

// export const arrCoord: InformationDrawing[][] = []
// export let nextArrCoord: InformationDrawing[][] = []
// export let group: InformationDrawing[] = []

/**
 * Saves the information of the drawing to be able to repaint the canvas
 * @param {InformationDrawing} dataDrawing
 * @prop {number} x - coordinate on the x-axis in the two-dimensional plane
 * @prop {number} y - coordinate on the y-axis in the two-dimensional plane
 * @prop {number} w - pixel width to draw
 * @prop {number} h - pixel height to draw
 * @prop {Tools} tool - tool used for painting
 * @prop {string | null} bg - color of the pixel being painted
 */
// export function toGroup({ x, y, w, h, tool, bg }: InformationDrawing) {
//   group.push({ x, y, w, h, tool, bg })
// }

/**
 * Saves the information of the drawing to be able to repaint the canvas
 */
// export function update() {
//   arrCoord.push(group)
//   nextArrCoord = [...arrCoord]
//   group = []
// }

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
