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
    setMultiplier,
    setCtx: setCtxEvents,
    setCtxMouse: setCtxMouseEvents,
  } = useDrawingMouse({ sizeCanvas })

  useEffect(() => {
    if (!LayerMouse.current) return
    LayerMouse.current.width = sizeCanvas.w
    LayerMouse.current.height = sizeCanvas.h
    LayerMouse.current.style.translate = `${translateX}% ${translateY}%`
    const ctx = LayerMouse.current.getContext('2d')
    setCtxMouseEvents(ctx)
    if (!ctx) return
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
  }, [infoCanvas, setCtxMouseEvents, sizeCanvas])

  useEffect(() => {
    if (!LayerDrawing.current) return
    LayerDrawing.current.width = sizeCanvas.w
    LayerDrawing.current.height = sizeCanvas.h
    LayerDrawing.current.style.translate = `${translateX}% ${translateY}%`
    const ctx = LayerDrawing.current.getContext('2d')
    setMultiplier({
      x: sizeCanvas.w / infoCanvas.w,
      y: sizeCanvas.h / infoCanvas.h,
    })
    if (!ctx) return
    setCtxEvents(ctx)
    setCtxKeyboard(ctx)
    setContextCanvasDrawing({ ctx })
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCanvas, sizeCanvas])

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
    drawing({ clientX, clientY, left, top,  })
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
        <canvas ref={LayerDrawing} className={css.canvasPixel}>
          parece que tu navegador no soporta la api de canvas por favor
          considera actualizar el navegador a la version mas reciente o utilizar
          otro navegador como Opera, Firefox, Chrome, etc
        </canvas>
        <canvas
          ref={LayerMouse}
          className={css.canvasPixel}
          onMouseMove={handleDrawing}
          onMouseDown={handleStartDrawing}
          onMouseUp={endDrawing}
          onKeyDown={keyboardEvents}
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
