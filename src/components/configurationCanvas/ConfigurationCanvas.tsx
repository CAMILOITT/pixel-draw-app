import { useContext, useState } from 'react'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import css from './ConfigurationCanvas.module.css'

interface ConfigurationCanvasProps {
  closeCanvas?: () => void
}

export default function ConfigurationCanvas({
  closeCanvas,
}: ConfigurationCanvasProps) {
  const { setInfoCanvas, setSizePixel } = useContext(InfoCanvasContext)

  const [addBackground, setAddBackground] = useState(false)

  function actInfoCanvas(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { canvasWidth, canvasHeight, squareWidth, squareHeight } =
      e.currentTarget

    let bg = null

    if (e.currentTarget.canvasBackground) {
      bg = e.currentTarget.canvasBackground.value
    }

    const valueInfoCanvas = {
      w: parseInt(canvasWidth.value),
      h: parseInt(canvasHeight.value),
      bg,
    }

    const valueSizePixel = {
      w: parseInt(squareWidth.value),
      h: parseInt(squareHeight.value),
    }

    setInfoCanvas(valueInfoCanvas)
    setSizePixel(valueSizePixel)
    // close Canvas
    closeCanvas && closeCanvas()
  }

  return (
    <form onSubmit={actInfoCanvas} className={css.setting}>
      <h2 className={css.titleSetting}>Configuración del canvas</h2>
      <h3 className={css.subtitleSetting}>Tamaño del canvas</h3>
      <label htmlFor="canvas-width" className={css.nameSetting}>
        Ancho:
        <input
          type="number"
          name="canvasWidth"
          id="canvas-width"
          min={0}
          max={500}
          defaultValue={500}
          className={css.valueSetting}
        />
      </label>
      <label htmlFor="canvas-height" className={css.nameSetting}>
        Alto:
        <input
          type="number"
          name="canvasHeight"
          id="canvas-height"
          min={0}
          max={500}
          defaultValue={500}
          className={css.valueSetting}
        />
      </label>
      <h3>Tamaño de los pixeles</h3>
      <label htmlFor="square-width" className={css.nameSetting}>
        Ancho:
        <input
          type="number"
          name="squareWidth"
          id="square-width"
          min={0}
          max={50}
          defaultValue={10}
          className={css.valueSetting}
        />
      </label>
      <label htmlFor="square-height" className={css.nameSetting}>
        Alto:
        <input
          type="number"
          name="squareHeight"
          id="square-height"
          min={0}
          max={50}
          defaultValue={10}
          className={css.valueSetting}
        />
      </label>
      <h3>Color de fondo</h3>
      <label
        htmlFor="add-background"
        onChange={() => setAddBackground(before => !before)}
        className={css.nameSetting}
      >
        <input
          type="checkbox"
          name="addBackground"
          id="add-background"
          className={`${css.valueSetting} ${css.addBackground}`}
        />
        Agregar color de fondo al canvas
      </label>
      {addBackground && (
        <label htmlFor="canvas-background" className={css.nameSetting}>
          Color:
          <input
            type="color"
            name="canvasBackground"
            id="canvas-background"
            className={`${css.valueSetting} ${css.valueSettingColor}`}
          />
        </label>
      )}

      <button type="submit" className={css.btnCreateCanvas}>
        crear
      </button>
    </form>
  )
}
