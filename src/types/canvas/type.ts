import { CanvasContext } from '../drawing/interface'
import { ConfigCanvas } from './interface'

/**
 * Information of canvas
 * @type {CanvasContext & ConfigCanvas}
 * @prop {CanvasRenderingContext2D} ctx - context of canvas
 * @prop {number} w - width of canvas
 * @prop {number} h - height of canvas
 * @prop {string | null} h - background color of canvas
 */
export type CleanCanvas = CanvasContext & ConfigCanvas
