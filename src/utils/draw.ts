export interface InfoDrawing {
  x: number
  y: number
  w: number
  h: number
  bg: string
}
export class Drawing {
  static drawSquare(
    ctx: CanvasRenderingContext2D,
    { x, y, w, h, bg }: InfoDrawing
  ) {
    ctx.beginPath()
    ctx.fillStyle = bg
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.closePath()
  }
}
