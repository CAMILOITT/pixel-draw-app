import { useContext, useEffect, useRef, useState } from 'react'
import BrushIcon from '../../assets/icons/BrushIcon'
import EraserIcon from '../../assets/icons/EraserIcon'
import EyeDropperIcon from '../../assets/icons/EyeDropperIcon'
import { ColorContext } from '../../context/state/color/Color'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Tools } from '../../types/tools/enums'
import css from './BarTools.module.css'
import { StatusTransitionColor } from '../../types/color/type'
import RedoIcon from '../../assets/icons/RedoIcon'
import UndoIcon from '../../assets/icons/UndoIcon'
import DownloadIcon from '../../assets/icons/DownloadIcon'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import ConfigurationIcon from '../../assets/icons/ConfigurationIcon'
import { redo, undo } from '../../api/canvas/tools'
import { createPortal } from 'react-dom'
import Modal, { ModalRef } from '../modal/Modal'
import ConfigurationCanvas from '../configurationCanvas/ConfigurationCanvas'
import ConfigDownload from '../configDownload/ConfigDownload'

interface BarToolsProps {}

export default function BarTools({}: BarToolsProps) {
  const { setColorFocus, colors } = useContext(ColorContext)

  const { contextCanvasDrawing } = useContext(InfoCanvasContext)

  const [closeMenu, setCloseMenu] = useState(true)

  const [statusColorPrimary, setStatusColorPrimary] =
    useState<StatusTransitionColor>('colorActive')

  const [statusColorSecondary, setStatusColorSecondary] =
    useState<StatusTransitionColor>('colorDesactive')

  const { setToolSelect } = useContext(SelectorToolsContext)

  const ModalConfigurationCanvas = useRef<ModalRef | null>(null)
  const ModalDownload = useRef<ModalRef | null>(null)

  useEffect(() => {
    let idTimeOut: number
    const timeOut = 250
    setStatusColorPrimary('colorChangePrimary')
    setStatusColorSecondary('colorChangeSecondary')
    if (colors.colorFocus === 'colorPrimary') {
      idTimeOut = setTimeout(() => {
        setStatusColorPrimary('colorActive')
        setStatusColorSecondary('colorDesactive')
      }, timeOut)
    }
    if (colors.colorFocus === 'colorSecondary') {
      idTimeOut = setTimeout(() => {
        setStatusColorPrimary('colorDesactive')
        setStatusColorSecondary('colorActive')
      }, timeOut)
    }
    return () => {
      clearTimeout(idTimeOut)
    }
  }, [colors.colorFocus])

  function handleSelectTools(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const { value } = e.currentTarget
    setToolSelect(Tools[value as keyof typeof Tools])
  }

  function handleCloseMenu() {
    return () => setCloseMenu(before => !before)
  }

  function handleSelectColor(e: React.MouseEvent<HTMLDivElement>) {
    const { color, colorSelect } = e.currentTarget.dataset
    if (colors.colorFocus === colorSelect) return
    if (colorSelect === 'colorPrimary' || colorSelect === 'colorSecondary')
      setColorFocus(colorSelect)
    if (!color) return
  }

  function openMenuDownload() {
    ModalDownload.current?.open()
  }

  function openMenuCanvas() {
    ModalConfigurationCanvas.current?.open()
  }

  function handleRedo() {
    if (!contextCanvasDrawing) return
    redo(contextCanvasDrawing)
  }

  function handleUndo() {
    if (!contextCanvasDrawing) return
    undo(contextCanvasDrawing)
  }

  return (
    <menu
      className={`${css.menu} ${closeMenu ? css.menuOpen : css.menuClose}  `}
    >
      <button className={`${css.closeMenu} `} onClick={handleCloseMenu()}>
        tools
      </button>
      <li className={css.tools}>
        <button
          value={Tools.brush}
          onClick={handleUndo}
          data-title="under (ctrl + Mays + z)"
        >
          <UndoIcon />
        </button>
      </li>
      <li className={css.tools}>
        <button
          value={Tools.brush}
          onClick={handleRedo}
          data-title="rendo (ctrl + z)"
        >
          <RedoIcon />
        </button>
      </li>

      <li className={css.tools}>
        <button
          value={Tools.brush}
          onClick={handleSelectTools}
          data-title="brush (b)"
        >
          <BrushIcon />
        </button>
      </li>
      <li className={css.tools}>
        <button
          value={Tools.eraser}
          onClick={handleSelectTools}
          data-title="eraser (e)"
        >
          <EraserIcon />
        </button>
      </li>
      <li className={css.tools}>
        <button
          value={Tools.eyeDropper}
          onClick={handleSelectTools}
          data-title="eye dropper (d)"
        >
          <EyeDropperIcon />
        </button>
      </li>
      <li className={css.tools}>
        <button
          value={Tools.eyeDropper}
          onClick={openMenuCanvas}
          data-title="configuration of canvas"
        >
          <ConfigurationIcon />
        </button>
      </li>
      <li className={`${css.tools} ${css.toolsColors} `}>
        <div
          data-color={colors.colorPrimary.color}
          data-color-select="colorPrimary"
          style={{ background: colors.colorPrimary.color }}
          onClick={handleSelectColor}
          className={`${css.colorPrimary} ${css[statusColorPrimary]} `}
        ></div>
        <div
          data-color={colors.colorSecondary.color}
          data-color-select="colorSecondary"
          style={{ background: colors.colorSecondary.color }}
          onClick={handleSelectColor}
          className={` ${css.colorSecondary} ${css[statusColorSecondary]} `}
        ></div>
      </li>
      <li className={`${css.tools} ${css.download}`}>
        <button
          value={Tools.brush}
          onClick={openMenuDownload}
          data-title="Download (ctrl + s)"
        >
          <DownloadIcon />
        </button>
      </li>
      {createPortal(
        <Modal ref={ModalConfigurationCanvas}>
          <ConfigurationCanvas />
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
