import { useContext } from 'react'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Tools } from '../../types/tools/enums'
import css from './AdditionalTools.module.css'
import Brush from './templates/brush/Brush'
import Eraser from './templates/eraser/Eraser'
import WebIcon from '../../assets/icons/WebIcon'

interface AdditionalToolsProps {}

const toolConfigurations = {
  [Tools.brush]: <Brush />,
  [Tools.eraser]: <Eraser />,
  [Tools.eyeDropper]: null,
  [Tools.fillBucket]: null,
}

export default function AdditionalTools({}: AdditionalToolsProps) {
  const { toolSelect } = useContext(SelectorToolsContext)
  return (
    <nav className={css.additionalTools}>
      <div className={css.nameWeb} >
        <WebIcon />
        <h2>PixelDraw</h2>
      </div>
      {toolConfigurations[toolSelect]}
    </nav>
  )
}
