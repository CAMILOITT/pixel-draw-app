import { useContext, useState } from 'react'
import { coords } from '../api/canvas/coord'
import { reDrawing } from '../api/canvas/drawing'
import { ColorContext } from '../context/state/color/Color'
import { SelectorToolsContext } from '../context/state/selectorTools/SelectorTools'
import { Tools } from '../types/tools/enums'

export function useKeyboardEvents() {
  const { colors, setColorFocus } = useContext(ColorContext)
  const { setToolSelect } = useContext(SelectorToolsContext)

  const [ctx, setCtx] = useState<null | CanvasRenderingContext2D>(null)

  function events(e: KeyboardEvent) {
    if ((e.target as HTMLElement).localName !== 'input') e.preventDefault()
    const { key, ctrlKey, shiftKey } = e
    if (key === 'x') {
      colors.colorFocus === 'colorPrimary'
        ? setColorFocus('colorSecondary')
        : setColorFocus('colorPrimary')
      return
    }
    if (key === 'b') {
      setToolSelect(Tools.brush)
      return
    }
    if (key === 'e') {
      setToolSelect(Tools.eraser)
      return
    }
    if (key === 'd') {
      setToolSelect(Tools.eyeDropper)
      return
    }
    if (key === 'f') {
      setToolSelect(Tools.fillBucket)
      return
    }
    if (key === 'z' && ctrlKey) {
      if (!ctx) return
      coords.undo()
      reDrawing({ ctx })
      return
    }

    if (shiftKey && ctrlKey && key === 'Z') {
      if (!ctx) return
      coords.redo()
      reDrawing({ ctx })
      return
    }
  }

  return {
    events,
    setCtx,
  }
}
