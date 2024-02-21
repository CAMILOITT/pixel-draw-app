import { useContext, useState } from 'react'
import { BrushContext } from '../../../../context/state/pencil/Pencil'
import '../style/styleTemplates.css'
import InputNumber from '@ui/inputNumber/InputNumber'

interface EraserProps {}

export default function Eraser({}: EraserProps) {
  const { brushSize, setBrushSize } = useContext(BrushContext)
  const [valueBrushSize, setValueBrushSize] = useState(brushSize)

  function handleValueBrushSize(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    if (!value) {
      e.target.value = '1'
      return
    }
    if (parseInt(value) > 30 || parseInt(value) < 1) return
    setValueBrushSize({
      w: parseInt(value),
      h: parseInt(value),
    })
    setBrushSize({ w: parseInt(value), h: parseInt(value) })
  }

  return (
    <div className="tool">
      <h3 className="nameTool">Borrador</h3>
      <label htmlFor="pencilSize" className="labelSize">
        Tamaño:
        <InputNumber
          name="valueBrushSize"
          id="valueEraserSize"
          onChange={handleValueBrushSize}
          value={valueBrushSize.w}
          defaultValue={valueBrushSize.w}
          max={30}
          min={1}
        />
      </label>
    </div>
  )
}
