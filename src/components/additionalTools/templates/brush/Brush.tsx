import InputNumber from '@ui/inputNumber/InputNumber'
import Select from '@ui/select/Select'
import React, { useContext, useState } from 'react'
import { LIMIT_SIZE } from '../../../../const/brush'
import { BrushContext } from '../../../../context/state/pencil/Pencil'
import { ShapesBrush } from '../../../../types/brush/enum'
import '../style/styleTemplates.css'
import css from './Brush.module.css'

interface BrushProps {}

export default function Brush({}: BrushProps) {
  const { brushSize, setBrushSize, selectedBrush, setSelectedBrush } =
    useContext(BrushContext)

  const [valueBrushSize, setValueBrushSize] = useState(brushSize)

  function handleValueBrushSize(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target
    if (!value) {
      e.target.value = '1'
      return
    }
    if (parseInt(value) > LIMIT_SIZE.max || parseInt(value) < LIMIT_SIZE.min)
      return

    let size: { w: number; h: number }

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
    if (!value) {
      e.target.value = '1'
      return
    }
    if (parseInt(value) > LIMIT_SIZE.max || parseInt(value) < LIMIT_SIZE.min)
      return
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
      <label htmlFor="typePencil" className={css.selectBrush}>
        pincel:
        <Select
          name="typePencil"
          id="typePencil"
          onChange={handleValueSelectionBrush}
          role="selectBrush"
        >
          <option value={ShapesBrush.square} className={css.optionBrush}>
            {ShapesBrush.square}
          </option>
          <option value={ShapesBrush.rectangle} className={css.optionBrush}>
            {ShapesBrush.rectangle}
          </option>
        </Select>
      </label>

      <label htmlFor="pencilSize" className={css.brushSize}>
        {selectedBrush !== ShapesBrush.rectangle ? 'tamaño:' : 'Ancho:'}
        <InputNumber
          name="valueBrushSize"
          id="valueBrushSize"
          onChange={handleValueBrushSize}
          defaultValue={valueBrushSize.w}
          value={valueBrushSize.w}
          max={LIMIT_SIZE.max}
          min={LIMIT_SIZE.min}
        />
      </label>

      {selectedBrush === ShapesBrush.rectangle && (
        <label htmlFor="pencilSize" className={css.brushSize}>
          Alto:
          <InputNumber
            name="secondPencilSize"
            id="secondPencilSize"
            onChange={handleValueBrushSize}
            defaultValue={valueBrushSize.h}
            value={valueBrushSize.h}
            max={LIMIT_SIZE.max}
            min={LIMIT_SIZE.min}
          />
        </label>
      )}
    </div>
  )
}
