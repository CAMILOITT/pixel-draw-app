import { InformationDrawing } from '../../types/brush/interface'
import { Tools } from '../../types/tools/enums'
import { describe, test, expect, beforeEach } from 'vitest'
import { Coords } from './coord'

let coords!: Coords
let coord1!: InformationDrawing[]
let coord2: InformationDrawing[]

describe('coord', () => {
  beforeEach(() => {
    coords = new Coords()
    coord1 = Array.from({ length: 5 }, () => ({
      x: Math.round(Math.random() * 30),
      y: Math.round(Math.random() * 30),
      color: 'white',
      w: 10,
      h: 10,
      tool: Tools.brush,
    }))

    coord2 = Array.from({ length: 8 }, () => ({
      x: Math.round(Math.random() * 30),
      y: Math.round(Math.random() * 30),
      color: 'white',
      w: 10,
      h: 10,
      tool: Tools.brush,
    }))
  })

  test('add a coordinate list', () => {
    coord1.forEach(coord => {
      coords.toGroup(coord)
    })
    const coordError = coord2
    coords.update()
    expect(coords.coords).toHaveLength(1)
    expect(coords.coords[0]).toHaveLength(coord1.length)
    expect(coords.coords[0]).toEqual(coord1)
    expect(coords.coords[0]).not.toEqual(coordError)
  })

  test('add two coordinate list', () => {
    coord1.forEach(coord => {
      coords.toGroup(coord)
    })

    coords.update()

    coord2.forEach(coord => {
      coords.toGroup(coord)
    })

    coords.update()

    expect(coords.coords).toHaveLength(2)
    expect(coords.coords[1]).toHaveLength(coord2.length)
    expect(coords.coords).toEqual([coord1, coord2])
  })

  test('undo', () => {
    coord1.forEach(coord => {
      coords.toGroup(coord)
    })
    coords.update()
    coord2.forEach(coord => {
      coords.toGroup(coord)
    })
    coords.update()
    coords.undo()

    expect(coords.coords).toHaveLength(1)
    expect(coords.coords).toEqual([coord1])
  })

  test('redo', () => {
    coord1.forEach(coord => {
      coords.toGroup(coord)
    })
    coords.update()
    coord2.forEach(coord => {
      coords.toGroup(coord)
    })
    coords.update()
    coords.undo()
    coords.redo()

    expect(coords.coords).toHaveLength(2)
    expect(coords.coords).toEqual([coord1, coord2])
  })
})
