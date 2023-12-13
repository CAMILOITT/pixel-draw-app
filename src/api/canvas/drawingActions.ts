import { ConfigCanvas } from '../../types/canvas/interface'
import { InformationColors } from '../../types/color/interface'
import { CoordDrawing } from '../../types/drawing/interface'
import { Tools } from '../../types/tools/enums'
import { handleCorrection } from './correction'
import { clean, draw } from './drawing'
import { eyeDropper, bucketFill } from './tools'

export default interface ActionsDrawing {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  w: number
  h: number
  toolSelect: Tools
  infoCanvas: ConfigCanvas
  colors: InformationColors
  prevPosition: CoordDrawing
  movementX?: number
  movementY?: number
}

export function actionsDrawing({
  ctx,
  x,
  y,
  w,
  h,
  toolSelect,
  infoCanvas,
  colors,
  movementX,
  movementY,
  prevPosition,
}: ActionsDrawing) {
  if (Tools.eyeDropper === toolSelect) {
    const color = eyeDropper({
      ctx,
      x,
      y,
    })
    return {
      hue: 0,
      lightness: 0,
      saturation: 100,
      alpha: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }
  }

  if (Tools.eraser === toolSelect) {
    const valueClean = {
      ctx,
      x,
      y,
      w,
      h,
      bg: infoCanvas.bg,
    }
    clean(valueClean)
    return
  }

  if (Tools.brush === toolSelect) {
    const infoDraw = {
      ctx,
      x,
      y,
      w,
      h,
      bg: colors[colors.colorFocus].color,
    }

    draw(infoDraw)

    if (!movementX || !movementY) return
    handleCorrection({
      ...infoDraw,
      movementX,
      movementY,
      prevPosition,
    })
  }

  if (Tools.fillBucket === toolSelect) {
    bucketFill({ ctx, x, y, bg: '', fillColor: '' })
  }
}
