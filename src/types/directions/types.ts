import { Directions } from './enums'

export type DirectionHorizontal =
  | Directions.left
  | Directions.right
  | Directions.undefined

export type DirectionVertical = Directions.up | Directions.down | Directions.undefined
