import { CoordDrawing, DrawingDimensiones } from '../types/drawing/interface'
import { DrawingCanvas } from '../types/drawing/types'

export const maxSizeCanvas: DrawingDimensiones = {
  w: 1000,
  h: 1000,
}

export const minSizeCanvas: DrawingDimensiones = {
  w: 25,
  h: 25,
}

export const dataSize: DrawingDimensiones = {
  w: 500,
  h: 500,
}

export const dataCanvasInt: DrawingCanvas & CoordDrawing = {
  x: (window.innerWidth - dataSize.w) / 2,
  y: (window.innerHeight - dataSize.h) / 2,
  ...dataSize,
  bg: 'white',
}

export const cleanBgCanvas: (CoordDrawing & DrawingDimensiones)[] = [
  {
    x: -window.innerWidth,
    y: -window.innerHeight,
    w: window.innerWidth + dataCanvasInt.x,
    h: window.innerHeight * 3,
  },
  {
    x: 0,
    y: -window.innerHeight,
    w: window.innerWidth,
    h: window.innerHeight + dataCanvasInt.y,
  },
  {
    x: dataCanvasInt.x + dataCanvasInt.w,
    y: -window.innerHeight,
    w: window.innerWidth * 2,
    h: window.innerHeight * 3,
  },
  {
    x: 0,
    y: dataCanvasInt.y + dataCanvasInt.h,
    w: window.innerWidth,
    h: window.innerHeight,
  },
]

export const limitScaleCanvas = 20

export const speedMove = 2

export const positionMove: CoordDrawing = { x: 0, y: 0 }
