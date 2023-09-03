import { useContext } from 'react'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Tools } from '../../types/tools/enums'
import css from './AdditionalTools.module.css'
import Brush from './templates/brush/Brush'
import Eraser from './templates/eraser/Eraser'

interface AdditionalToolsProps {}

const toolConfigurations = {
  [Tools.brush]: (
    <menu className={css.additionalTools}>
      <h2>PixelDraw</h2>
      <Brush />
    </menu>
  ),
  [Tools.eraser]: (
    <menu className={css.additionalTools}>
      <Eraser />
    </menu>
  ),
  [Tools.eyeDropper]: <menu className={css.additionalTools}> dropper</menu>,
}

export default function AdditionalTools({}: AdditionalToolsProps) {
  const { toolSelect } = useContext(SelectorToolsContext)

  return toolConfigurations[toolSelect]
}
