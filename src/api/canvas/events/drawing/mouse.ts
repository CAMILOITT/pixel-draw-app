import { ConfigCanvas } from '../../../../types/canvas/interface'
import { InformationColors } from '../../../../types/color/interface'
import {
  CoordDrawing,
  DrawingDimensiones,
} from '../../../../types/drawing/interface'
import { Tools } from '../../../../types/tools/enums'
import { clean, draw } from '../../drawing'
import { bucketFill, eyeDropper } from '../../tools'
import { calculatePixelMouse } from '../../utils/pixel'

export interface StartDrawing {
  e: React.MouseEvent<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D
  limit: number
  brushSize: DrawingDimensiones
  multiplier: CoordDrawing
  sizePixel: DrawingDimensiones
  prevPosition: CoordDrawing
  toolSelect: Tools
  colors: InformationColors
  infoCanvas: ConfigCanvas
}
export function StartDrawing({
  e,
  ctx,
  brushSize,
  multiplier,
  sizePixel,
  prevPosition,
  limit,
  toolSelect,
  colors,
  infoCanvas,
}: StartDrawing) {
  const { clientX, clientY } = e
  const { left, top } = e.currentTarget.getBoundingClientRect()

  const { x, y, w, h } = calculatePixelMouse({
    clientX,
    clientY,
    left,
    top,
    brushSize,
    multiplier,
    sizePixel,
    prevPosition,
  })

  if (!ctx) return

  if (Tools.eyeDropper === toolSelect) {
    const color = eyeDropper({ ctx, x, y })

    return {
      hue: color[0],
      lightness: color[1],
      saturation: color[2],
      alpha: color[3],
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
      x,
      y,
    }
  }

  if (Tools.eraser === toolSelect) {
    clean({ ctx, x, y, w, h, bg: infoCanvas.bg })
    return { x, y }
  }

  if (Tools.brush === toolSelect) {
    for (let i = 0; i < limit; i++) {
      draw({
        ctx,
        x: x - w * (limit - i - 1),
        y: y - h * i,
        w: w * (limit - i) * 2 - w,
        h: h,
        bg: colors[colors.colorFocus].color,
      })

      draw({
        ctx,
        x: x - w * (limit - i - 1),
        y: y + h * i,
        w: w * (limit - i) * 2 - w,
        h: h,
        bg: colors[colors.colorFocus].color,
      })
    }
    return { x, y }
  }
  if (Tools.fillBucket === toolSelect) {
    bucketFill({ ctx, x, y, bg: '', fillColor: '' })
    return { x, y }
  }
}
