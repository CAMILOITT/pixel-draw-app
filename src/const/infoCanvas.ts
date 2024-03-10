import { CoordDrawing, DrawingDimensiones } from '../types/drawing/interface'
import { DrawingCanvas } from '../types/drawing/types'

export const maxSizeCanvas = 1000
export const minSizeCanvas = 100
export const changeSizeCanvas = 10

export const maxTranslate = 100


export const dataSize: DrawingDimensiones = {
  w: 500,
  h: 500,
}

export const dataCanvasInt: DrawingCanvas & CoordDrawing = {
  x: (window.innerWidth - dataSize.w) / 2,
  y: (window.innerHeight - dataSize.h) / 2,
  ...dataSize,
  color: 'white',
}

export const speedMove = 2
