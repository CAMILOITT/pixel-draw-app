import { CanvasSizeChange } from '../../canvas/interface'
import { CoordDrawing, DrawingDimensiones } from '../../drawing/interface'

export interface SizePixel {
  clientX: number
  clientY: number
  left: number
  top: number
  prevPosition: CoordDrawing
  sizePixel: DrawingDimensiones
  brushSize: DrawingDimensiones
  multiplier: CoordDrawing
  size: CanvasSizeChange
}

export interface PositionPixel {
  x: number
  y: number
  w: number
  h: number
  movementX: number
  movementY: number
}

export type MouseReturn = CoordDrawing &
  DrawingDimensiones & {
    movementX: number
    movementY: number
  }
