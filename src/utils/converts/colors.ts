export function rgbaToHex(r: number, g: number, b: number, a: number) {
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}${a.toString(16)}`
}

export function rgbaToHsla(
  red: number,
  green: number,
  blue: number,
  alpha: number
) {
  const r = red / 255
  const g = green / 255
  const b = blue / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let light = (max + min) / 2

  if (max === min) return { h: 0, s: 0, l: light }

  let saturation =
    light < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min)

  let hue

  const delta = max - min
  if (max === r) {
    hue = ((g - b) / delta) % 6
  } else if (max === g) {
    hue = (b - r) / delta + 2
  } else {
    hue = (r - g) / delta + 4
  }

  hue *= 60
  if (hue < 0) {
    hue += 360
  }

  saturation *= 100
  light *= 100

  return { h: hue, s: saturation, l: light, a: alpha }
}

export function hslaToRgba({
  h,
  s,
  l,
  a,
}: {
  h: number
  s: number
  l: number
  a: number
}) {
  h = h % 360
  s = Math.max(0, Math.min(s, 100))
  l = Math.max(0, Math.min(l, 100))

  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)

  return { r, g, b, a }
}
