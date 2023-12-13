import { SizePixel } from '../../../types/utils/events/mouse'

export function calculatePixelMouse({
  clientX,
  clientY,
  left,
  top,
  prevPosition,
  sizePixel,
  brushSize,
  multiplier,
}: SizePixel) : {
  x: number
  y: number
  w: number
  h: number
  movementX: number
  movementY: number
} {
  const movementX = prevPosition.x < clientX ? 1 : -1
  const movementY = prevPosition.y < clientY ? 1 : -1

  const correctingX = clientX - left
  const correctingY = clientY - top

  const sizePixelW = sizePixel.w * multiplier.x
  const sizePixelH = sizePixel.h * multiplier.y

  const w = Math.ceil(sizePixelW * brushSize.w)
  const h = Math.ceil(sizePixelH * brushSize.h)

  const centerDrawX = brushSize.w > 1 ? w / 2 : 0
  const centerDrawY = brushSize.h > 1 ? h / 2 : 0

  const y = Math.floor(
    Math.floor(correctingY / sizePixelH) * sizePixelH - centerDrawY
  )

  const x = Math.floor(
    Math.floor(correctingX / sizePixelW) * sizePixelW - centerDrawX
  )

  return { x, y, w, h, movementX, movementY }
}
