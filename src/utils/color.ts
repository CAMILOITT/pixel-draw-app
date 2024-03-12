import { InformationColor } from '../types/color/enums'

export class GetColor {
  static getData(color: string) {
    const data = {
      data: { h: 0, s: 0, l: 0, a: 0 },
      colorFormat: '',
    }
    if (color.includes('rgb')) {
      const { r, g, b, a: ra } = this.getDataRgb(color)
      const { h, s, l, a } = ConvertColor.rgbToHsl(r, g, b, ra)
      data.data = { h, s, l, a }
      data.colorFormat = this.convertDataToString({
        hue: h,
        saturation: s,
        lightness: l,
        alpha: a,
      })
    }

    if (color.includes('hsl')) {
      const { h, s, l, a } = this.getDataHsla(color)
      data.data = { h, s, l, a }
      data.colorFormat = this.convertDataToString({
        hue: h,
        saturation: s,
        lightness: l,
        alpha: a,
      })
    }
    return data
  }

  static getDataHsla(colorHsla: string) {
    const regex =
      /hsla?\s*?\(\s*?(?<h>\d+),\s*?(?<s>\d+)%?,\s*?(?<l>\d+)%,?\s*(?<a>\d+(?:\.\d+)?)?\s*?\)/
    const infoMatch = colorHsla.match(regex)
    if (!infoMatch || !infoMatch.groups)
      return {
        h: 0,
        s: 0,
        l: 0,
        a: 0,
      }
    return {
      h: Number(infoMatch.groups.h),
      s: Number(infoMatch.groups.s),
      l: Number(infoMatch.groups.l),
      a: Number(infoMatch.groups.a)||1,
    }
  }

  static getDataRgb(colorRgb: string) {
    const regex =
      /rgba?\s*?\(\s*?(?<r>\d+),\s*?(?<g>\d+),\s*?(?<b>\d+),?\s*?(?<a>\d+(?:\.\d+)?)?\s*?\)/

    const infoMatch = colorRgb.match(regex)
    if (!infoMatch || !infoMatch.groups)
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      }
    return {
      r: Number(infoMatch.groups.r),
      g: Number(infoMatch.groups.g),
      b: Number(infoMatch.groups.b),
      a: Number(infoMatch.groups.a)||1,
    }
  }

  static compareColor(color1: string, color2: string) {
    const { colorFormat: value1 } = this.getData(color1)
    const { colorFormat: value2 } = this.getData(color2)
    return value1 === value2
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
  static rgbToHsl(red: number, green: number, blue: number, alpha: number = 1) {
    red /= 255
    green /= 255
    blue /= 255
    const light = Math.max(red, green, blue)
    const saturation = light - Math.min(red, green, blue)
    const hue = saturation
      ? light === red
        ? (green - blue) / saturation
        : light === green
        ? 2 + (blue - red) / saturation
        : 4 + (red - green) / saturation
      : 0

    const h = Math.round(60 * hue < 0 ? 60 * hue + 360 : 60 * hue)
    const s = Math.round(
      100 *
        (saturation
          ? light <= 0.5
            ? saturation / (2 * light - saturation)
            : saturation / (2 - (2 * light - saturation))
          : 0)
    )
    const l = Math.round((100 * (2 * light - saturation)) / 2)

    return { h, s, l, a: alpha }
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

    return { r, g, b, a: alpha }
  }
}
