import React, { useContext, useEffect, useRef, useState } from 'react'
import { fillBackgroundCanvas } from '../../api/canvas/drawing'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { useDrawingMouse } from '../../hooks/drawing/useDrawingMouse'
import { useKeyboardEvents } from '../../hooks/useKeyboardEvents'
import css from './LayerPixel.module.css'

interface LayerPixelProps {}

let prevPosition = { x: 0, y: 0 }
let translateX = -50
let translateY = -50
const maxTranslate = 100

export default function LayerPixel({}: LayerPixelProps) {
  const LayerDrawing = useRef<HTMLCanvasElement | null>(null)
  const LayerMouse = useRef<HTMLCanvasElement | null>(null)

  const [sizeCanvas] = useState({ w: 500, h: 500 })
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

  useEffect(() => {
    if (!LayerMouse.current) return
    LayerMouse.current.width = sizeCanvas.w
    LayerMouse.current.height = sizeCanvas.h
    LayerMouse.current.style.translate = `${translateX}% ${translateY}%`
    const ctx = LayerMouse.current.getContext('2d')
    if (!ctx) return
    setCtxMouseEvents(ctx)
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
  }, [infoCanvas, setCtxMouseEvents, sizeCanvas])

  useEffect(() => {
    if (!LayerDrawing.current) return
    LayerDrawing.current.width = sizeCanvas.w
    LayerDrawing.current.height = sizeCanvas.h
    LayerDrawing.current.style.translate = `${translateX}% ${translateY}%`
    const ctx = LayerDrawing.current.getContext('2d')
    if (!ctx) return
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
    startDrawing({ clientX, clientY, left, top })
  }

  function handleDrawing(e: React.MouseEvent) {
    const { clientX, clientY, movementX, movementY, type } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()
    drawing({ clientX, clientY, left, top, movementX, movementY, type })
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
    const { deltaY, shiftKey } = e
    if (!LayerDrawing.current || !LayerMouse.current) return
    LayerDrawing.current.style.translate = `${translateX}% ${translateY}%`
    LayerMouse.current.style.translate = `${translateX}% ${translateY}%`
    if (shiftKey) {
      deltaY < 0 && maxTranslate / 2 > translateX && translateX++
      deltaY > 0 && -maxTranslate < translateX && translateX--
      return
    } else {
      deltaY > 0 && maxTranslate / 2 > translateY && translateY++
      deltaY < 0 && -maxTranslate < translateY && translateY--
    }
  }

  function handleRemoveScrollTouch(e: React.TouchEvent<HTMLDivElement>) {
    if (e.targetTouches.length <= 1) return

    const { clientX, clientY } = e.targetTouches[0]

    const movementX = prevPosition.x < clientX ? 1 : -1
    const movementY = prevPosition.y < clientY ? 1 : -1

    if (!LayerDrawing.current || !LayerMouse.current) return

    if (clientX !== prevPosition.x) {
      movementX > 0 && maxTranslate / 2 > translateX && translateX++
      movementX < 0 && -maxTranslate < translateX && translateX--
    }
    if (clientY !== prevPosition.y) {
      movementY > 0 && maxTranslate / 2 > translateY && translateY++
      movementY < 0 && -maxTranslate < translateY && translateY--
    }

    LayerDrawing.current.style.translate = `${translateX}% ${translateY}%`
    LayerMouse.current.style.translate = `${translateX}% ${translateY}%`

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
        >
          parece que tu navegador no soporta la api de canvas por favor
          considera actualizar el navegador a la version mas reciente o utilizar
          otro navegador como Opera, Firefox, Chrome, etc
        </canvas>
        <canvas
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
