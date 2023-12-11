import { useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// import { redo, undo } from '../../api/canvas/tools'
import BrushIcon from '../../assets/icons/BrushIcon'
import ConfigurationIcon from '../../assets/icons/ConfigurationIcon'
import DownloadIcon from '../../assets/icons/DownloadIcon'
import EraserIcon from '../../assets/icons/EraserIcon'
import EyeDropperIcon from '../../assets/icons/EyeDropperIcon'
import RedoIcon from '../../assets/icons/RedoIcon'
import UndoIcon from '../../assets/icons/UndoIcon'
import { ColorContext } from '../../context/state/color/Color'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { StatusTransitionColor } from '../../types/color/type'
import { Tools } from '../../types/tools/enums'
import ConfigDownload from '../configDownload/ConfigDownload'
import ConfigurationCanvas from '../configurationCanvas/ConfigurationCanvas'
import Modal, { ModalRef } from '../modal/Modal'
import css from './BarTools.module.css'
import { coords } from '../../api/canvas/coord'
import { reDrawing } from '../../api/canvas/drawing'

interface BarToolsProps {}

export default function BarTools({}: BarToolsProps) {
  const { setColorFocus, colors } = useContext(ColorContext)

  const { contextCanvasDrawing } = useContext(InfoCanvasContext)

  const [closeMenu, setCloseMenu] = useState(true)

  const [statusColorPrimary, setStatusColorPrimary] =
    useState<StatusTransitionColor>('colorActive')

  const [statusColorSecondary, setStatusColorSecondary] =
    useState<StatusTransitionColor>('colorDesactive')

  const { setToolSelect, toolSelect } = useContext(SelectorToolsContext)

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
    coords.redo()
    reDrawing({ ctx: contextCanvasDrawing.ctx })

    // redo(contextCanvasDrawing)
  }

  function handleUndo() {
    if (!contextCanvasDrawing) return
    coords.undo()
    reDrawing({ ctx: contextCanvasDrawing.ctx })

    // undo(contextCanvasDrawing)
  }

  return (
    <menu
      className={`${css.menu} ${closeMenu ? css.menuOpen : css.menuClose}  `}
    >
      <button className={`${css.closeMenu} `} onClick={handleCloseMenu()}>
        tools
      </button>
      <li className={`${css.tools}`}>
        <button
          value={Tools.brush}
          onClick={handleRedo}
          data-title="under (ctrl + Mays + z)"
        >
          <UndoIcon />
        </button>
      </li>
      <li className={css.tools}>
        <button
          value={Tools.brush}
          onClick={handleUndo}
          data-title="rendo (ctrl + z)"
        >
          <RedoIcon />
        </button>
      </li>

      <li
        className={`${css.tools} ${
          Tools.brush === toolSelect ? css.InUse : ''
        }`}
      >
        <button
          value={Tools.brush}
          onClick={handleSelectTools}
          data-title="brush (b)"
        >
          <BrushIcon />
        </button>
      </li>
      <li
        className={`${css.tools} ${
          Tools.eraser === toolSelect ? css.InUse : ''
        }`}
      >
        <button
          value={Tools.eraser}
          onClick={handleSelectTools}
          data-title="eraser (e)"
        >
          <EraserIcon />
        </button>
      </li>
      <li
        className={`${css.tools} ${
          Tools.eyeDropper === toolSelect ? css.InUse : ''
        }`}
      >
        <button
          value={Tools.eyeDropper}
          onClick={handleSelectTools}
          data-title="eye dropper (d)"
        >
          <EyeDropperIcon />
        </button>
      </li>
      <li className={`${css.tools}`}>
        <button onClick={openMenuCanvas} data-title="configuration of canvas">
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
