import React, { useContext, useState } from 'react'
import { BrushContext } from '../../../../context/state/pencil/Pencil'
import { ShapesBrush } from '../../../../types/brush/enum'
import css from './Brush.module.css'
import '../style/styleTemplates.css'

interface BrushProps {}

const LIMITSIZE = { min: 0, max: 20 }

export default function Brush({}: BrushProps) {
  const { brushSize, setBrushSize, selectedBrush, setSelectedBrush } =
    useContext(BrushContext)

  const [valueBrushSize, setValueBrushSize] = useState(brushSize)

  function handleValueBrushSize(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target
    let size

    if (ShapesBrush.rectangle === selectedBrush) {
      size = {
        w: name === 'valueBrushSize' ? parseInt(value) : brushSize.w,
        h: name === 'secondPencilSize' ? parseInt(value) : brushSize.h,
      }
    } else {
      size = {
        w: parseInt(value),
        h: parseInt(value),
      }
    }

    setValueBrushSize(size)
    setBrushSize(size)
  }

  function handleValueSelectionBrush(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.currentTarget

    if (ShapesBrush.rectangle === selectedBrush) {
      const size = {
        w: brushSize.w,
        h: brushSize.w,
      }
      setBrushSize(size)
    }

    setSelectedBrush(value as ShapesBrush)
  }

  return (
    <div className={css.toolBrush}>
      <h3>Pinceles</h3>
      <label htmlFor="typePencil" className={css.selectBrush}>
        pincel:
        <select
          name="typePencil"
          id="typePencil"
          onChange={handleValueSelectionBrush}
          className={css.brush}
        >
          <option value={ShapesBrush.square} className={css.optionBrush}>
            {ShapesBrush.square}
          </option>
          <option value={ShapesBrush.rectangle} className={css.optionBrush}>
            {ShapesBrush.rectangle}
          </option>
          <option value={ShapesBrush.line} className={css.optionBrush}>
            {ShapesBrush.line}
          </option>
        </select>
      </label>
      <label htmlFor="pencilSize" className={css.brushSize}>
        {selectedBrush !== ShapesBrush.rectangle ? 'tamaño:' : 'Ancho:'}
        <input
          type="number"
          name="valueBrushSize"
          id="valueBrushSize"
          onChange={handleValueBrushSize}
          defaultValue={valueBrushSize.h}
          max={LIMITSIZE.max}
          min={LIMITSIZE.min}
          className={css.brushSizeValue}
        />
      </label>

      {selectedBrush === ShapesBrush.rectangle && (
        <label htmlFor="pencilSize" className={css.brushSize}>
          Alto:
          <input
            type="number"
            name="secondPencilSize"
            id="secondPencilSize"
            onChange={handleValueBrushSize}
            defaultValue={valueBrushSize.h}
            max={LIMITSIZE.max}
            min={LIMITSIZE.min}
            className={css.brushSizeValue}
          />
        </label>
      )}
    </div>
  )
}
