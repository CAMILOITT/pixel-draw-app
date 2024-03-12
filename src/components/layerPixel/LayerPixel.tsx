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
  const { infoCanvas, setContextCanvasDrawing } = useContext(InfoCanvasContext)
  const [dimensionsCanvas, setDimensionsCanvas] = useState({
    w: infoCanvas.w,
    h: infoCanvas.h,
  })
  const { events: keyboardEvents, setCtx: setCtxKeyboard } = useKeyboardEvents()
  const {
    drawing,
    endDrawing,
    startDrawing,
    setCtx: setCtxEvents,
    setCtxMouse: setCtxMouseEvents,
    useTools,
    setSizeRelative,
  } = useDrawingMouse({ sizeCanvas: infoCanvas })

  const [ctx, setCtx] = useState<RenderingContext>()

  useEffect(() => {
    if (!LayerMouse.current) return
    LayerMouse.current.width = infoCanvas.w
    LayerMouse.current.height = infoCanvas.h
    LayerMouse.current.style.translate = `${translate.x}% ${translate.y}%`
    const ctx = LayerMouse.current.getContext('2d')
    if (!ctx) return
    setCtxMouseEvents(ctx)
    fillBackgroundCanvas({ ctx, ...infoCanvas })
  }, [infoCanvas, setCtxMouseEvents])

  useEffect(() => {
    if (!LayerDrawing.current) return
    LayerDrawing.current.width = infoCanvas.w
    LayerDrawing.current.height = infoCanvas.h
    LayerDrawing.current.style.translate = `${translate.x}% ${translate.y}%`
    const ctx = LayerDrawing.current.getContext('2d', {
      willReadFrequently: true,
    })
    if (!ctx) return
    setCtx(ctx)
    setCtxEvents(ctx)
    setCtxKeyboard(ctx)
    setContextCanvasDrawing({ ctx })
    fillBackgroundCanvas({ ctx, ...infoCanvas })
    setDimensionsCanvas({ w: infoCanvas.w, h: infoCanvas.h })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCanvas])

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
    startDrawing({ clientX, clientY, left, top })
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
    })
  }

  function handleTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
    if (e.targetTouches.length >= 2) return
    const { clientX, clientY } = e.targetTouches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()
    startDrawing({ clientX, clientY, left, top })
  }

  function handleTouch(e: React.TouchEvent<HTMLCanvasElement>) {
    const touches = e.targetTouches
    if (touches.length >= 2) return
    const { clientX, clientY } = touches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()
    drawing({ clientX, clientY, left, top })
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
        if (
          dimensionsCanvas.h <= maxSizeCanvas ||
          dimensionsCanvas.w <= maxSizeCanvas
        ) {
          setDimensionsCanvas(oldValue => ({
            w: oldValue.w + changeSize,
            h: oldValue.h + changeSize,
          }))
          setSizeRelative(dimensionsCanvas)
          return
        }
      }

      if (
        dimensionsCanvas.w >= minSizeCanvas ||
        dimensionsCanvas.h >= minSizeCanvas
      ) {
        setDimensionsCanvas(oldValue => ({
          w: oldValue.w - changeSize,
          h: oldValue.h - changeSize,
        }))
        setSizeRelative(dimensionsCanvas)
        return
      }
    }

    if (ctrlKey) {
      let moveIncrement = 2
      if (shiftKey) moveIncrement = 5
      if (deltaY < 0 && maxTranslate / 2 > translate.x)
        translate.x += moveIncrement
      if (deltaY > 0 && -maxTranslate < translate.x)
        translate.x -= moveIncrement
      return
    } else {
      let moveIncrement = 2
      if (shiftKey) moveIncrement = 5
      if (deltaY > 0 && maxTranslate / 2 > translate.y)
        translate.y += moveIncrement
      if (deltaY < 0 && -maxTranslate < translate.y)
        translate.y -= moveIncrement
      return
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
