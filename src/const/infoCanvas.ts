import { CoordDrawing, DrawingDimensiones } from '../types/drawing/interface'
import { DrawingCanvas } from '../types/drawing/types'

export const maxSizeCanvas = 1000
export const minSizeCanvas = 250
export const changeSizeCanvas = 10

export const maxTranslate = 100

export const SizeCanvas: DrawingDimensiones = {
  w: 500,
  h: 500,
}

export const SizePixel: DrawingDimensiones = {
  w: 10,
  h: 10,
}

export const dataCanvasInt: DrawingCanvas & CoordDrawing = {
  x: (window.innerWidth - SizeCanvas.w) / 2,
  y: (window.innerHeight - SizeCanvas.h) / 2,
  ...SizeCanvas,
  color: 'white',
}

export const speedMove = 2
