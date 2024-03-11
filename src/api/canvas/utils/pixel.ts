import { SizePixel } from '../../../types/utils/events/mouse'

export function calculatePixelMouse({
  clientX,
  clientY,
  left,
  top,
  sizePixel,
  brushSize,
  multiplier,
  size,
}: SizePixel): {
  x: number
  y: number
  w: number
  h: number
} {
  const correctingX = clientX - left
  const correctingY = clientY - top

  const sizePixelW = sizePixel.w * multiplier.x
  const sizePixelH = sizePixel.h * multiplier.y

  const w = Math.ceil(sizePixelW * brushSize.w)
  const h = Math.ceil(sizePixelH * brushSize.h)

  const pixelCalculate = {
    w: size.relative.w / (size.absolute.w / sizePixelW),
    h: size.relative.h / (size.absolute.h / sizePixelH),
  }

  const y = Math.floor(Math.floor(correctingY / pixelCalculate.h) * sizePixelH)

  const x = Math.floor(Math.floor(correctingX / pixelCalculate.w) * sizePixelW)

  return { x, y, w, h }
}

export function getMovementPosition({
  x,
  y,
  prevPosition,
}: {
  x: number
  y: number
  prevPosition: { x: number; y: number }
}) {
  return {
    movementX: prevPosition.x < x ? 1 : -1,
    movementY: prevPosition.y < y ? 1 : -1,
  }
}
