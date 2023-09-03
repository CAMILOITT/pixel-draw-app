export class Drawing {
  private listDraw: {
    type: 'brush' | 'eraser'
    x: number
    y: number
    w: number
    h: number
    color?: string
  }[]

  private listListDraw: {
    type: 'brush' | 'eraser'
    x: number
    y: number
    w: number
    h: number
    color?: string
  }[][]

  private listListDrawPrev: {
    type: 'brush' | 'eraser'
    x: number
    y: number
    w: number
    h: number
    color?: string
  }[][]

  private ctx: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    this.listListDraw = []
    this.listListDrawPrev = []
    this.listDraw = []
    this.ctx = canvas.getContext('2d')
  }

  public drawPixel({
    x,
    y,
    w,
    h,
    color,
  }: {
    x: number
    y: number
    w: number
    h: number
    color?: string
  }) {
    if (!this.ctx) return
    this.ctx.fillStyle = `${color}`
    this.ctx.rect(x, y, w, h)
    this.ctx.fill()
    this.updateListPixels({
      type: 'brush',
      x,
      y,
      w,
      h,
      color,
    })
  }
  public clearCanvas(color?: string) {
    if (color) {
      if (!this.ctx) return
      this.ctx.fillStyle = `${color}`
      this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.fill()
      return
    }
    this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
  public clear({
    x,
    y,
    w,
    h,
    color,
  }: {
    x: number
    y: number
    w: number
    h: number
    color?: string
  }) {
    if (color) {
      this.drawPixel({ x, y, w, h, color })
      return
    }
    this.ctx?.clearRect(x, y, w, h)
    this.updateListPixels({
      type: 'eraser',
      x,
      y,
      w,
      h,
      color,
    })
  }

  public eyeDropper({
    x,
    y,
    w,
    h,
  }: {
    x: number
    y: number
    w: number
    h: number
  }) {
    const listColor = this.ctx?.getImageData(x, y, w, h)

    if (!listColor) return
    const color = listColor.data[0]
    return color
  }

  // herramientas
  public undo() {
    this.listListDraw.push(this.listListDrawPrev[this.listListDraw.length - 1])
    this.reDrawing()
  }

  public rendo() {
    this.listListDraw.pop()
    this.reDrawing()
  }

  private reDrawing() {
    for (const listInfoDraw of this.listListDraw) {
      for (const infoDraw of listInfoDraw) {
        if (infoDraw.type === 'eraser') {
          this.clear(infoDraw)
        }
        if (infoDraw.type === 'brush') {
          this.drawPixel({ ...infoDraw })
        }
      }
    }
  }

  private updateListPixels({
    type,
    x,
    y,
    w,
    h,
    color,
  }: {
    type: 'brush' | 'eraser'
    x: number
    y: number
    w: number
    h: number
    color?: string
  }) {
    this.listDraw.push({
      type,
      x,
      y,
      w,
      h,
      color,
    })
  }

  public updateListOfListPixels() {
    this.listListDraw.push(this.listDraw)
    this.listListDrawPrev.push(this.listDraw)
    this.listDraw = []
  }
}
