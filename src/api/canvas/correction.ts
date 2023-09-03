import { draw } from './drawing'

/**
 * Handle correction of position on canvas.
 * @param value - Object containing canvas context, position, size, background color, and movement information.
 * @param {CanvasRenderingContext2D} value.ctx - The canvas rendering context.
 * @param {number} value.x - The x-coordinate of the shape.
 * @param {number} value.y - The y-coordinate of the shape.
 * @param {number} value.w - The width of the shape.
 * @param {number} value.h - The height of the shape.
 * @param {string} value.bg - The background color of the shape.
 * @param {Object} value.prevPosition - The previous position of the shape.
 * @param {number} value.prevPosition.x - The previous x-coordinate of the shape.
 * @param {number} value.prevPosition.y - The previous y-coordinate of the shape.
 * @param {number} value.movementX - The movement in the x-direction.
 * @param {number} value.movementY - The movement in the y-direction.
 */

export function handleCorrection(value: {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  w: number
  h: number
  bg: string
  prevPosition: {
    x: number
    y: number
  }
  movementX: number
  movementY: number
}) {
  const { ctx, x, y, w, h, bg, prevPosition, movementX, movementY } = value

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