import { ConfigCanvas } from '../../types/canvas/interface'
import { InformationColorChange } from '../../types/color/interface'
import { CoordDrawing } from '../../types/drawing/interface'
import { Tools } from '../../types/tools/enums'
import { Color } from '../../utils/color'
import { handleCorrection } from './correction'
import { clean, draw } from './drawing'

export default interface ActionsDrawing {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  w: number
  h: number
  toolSelect: Tools
  infoCanvas: ConfigCanvas
  colors: InformationColorChange
  prevPosition: CoordDrawing
  movementX?: number
  movementY?: number
  type?: string
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
  movementX = 0,
  movementY = 0,
  prevPosition,
}: ActionsDrawing) {
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
      color: Color.convertDataToString(colors[colors.colorFocus]),
    }

    draw(infoDraw)

    if (movementX === 0 && movementY === 0) return
    handleCorrection({
      ...infoDraw,
      movementX,
      movementY,
      prevPosition,
    })
  }
}
