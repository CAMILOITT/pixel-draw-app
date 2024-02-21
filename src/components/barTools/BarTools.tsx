import Button from '@ui/button/Button'
import { useContext, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { coords } from '../../api/canvas/coord'
import { reDrawing } from '../../api/canvas/drawing'
import BrushIcon from '../../assets/icons/BrushIcon'
import BucketIcon from '../../assets/icons/BucketIcon'
import ConfigurationIcon from '../../assets/icons/ConfigurationIcon'
import DownloadIcon from '../../assets/icons/DownloadIcon'
import EraserIcon from '../../assets/icons/EraserIcon'
import EyeDropperIcon from '../../assets/icons/EyeDropperIcon'
import RedoIcon from '../../assets/icons/RedoIcon'
import UndoIcon from '../../assets/icons/UndoIcon'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Tools } from '../../types/tools/enums'
import ColorsSelected from '../../ui/colorsSelected/ColorsSelected'
import ConfigDownload from '../configDownload/ConfigDownload'
import ConfigurationCanvas from '../configurationCanvas/ConfigurationCanvas'
import Modal, { ModalRef } from '../modal/Modal'
import css from './BarTools.module.css'

interface BarToolsProps {}

const listTools = [
  {
    value: Tools.brush,
    icon: <BrushIcon />,
    name: 'Brush',
    dataTitle: 'brush (b)',
    role: 'buttonBrush',
  },
  {
    value: Tools.eraser,
    icon: <EraserIcon />,
    name: 'Eraser',
    dataTitle: 'eraser (e)',
    role: 'buttonEraser',
  },
  {
    value: Tools.eyeDropper,
    icon: <EyeDropperIcon />,
    name: 'Eye Dropper',
    dataTitle: 'eye dropper (d)',
    role: 'buttonEyeDropper',
  },
  {
    value: Tools.fillBucket,
    icon: <BucketIcon />,
    name: 'Fill Bucket',
    dataTitle: 'fill bucket (f)',
    role: 'buttonFillBucket',
  },
]

export default function BarTools({}: BarToolsProps) {
  const { contextCanvasDrawing } = useContext(InfoCanvasContext)

  const [closeMenu, setCloseMenu] = useState(true)

  const { setToolSelect, toolSelect } = useContext(SelectorToolsContext)

  const ModalConfigurationCanvas = useRef<ModalRef | null>(null)
  const ModalDownload = useRef<ModalRef | null>(null)

  function handleSelectTools(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const { value } = e.currentTarget
    setToolSelect(Tools[value as keyof typeof Tools])
  }

  function handleCloseMenu() {
    setCloseMenu(before => !before)
  }

  function openMenuDownload() {
    ModalDownload.current?.open()
  }

  function openMenuCanvas() {
    ModalConfigurationCanvas.current?.open()
  }

  function handleRedo() {
    if (!contextCanvasDrawing) return
    coords.redo()
    reDrawing({ ctx: contextCanvasDrawing.ctx })
  }

  function handleUndo() {
    if (!contextCanvasDrawing) return
    coords.undo()
    reDrawing({ ctx: contextCanvasDrawing.ctx })
  }

  return (
    <div
      className={`${css.menu} ${closeMenu ? css.menuOpen : css.menuClose}  `}
      role="menuTools"
    >
      <Button
        className={`${css.closeMenu} `}
        onClick={handleCloseMenu}
        children="herramientas"
        role="closeMenu"
      />
      <li className={`${css.tools}`}>
        <Button
          children={<UndoIcon />}
          onClick={handleRedo} role= "buttonRedo"
          data-title="redo (ctrl + ↑ shit + z)"
        />
      </li>
      <li className={css.tools}>
        <Button
          children={<RedoIcon />}
          onClick={handleUndo} role= "buttonUndo"
          data-title="undo (ctrl + z)"
        />
      </li>
      {listTools.map(({ icon, name, dataTitle, value, role }) => (
        <li className={`${css.tools}`} key={name}>
          <Button
            children={icon}
            onClick={handleSelectTools}
            value={value}
            data-title={dataTitle}
            role={role}
            className={toolSelect === value ? css.InUse : ''}
          />
        </li>
      ))}
      <li className={`${css.tools}`}>
        <Button
          onClick={openMenuCanvas}
          children={<ConfigurationIcon />}
          data-title="configuration of canvas"
          role="openConfigCanvas"
        />
      </li>
      <li className={`${css.tools} ${css.toolsColors} `}>
        <ColorsSelected />
      </li>
      <li className={`${css.tools} ${css.download}`}>
        <Button
          onClick={openMenuDownload}
          data-title="Download (ctrl + s)"
          children={<DownloadIcon />}
          role="openConfigDownload"
        />
      </li>
      {createPortal(
        <Modal ref={ModalConfigurationCanvas} role="configCanvas">
          <ConfigurationCanvas
            closeConfigurationCanvas={ModalConfigurationCanvas.current?.close}
          />
        </Modal>,
        (document.querySelector('#root') as HTMLDivElement) || document.body
      )}
      {createPortal(
        <Modal ref={ModalDownload} role="configDownload">
          <ConfigDownload />
        </Modal>,
        (document.querySelector('#root') as HTMLDivElement) || document.body
      )}
    </div>
  )
}
