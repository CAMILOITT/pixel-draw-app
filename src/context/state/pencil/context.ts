import { ShapesBrush } from '../../../types/brush/enum'

export const initValueSizeBrush = {
  w: 1,
  h: 1,
}

export const initialValueSelectedBrush: ShapesBrush = ShapesBrush.circle

export const Context: {
  brushSize: typeof initValueSizeBrush
  setBrushSize: (
    value: React.SetStateAction<{
      w: number
      h: number
    }>
  ) => void
  selectedBrush: ShapesBrush
  setSelectedBrush: (value: React.SetStateAction<ShapesBrush>) => void
} = {
  brushSize: initValueSizeBrush,
  setBrushSize: value => value,
  selectedBrush: initialValueSelectedBrush,
  setSelectedBrush: (value: React.SetStateAction<ShapesBrush>) => value,
}
