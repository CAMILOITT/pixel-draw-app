import { InformationDrawing } from '../../types/brush/interface'

class Coords {
  coords: InformationDrawing[][] = []
  private nextCoords: InformationDrawing[][] = []
  private group: InformationDrawing[] = []

  update() {
    this.coords.push(this.group)
    this.nextCoords = [...this.coords]
    this.group = []
  }

  toGroup({ x, y, w, h, tool, bg }: InformationDrawing) {
    this.group.push({ x, y, w, h, tool, bg })
  }

  redo() {
    if (this.coords.length === this.nextCoords.length) return
    const index = this.coords.length
    this.coords.push(this.nextCoords[index])
  }

  undo() {
    if (this.coords.length < 1) return
    this.coords.pop()
  }
}

export const coords = new Coords()
