import { InformationDrawing } from '../../types/brush/interface'

export class Coords {
  private _coords: InformationDrawing[][] = []
  private nextCoords: InformationDrawing[][] = []
  private group: InformationDrawing[] = []

  get coords() {
    return this._coords
  }

  update() {
    this._coords.push(this.group)
    this.nextCoords = [...this._coords]
    this.group = []
  }

  toGroup({ x, y, w, h, tool, color: bg }: InformationDrawing) {
    this.group.push({ x, y, w, h, tool, color: bg })
  }

  redo() {
    if (this._coords.length === this.nextCoords.length) return
    const index = this._coords.length
    this._coords.push(this.nextCoords[index])
  }

  undo() {
    if (this._coords.length < 1) return
    this._coords.pop()
  }
}

export const coords = new Coords()
