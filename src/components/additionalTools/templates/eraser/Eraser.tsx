import { useContext, useState } from 'react'
import { BrushContext } from '../../../../context/state/pencil/Pencil'
import '../style/styleTemplates.css'

interface EraserProps {}

export default function Eraser({}: EraserProps) {
  const { brushSize, setBrushSize } = useContext(BrushContext)

  const [valueBrushSize, setValueBrushSize] = useState(brushSize)

  function handleValueBrushSize(e: React.ChangeEvent<HTMLInputElement>) {
    setValueBrushSize(parseInt(e.target.value))
    setBrushSize(parseInt(e.target.value))
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
          value={valueBrushSize}
          defaultValue={valueBrushSize}
          max={200}
          min={0}
          className="inputSize"
        />
      </label>
    </div>
  )
}
