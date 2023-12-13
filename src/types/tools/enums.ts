/**
 * Enumeration of drawing tools.
 * @enum {string} list of tools Drawing
 * @prop {string} brush - tool to paint the canvas
 * @prop {string} eraser - tool to erase the canvas
 * @prop {string} eyeDropper - tool to obtain the value of a point on the canvas
 * @readonly
 */

export enum Tools {
  /** tool to paint the canvas */
  brush = 'brush',
  /** tool to erase the canvas */
  eraser = 'eraser',
  /** tool to obtain the value of a point on the canvas */
  eyeDropper = 'eyeDropper',
  /** fill the adjacent area with a specific color  */
  fillBucket = 'fillBucket',
}
