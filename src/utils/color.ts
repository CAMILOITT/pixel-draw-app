import { InformationColor } from 'src/types/color/enums'

export class Color {
  static getDataHsla(colorHsla: string) {
    const regex =
      /hsla?\s*?\(\s*?(?<h>\d+),\s*?(?<s>\d+)%?,\s*?(?<l>\d+)%,?\s*(?<a>\d+(?:\.\d+)?)?\s*?\)/
    const infoMatch = colorHsla.match(regex)
    if (!infoMatch || !infoMatch.groups) return null
    return Object.values(infoMatch.groups).map(element =>
      isNaN(parseInt(element)) ? 1 : Number(element)
    ) as [number, number, number, number]
  }

  static getDataRgb(colorRgb: string) {
    const regex =
      /rgba?\s*?\(\s*?(?<r>\d+),\s*?(?<g>\d+),\s*?(?<b>\d+),?\s*?(?<a>\d+(?:\.\d+)?)?\s*?\)/

    const infoMatch = colorRgb.match(regex)
    if (!infoMatch || !infoMatch.groups) return null
    return Object.values(infoMatch.groups).map(element =>
      isNaN(parseInt(element)) ? 1 : Number(element)
    ) as [number, number, number, number]
  }

  static convertRgbToHsl(color: string) {
    if (color.includes('rgb')) {
      const value = this.getDataRgb(color)
      if (value) return ConvertColor.rgbToHsl(...value)
    }
    if (color.includes('hsl')) return this.getDataHsla(color)
    return null
  }

  static compareColor(color1: string, color2: string) {
    const valueColor1 = this.convertRgbToHsl(color1)
    const valueColor2 = this.convertRgbToHsl(color2)

    return JSON.stringify(valueColor1) === JSON.stringify(valueColor2)
  }

  static convertDataToString({
    hue,
    saturation,
    lightness,
    alpha,
  }: InformationColor) {
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
  }
}

export class ConvertColor {
  static rgbToHsl(
    red: number,
    green: number,
    blue: number,
    alpha: number = 1
  ): [number, number, number, number] {
    if (!alpha) alpha = 1

    red /= 255
    green /= 255
    blue /= 255
    const l = Math.max(red, green, blue)
    const s = l - Math.min(red, green, blue)
    const h = s
      ? l === red
        ? (green - blue) / s
        : l === green
        ? 2 + (blue - red) / s
        : 4 + (red - green) / s
      : 0

    const r = Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h)
    const g = Math.round(
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    )
    const b = Math.round((100 * (2 * l - s)) / 2)

    return [r, g, b, alpha]
  }

  static hslToRgb(
    hue: number,
    saturation: number,
    light: number,
    alpha: number = 1
  ) {
    if (!alpha) alpha = 1
    saturation /= 100
    light /= 100

    const c = (1 - Math.abs(2 * light - 1)) * saturation
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
    const m = light - c / 2
    let r = 0
    let g = 0
    let b = 0

    if (0 <= hue && hue < 60) {
      r = c
      g = x
      b = 0
    } else if (60 <= hue && hue < 120) {
      r = x
      g = c
      b = 0
    } else if (120 <= hue && hue < 180) {
      r = 0
      g = c
      b = x
    } else if (180 <= hue && hue < 240) {
      r = 0
      g = x
      b = c
    } else if (240 <= hue && hue < 300) {
      r = x
      g = 0
      b = c
    } else if (300 <= hue && hue < 360) {
      r = c
      g = 0
      b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return [r, g, b, alpha]
  }
}
