import { CorrectionDrawing } from '../../types/drawing/types'
import { draw } from './drawing'

/**
 * Handle correction of position on canvas.
 * @prop {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @prop {number} x - The x-coordinate of the shape.
 * @prop {number} y - The y-coordinate of the shape.
 * @prop {number} w - The width of the shape.
 * @prop {number} h - The height of the shape.
 * @prop {string} bg - The background color of the shape.
 * @prop {Object} prevPosition - The previous position of the shape.
 * @prop {number} prevPosition.x - The previous x-coordinate of the shape.
 * @prop {number} prevPosition.y - The previous y-coordinate of the shape.
 * @prop {number} movementX - The movement in the x-direction.
 * @prop {number} movementY - The movement in the y-direction.
 */

export function handleCorrection({
  ctx,
  x,
  y,
  w,
  h,
  bg,
  prevPosition,
  movementX,
  movementY,
}: CorrectionDrawing) {
  const mouseMoveLeft = prevPosition.x + w !== x && movementX > 0
  const mouseMoveRight = prevPosition.x - w !== x && movementX < 0
  const mouseMoveTop = prevPosition.y - h !== y && movementY < 0
  const mouseMoveBottom = prevPosition.y + h !== y && movementY > 0

  if (mouseMoveLeft && mouseMoveTop) {
    const differenceY = (prevPosition.y - y) / h - 1
    const differenceX = (x - prevPosition.x) / w - 1
    const differenceMax = Math.max(differenceY, differenceX)

    for (let axisX = 0; axisX < differenceMax; axisX++) {
      if (prevPosition.x < x) {
        prevPosition.x += w
      }
      if (prevPosition.y > y) {
        prevPosition.y -= h
      }
      draw({ ctx, ...prevPosition, w, h, bg })
    }

    return
  }

  if (mouseMoveLeft && mouseMoveBottom) {
    const differenceY = (y - prevPosition.y) / h - 1
    const differenceX = (x - prevPosition.x) / w - 1
    const differenceMax = Math.max(differenceY, differenceX)

    for (let axisX = 0; axisX < differenceMax; axisX++) {
      if (prevPosition.x < x) {
        prevPosition.x += w
      }
      if (prevPosition.y < y) {
        prevPosition.y += h
      }
      draw({ ctx, ...prevPosition, w, h, bg })
    }
    return
  }

  if (mouseMoveRight && mouseMoveBottom) {
    const differenceY = (y - prevPosition.y) / h - 1
    const differenceX = (prevPosition.x - x) / w - 1
    const differenceMax = Math.max(differenceY, differenceX)

    for (let axisX = 0; axisX < differenceMax; axisX++) {
      if (prevPosition.x > x) {
        prevPosition.x -= w
      }
      if (prevPosition.y < y) {
        prevPosition.y += h
      }
      draw({ ctx, ...prevPosition, w, h, bg })
    }
    return
  }

  if (mouseMoveRight && mouseMoveTop) {
    const differenceY = (prevPosition.y - y) / h - 1
    const differenceX = (prevPosition.x - x) / w - 1
    const differenceMax = Math.max(differenceY, differenceX)

    for (let axisX = 0; axisX < differenceMax; axisX++) {
      if (prevPosition.x > x) {
        prevPosition.x -= w
      }
      if (prevPosition.y > y) {
        prevPosition.y -= h
      }
      draw({ ctx, ...prevPosition, w, h, bg })
    }
    return
  }

  // horizontal correction
  if (mouseMoveLeft) {
    const differenceX = (x - prevPosition.x) / w - 1
    for (let i = 0; i < differenceX; i++) {
      prevPosition.x += w
      draw({ ctx, x: prevPosition.x, y, w, h, bg })
    }
    return
  }

  if (mouseMoveRight) {
    const differenceX = (prevPosition.x - x) / w - 1
    for (let i = 0; i < differenceX; i++) {
      prevPosition.x -= w
      draw({ ctx, x: prevPosition.x, y, w, h, bg })
    }
    return
  }

  // vertical correction

  if (mouseMoveTop) {
    const differenceY = (prevPosition.y - y) / h - 1
    for (let i = 0; i < differenceY; i++) {
      prevPosition.y -= h
      draw({ ctx, x, y: prevPosition.y, w, h, bg })
    }
    return
  }

  if (mouseMoveBottom) {
    const differenceY = (y - prevPosition.y) / h - 1
    for (let i = 0; i < differenceY; i++) {
      prevPosition.y += h
      draw({ ctx, w, h, bg, ...prevPosition })
    }
    return
  }
}
