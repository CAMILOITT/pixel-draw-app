import { ShapesBrush } from '../../../types/brush/enum'
import { BrushProvider } from '../../../types/brush/interface'
import { DrawingDimensiones } from '../../../types/drawing/interface'

export const initValueSizeBrush: DrawingDimensiones = {
  w: 1,
  h: 1,
}

export const initialValueSelectedBrush: ShapesBrush = ShapesBrush.rectangle

export const Context: BrushProvider = {
  brushSize: initValueSizeBrush,
  setBrushSize: value => value,
  selectedBrush: initialValueSelectedBrush,
  setSelectedBrush: (value: React.SetStateAction<ShapesBrush>) => value,
}
