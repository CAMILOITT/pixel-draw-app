import { useContext, useState } from 'react'
import { BrushContext } from '../../../../context/state/pencil/Pencil'
import '../style/styleTemplates.css'

interface EraserProps {}

export default function Eraser({}: EraserProps) {
  const { brushSize, setBrushSize } = useContext(BrushContext)

  const [valueBrushSize, setValueBrushSize] = useState(brushSize)

  function handleValueBrushSize(e: React.ChangeEvent<HTMLInputElement>) {
    setValueBrushSize({
      w: parseInt(e.target.value),
      h: parseInt(e.target.value),
    })
    setBrushSize({ w: parseInt(e.target.value), h: parseInt(e.target.value) })
  }

  function handleValueInvalid(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) > 0) return
    e.target.value = '1'
    const value = '1'

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
        <input
          type="number"
          name="valueBrushSize"
          id="valueBrushSize"
          onChange={handleValueBrushSize}
          onBlur={handleValueInvalid}
          value={valueBrushSize.w}
          defaultValue={valueBrushSize.w}
          max={200}
          min={1}
          className="inputSize"
        />
      </label>
    </div>
  )
}
