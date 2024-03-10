import React, { useContext, useEffect, useRef, useState } from 'react'
import { fillBackgroundCanvas } from '../../api/canvas/drawing'
import {
  changeSizeCanvas,
  maxSizeCanvas,
  maxTranslate,
  minSizeCanvas,
} from '../../const/infoCanvas'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { useDrawingMouse } from '../../hooks/drawing/useDrawingMouse'
import { useKeyboardEvents } from '../../hooks/useKeyboardEvents'
import css from './LayerPixel.module.css'

let prevPosition = { x: 0, y: 0 }
const translate = { x: -50, y: -50 }

interface LayerPixelProps {}

export default function LayerPixel({}: LayerPixelProps) {
  const LayerDrawing = useRef<HTMLCanvasElement | null>(null)
  const LayerMouse = useRef<HTMLCanvasElement | null>(null)

  const [sizeCanvas] = useState({ w: 500, h: 500 })
  const [dimensionsCanvas, setDimensionsCanvas] = useState(sizeCanvas)
  const { infoCanvas, setContextCanvasDrawing } = useContext(InfoCanvasContext)
  const { events: keyboardEvents, setCtx: setCtxKeyboard } = useKeyboardEvents()
  const {
    drawing,
    endDrawing,
    startDrawing,
    setCtx: setCtxEvents,
    setCtxMouse: setCtxMouseEvents,
    useTools,
  } = useDrawingMouse({ sizeCanvas })

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>()

  useEffect(() => {
    if (!LayerMouse.current) return
    LayerMouse.current.width = sizeCanvas.w
    LayerMouse.current.height = sizeCanvas.h
    LayerMouse.current.style.translate = `${translate.x}% ${translate.y}%`
    const ctx = LayerMouse.current.getContext('2d')
    if (!ctx) return
    setCtxMouseEvents(ctx)
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
  }, [infoCanvas, setCtxMouseEvents, sizeCanvas])

  useEffect(() => {
    if (!LayerDrawing.current) return
    LayerDrawing.current.width = sizeCanvas.w
    LayerDrawing.current.height = sizeCanvas.h
    LayerDrawing.current.style.translate = `${translate.x}% ${translate.y}%`
    const ctx = LayerDrawing.current.getContext('2d')
    if (!ctx) return
    setCtx(ctx)
    setCtxEvents(ctx)
    setCtxKeyboard(ctx)
    setContextCanvasDrawing({ ctx })
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCanvas, sizeCanvas])

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      if (e.ctrlKey) e.preventDefault()
    }
    document.addEventListener('keydown', keyboardEvents)
    document.addEventListener('wheel', handleWheel, {
      passive: false,
    })
    return () => {
      document.removeEventListener('keydown', keyboardEvents)
      document.removeEventListener('wheel', handleWheel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardEvents])

  function handleStartDrawing(e: React.MouseEvent) {
    const { clientX, clientY } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()
    startDrawing({ clientX, clientY, left, top, size: dimensionsCanvas.h })
  }

  function handleDrawing(e: React.MouseEvent) {
    const { clientX, clientY, movementX, movementY, type } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()
    drawing({
      clientX,
      clientY,
      left,
      top,
      movementX,
      movementY,
      type,
      size: dimensionsCanvas.h,
    })
  }

  function handleTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
    if (e.targetTouches.length >= 2) return
    const { clientX, clientY } = e.targetTouches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()
    startDrawing({ clientX, clientY, left, top, size: dimensionsCanvas.h })
  }

  function handleTouch(e: React.TouchEvent<HTMLCanvasElement>) {
    const touches = e.targetTouches
    if (touches.length >= 2) return
    const { clientX, clientY } = touches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()
    drawing({ clientX, clientY, left, top, size: dimensionsCanvas.h })
  }

  function wheel(e: React.WheelEvent<HTMLDivElement>) {
    const { deltaY, ctrlKey, shiftKey, altKey } = e
    if (!LayerDrawing.current || !LayerMouse.current) return
    LayerDrawing.current.style.translate = `${translate.x}% ${translate.y}%`
    LayerMouse.current.style.translate = `${translate.x}% ${translate.y}%`

    if (!ctx) return

    if (altKey) {
      let changeSize = changeSizeCanvas
      if (shiftKey) changeSize = changeSizeCanvas + 10
      if (deltaY > 0) {
        setDimensionsCanvas(oldValue => ({
          w:
            dimensionsCanvas.h <= maxSizeCanvas
              ? oldValue.w + changeSize
              : oldValue.w,
          h:
            dimensionsCanvas.w <= maxSizeCanvas
              ? oldValue.h + changeSize
              : oldValue.w,
        }))
        return
      }
      setDimensionsCanvas(oldValue => ({
        w:
          dimensionsCanvas.w >= minSizeCanvas
            ? oldValue.w - changeSize
            : oldValue.w,
        h:
          dimensionsCanvas.h >= minSizeCanvas
            ? oldValue.h - changeSize
            : oldValue.h,
      }))
      return
    }

    if (ctrlKey) {
      if (shiftKey) {
        deltaY < 0 && maxTranslate / 2 > translate.x && (translate.x += 5)
        deltaY > 0 && -maxTranslate < translate.x && (translate.x -= 5)
        return
      }

      deltaY < 0 && maxTranslate / 2 > translate.x && translate.x++
      deltaY > 0 && -maxTranslate < translate.x && translate.x--
      return
    } else {
      if (shiftKey) {
        deltaY > 0 && maxTranslate / 2 > translate.y && (translate.y += 5)
        deltaY < 0 && -maxTranslate < translate.y && (translate.y -= 5)
        return
      }

      deltaY > 0 && maxTranslate / 2 > translate.y && translate.y++
      deltaY < 0 && -maxTranslate < translate.y && translate.y--
    }
  }

  function handleRemoveScrollTouch(e: React.TouchEvent<HTMLDivElement>) {
    if (e.targetTouches.length <= 1) return

    const { clientX, clientY } = e.targetTouches[0]

    const movementX = prevPosition.x < clientX ? 1 : -1
    const movementY = prevPosition.y < clientY ? 1 : -1

    if (!LayerDrawing.current || !LayerMouse.current) return

    if (clientX !== prevPosition.x) {
      movementX > 0 && maxTranslate / 2 > translate.x && translate.x++
      movementX < 0 && -maxTranslate < translate.x && translate.x--
    }
    if (clientY !== prevPosition.y) {
      movementY > 0 && maxTranslate / 2 > translate.y && translate.y++
      movementY < 0 && -maxTranslate < translate.y && translate.y--
    }

    LayerDrawing.current.style.translate = `${translate.x}% ${translate.y}%`
    LayerMouse.current.style.translate = `${translate.x}% ${translate.y}%`

    prevPosition = { x: clientX, y: clientY }
  }

  function cleanCanvasMouse() {
    endDrawing()
  }

  return (
    <div
      className={css.sizeLayer}
      onWheel={wheel}
      onTouchMove={handleRemoveScrollTouch}
    >
      <div>
        <canvas
          ref={LayerDrawing}
          className={css.canvasPixel}
          role="layerDrawing"
          style={{ width: dimensionsCanvas.w, height: dimensionsCanvas.h }}
        >
          parece que tu navegador no soporta la api de canvas por favor
          considera actualizar el navegador a la version mas reciente o utilizar
          otro navegador como Opera, Firefox, Chrome, etc
        </canvas>
        <canvas
          style={{ width: dimensionsCanvas.w, height: dimensionsCanvas.h }}
          role="layerMouse"
          ref={LayerMouse}
          className={css.canvasPixel}
          onClick={useTools}
          onMouseMove={handleDrawing}
          onMouseDown={handleStartDrawing}
          onMouseUp={endDrawing}
          onMouseLeave={cleanCanvasMouse}
          onTouchMove={handleTouch}
          onTouchStart={handleTouchStart}
          onTouchEnd={endDrawing}
          tabIndex={0}
        ></canvas>
      </div>
    </div>
  )
}
