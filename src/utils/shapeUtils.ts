import { drawCircle, drawRectangle, drawSquare } from '../api/canvas/drawing'
import { toGroup } from '../api/canvas/update'
import { CanvasContext } from '../types/drawing/interface'
import { ShapesBrush } from '../types/brush/enum'
import {
  InfoCoordDrawingCircleAndSquare,
  InfoCoordDrawingRectangle,
} from '../types/brush/interface'

export function handleConditionalShape({
  ctx,
  x,
  y,
  w,
  bg,
  size,
  selectedBrush,
}: CanvasContext & {
  x: number
  y: number
  size: number
  bg: string
  selectedBrush: ShapesBrush
  w: number
}) {
  if (selectedBrush === ShapesBrush.circle) {
    handleDrawCircle({ ctx, x, y, size, bg, brush: ShapesBrush.circle })
  }
  if (selectedBrush === ShapesBrush.rectangle) {
    handleDrawRectangle({
      ctx,
      x,
      y,
      w,
      h: size,
      bg,
      brush: ShapesBrush.rectangle,
    })
  }
  if (selectedBrush === ShapesBrush.square) {
    handleDrawSquare({ ctx, x, y, size, bg, brush: ShapesBrush.square })
  }
}
function handleDrawSquare({
  ctx,
  x,
  y,
  size,
  bg,
  brush,
}: CanvasContext & InfoCoordDrawingCircleAndSquare) {
  drawSquare({ ctx, x, y, size, bg })
  toGroup({ x, y, bg, brush, size })
}

function handleDrawRectangle({
  ctx,
  x,
  y,
  w,
  h,
  bg,
  brush,
}: CanvasContext & InfoCoordDrawingRectangle) {
  drawRectangle({ ctx, x, y, h, w, bg })
  toGroup({ x, y, bg, brush, w, h })
}

function handleDrawCircle({
  ctx,
  x,
  y,
  size,
  bg,
  brush,
}: CanvasContext & InfoCoordDrawingCircleAndSquare) {
  drawCircle({ ctx, x, y, size, bg })
  toGroup({ x, y, bg, brush, size })
}
