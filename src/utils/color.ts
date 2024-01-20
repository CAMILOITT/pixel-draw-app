export interface ColorHsla {
  h: number
  s: number
  l: number
  a: number
}
export class Color {
  color: string
  constructor({ h, s, l, a }: ColorHsla) {
    this.color = `hsla(${h},${s}%,${l}%,${a})`
  }
  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }
}
