import { CanvasContext, CoordDrawing } from '../../types/drawing/interface'
import { reDrawing } from './drawing'
import { arrCoord, cleanCanvas, handleCleanBg, nextArrCoord } from './update'

/**
 * Gets the color of the canvas at the cursor position
 * @param {CanvasContext & CoordDrawing} value
 * @prop {CanvasContext} ctx - The canvas rendering context
 * @prop {CoordDrawing} x - The x-coordinate of the shape
 * @prop {CoordDrawing} y - The y-coordinate of the shape
 * @returns Object containing color
 */
export function eyeDropper(value: CanvasContext & CoordDrawing) {
  const { ctx, x, y } = value
  const color = ctx.getImageData(x, y, 1, 1).data
  return color
}

export function redo({ ctx }: CanvasContext) {
  if (arrCoord.length === nextArrCoord.length) return
  const index = arrCoord.length
  arrCoord.push(nextArrCoord[index])
  reDrawing({ ctx })
}

export function undo({ ctx }: CanvasContext) {
  if (arrCoord.length < 0) return
  arrCoord.pop()
  reDrawing({ ctx })
}

// Función para rellenar el área contigua con un color específico
export function bucketFill(
  startX: number,
  startY: number,
  targetColor: string,
  fillColor: string,
  ctx: CanvasRenderingContext2D
) {
  const pixelStack = [[startX, startY]]

  const { canvas } = ctx

  const w = 10
  const h = 10

  // if (!pixelStack) return
  while (pixelStack.length) {
    if (!pixelStack === undefined) continue

    const coord = pixelStack.pop()

    if (!coord) continue

    const [x, y] = coord

    // Comprobamos si estamos dentro del lienzo
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue

    // Obtenemos el color del píxel actual
    const pixelData = ctx.getImageData(x, y, 1, 1).data
    const pixelColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`

    // Si el píxel actual es del color que queremos rellenar, lo cambiamos al nuevo color
    if (pixelColor === targetColor) {
      ctx.fillStyle = fillColor
      ctx.fillRect(x, y, w, h)

      // Agregamos los píxeles adyacentes a la pila para continuar el relleno
      pixelStack.push([x + w, y])
      pixelStack.push([x - w, y])
      pixelStack.push([x, y + h])
      pixelStack.push([x, y - h])
    }
  }
}
