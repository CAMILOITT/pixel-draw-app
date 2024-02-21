import { test, describe, expect } from 'vitest'
import { Color } from './color'

describe('colors', () => {
  test('get data color in format hsla or hsl', () => {
    const colorHsla = 'hsla(100, 20%, 50%, 1)'
    const colorHsl = 'hsl(20, 40%, 60%)'

    const returnColor = Color.getDataHsla(colorHsla)
    const returnColor2 = Color.getDataHsla(colorHsl)

    // value of color in format hsla
    expect(returnColor).toEqual([100, 20, 50, 1])
    expect(returnColor).not.toEqual([100, 20, 30, 1])

    // value of color in format hsl
    expect(returnColor2).toEqual([20, 40, 60, 1])
    expect(returnColor2).not.toEqual([20, 40, 20, 1])
  })

  test('get data color in format rgba or rgb', () => {
    const colorRgba = 'rgba(100, 20, 50, 1)'
    const colorRgb = 'rgb(20, 40, 60)'

    const returnColor = Color.getDataRgb(colorRgba)
    const returnColor2 = Color.getDataRgb(colorRgb)

    expect(returnColor).toEqual([100, 20, 50, 1])
    expect(returnColor).not.toEqual([100, 20, 30, 1])

    expect(returnColor2).toEqual([20, 40, 60, 1])
    expect(returnColor2).not.toEqual([20, 40, 20, 1])
  })

  test('convert color of format rgb/a to hsl/a', () => {
    const color = 'rgb(20, 40, 60)'
    const returnColor = Color.convertRgbToHsl(color)

    expect(returnColor).toEqual([210, 50, 16, 1])

    expect(returnColor).not.toEqual([20, 40, 20, 1])
  })

  test('compare color', () => {
    const color1 = 'rgb(20, 40, 60)'
    const color2 = 'rgb(20, 40, 60)'
    const color3 = 'rgb(40, 60, 70)'

    const result = Color.compareColor(color1, color2)
    const resultError = Color.compareColor(color1, color3)

    expect(result).toBeTruthy()
    expect(resultError).toBeFalsy()
  })
})
