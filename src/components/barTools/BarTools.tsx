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
import ConfigDownload from '../configDownload/ConfigDownload'
import ConfigurationCanvas from '../configurationCanvas/ConfigurationCanvas'
import Modal, { ModalRef } from '../modal/Modal'
import css from './BarTools.module.css'
import ColorsSelected from './colorsSelected/ColorsSelected'

interface BarToolsProps {}

const listTools = [
  {
    value: Tools.brush,
    icon: <BrushIcon />,
    name: 'Brush',
    dataTitle: 'brush (b)',
  },
  {
    value: Tools.eraser,
    icon: <EraserIcon />,
    name: 'Eraser',
    dataTitle: 'eraser (e)',
  },
  {
    value: Tools.eyeDropper,
    icon: <EyeDropperIcon />,
    name: 'Eye Dropper',
    dataTitle: 'eye dropper (d)',
  },
  {
    value: Tools.fillBucket,
    icon: <BucketIcon />,
    name: 'Fill Bucket',
    dataTitle: 'fill bucket (f)',
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
    return () => setCloseMenu(before => !before)
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
    <menu
      className={`${css.menu} ${closeMenu ? css.menuOpen : css.menuClose}  `}
    >
      <button className={`${css.closeMenu} `} onClick={handleCloseMenu()}>
        tools
      </button>
      <li className={`${css.tools}`}>
        <button onClick={handleRedo} data-title="under (ctrl + Mays + z)">
          <UndoIcon />
        </button>
      </li>
      <li className={css.tools}>
        <button onClick={handleUndo} data-title="rendo (ctrl + z)">
          <RedoIcon />
        </button>
      </li>
      {listTools.map(({ icon, name, dataTitle, value }) => (
        <li
          className={`${css.tools} ${toolSelect === value ? css.InUse : ''}`}
          key={name}
        >
          <button
            value={value}
            onClick={handleSelectTools}
            data-title={dataTitle}
          >
            {icon}
          </button>
        </li>
      ))}
      <li className={`${css.tools}`}>
        <button onClick={openMenuCanvas} data-title="configuration of canvas">
          <ConfigurationIcon />
        </button>
      </li>
      <li className={`${css.tools} ${css.toolsColors} `}>
        <ColorsSelected />
      </li>
      <li className={`${css.tools} ${css.download}`}>
        <button onClick={openMenuDownload} data-title="Download (ctrl + s)">
          <DownloadIcon />
        </button>
      </li>
      {createPortal(
        <Modal ref={ModalConfigurationCanvas}>
          <ConfigurationCanvas
            closeCanvas={ModalConfigurationCanvas.current?.close}
          />
        </Modal>,
        document.body
      )}
      {createPortal(
        <Modal ref={ModalDownload}>
          <ConfigDownload />
        </Modal>,
        document.body
      )}
    </menu>
  )
}
