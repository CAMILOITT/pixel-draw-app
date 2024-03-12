import { test, describe, expect } from 'vitest'
import { GetColor } from './color'

describe('colors', () => {
  test('get data color in format hsla or hsl', () => {
    const colorHsla = 'hsla(100, 20%, 50%, 1)'
    const colorHsl = 'hsl(20, 40%, 60%)'

    const returnColor = GetColor.getDataHsla(colorHsla)
    const returnColor2 = GetColor.getDataHsla(colorHsl)

    // value of color in format hsla
    expect(returnColor).toEqual({ h: 100, s: 20, l: 50, a: 1 })
    expect(returnColor).not.toEqual({ h: 100, s: 20, l: 30, a: 1 })

    // value of color in format hsl
    expect(returnColor2).toEqual({
      a: 1,
      h: 20,
      l: 60,
      s: 40,
    })
    expect(returnColor2).not.toEqual({ h: 100, s: 20, l: 50, a: 1 })
  })

  test('get data color in format rgba or rgb', () => {
    const colorRgba = 'rgba(100, 20, 50, 1)'
    const colorRgb = 'rgb(20, 40, 60)'

    const returnColor = GetColor.getDataRgb(colorRgba)
    const returnColor2 = GetColor.getDataRgb(colorRgb)

    expect(returnColor).toEqual({
      a: 1,
      b: 50,
      g: 20,
      r: 100,
    })
    expect(returnColor).not.toEqual({
      a: 1,
      b: 60,
      g: 40,
      r: 20,
    })

    expect(returnColor2).toEqual({
      a: 1,
      b: 60,
      g: 40,
      r: 20,
    })
    expect(returnColor2).not.toEqual([20, 40, 20, 1])
  })

  test('compare color', () => {
    const color1 = 'rgb(20, 40, 60)'
    const color2 = 'rgb(20, 40, 60)'
    const color3 = 'rgb(40, 60, 70)'

    const result = GetColor.compareColor(color1, color2)
    const resultError = GetColor.compareColor(color1, color3)

    expect(result).toBeTruthy()
    expect(resultError).toBeFalsy()
  })
})
