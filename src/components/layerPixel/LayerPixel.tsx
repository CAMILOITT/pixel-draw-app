import React, { useContext, useEffect, useRef, useState } from 'react'
import { coords } from '../../api/canvas/coord'
import { handleCorrection } from '../../api/canvas/correction'
import { fillBackgroundCanvas } from '../../api/canvas/drawing'
import { actionsDrawing } from '../../api/canvas/drawingActions'
import { calculatePixelMouse } from '../../api/canvas/utils/pixel'
import { ColorContext } from '../../context/state/color/Color'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { BrushContext } from '../../context/state/pencil/Pencil'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { useKeyboardEvents } from '../../hooks/useKeyboardEvents'
import css from './LayerPixel.module.css'

interface LayerPixelProps {}

let drawing = false

// const limit = 1

let prevPosition = { x: 0, y: 0 }

let translateX = -50
let translateY = -50

const maxTranslate = 100

export default function LayerPixel({}: LayerPixelProps) {
  const LayerDrawing = useRef<HTMLCanvasElement | null>(null)
  const LayerMouse = useRef<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [ctxMouse, setCtxMouse] = useState<CanvasRenderingContext2D | null>(
    null
  )
  const [sizeCanvas] = useState({ w: 500, h: 500 })
  const [multiplier, setMultiplier] = useState({ x: 1, y: 1 })
  const { infoCanvas, sizePixel, setUrlImage, setContextCanvasDrawing } =
    useContext(InfoCanvasContext)
  const { toolSelect } = useContext(SelectorToolsContext)
  const { colors, setColor } = useContext(ColorContext)
  const { brushSize } = useContext(BrushContext)
  const { events: keyboardEvents, setCtx: setCtxKeyboard } = useKeyboardEvents()

  useEffect(() => {
    setMultiplier({
      x: sizeCanvas.w / infoCanvas.w,
      y: sizeCanvas.h / infoCanvas.h,
    })
  }, [infoCanvas, sizeCanvas])

  useEffect(() => {
    if (!LayerMouse.current) return
    LayerMouse.current.width = sizeCanvas.w
    LayerMouse.current.height = sizeCanvas.h
    LayerMouse.current.style.translate = `${translateX}% ${translateY}%`
    const ctx = LayerMouse.current.getContext('2d')

    setCtxMouse(ctx)

    if (!ctx) return
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
  }, [infoCanvas, sizeCanvas])

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
    setCtx(ctx)
    setCtxKeyboard(ctx)
    setContextCanvasDrawing({ ctx })
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCanvas, sizeCanvas])

  function handleStartDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    drawing = true
    
    const { clientX, clientY } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()

    const { x, y, w, h } = calculatePixelMouse({
      clientX,
      clientY,
      left,
      top,
      brushSize,
      multiplier,
      sizePixel,
      prevPosition,
    })

    if (!ctx) return

    prevPosition = { x, y }

    const color = actionsDrawing({
      ctx,
      x,
      y,
      w,
      h,
      toolSelect,
      infoCanvas,
      colors,
      prevPosition,
    })

    if (!color) return
    setColor(color)
  }

  function handleDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!ctx || !ctxMouse) return

    const { clientX, clientY, movementX, movementY } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()
    const { x, y, w, h } = calculatePixelMouse({
      clientX,
      clientY,
      left,
      top,
      brushSize,
      multiplier,
      sizePixel,
      prevPosition,
    })

    ctxMouse.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
    ctxMouse.beginPath()
    ctxMouse.fillStyle = colors[colors.colorFocus].color
    ctxMouse.rect(x, y, w, h)
    ctxMouse.fill()
    ctxMouse.closePath()

    if (prevPosition.x === x && prevPosition.y === y) return
    if (!drawing) return

    const color = actionsDrawing({
      ctx,
      x,
      y,
      w,
      h,
      toolSelect,
      infoCanvas,
      colors,
      movementX,
      movementY,
      prevPosition,
    })

    prevPosition = { x, y }

    if (!color) return
    setColor(color)
  }

  function handleTouch(e: React.TouchEvent<HTMLCanvasElement>) {
    if (e.targetTouches.length >= 2) return
    if (!ctx) return

    const { clientX, clientY } = e.targetTouches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()

    const { x, y, w, h, movementX, movementY } = calculatePixelMouse({
      clientX,
      clientY,
      left,
      top,
      brushSize,
      multiplier,
      sizePixel,
      prevPosition,
    })

    if (prevPosition.x === x && prevPosition.y === y) return

    const content = {
      ctx,
      x,
      y,
      w,
      h,
      bg: colors[colors.colorFocus].color,
    }

    handleCorrection({
      ...content,
      movementX,
      movementY,
      prevPosition,
    })

    prevPosition = { x, y }

    const color = actionsDrawing({
      ctx,
      x,
      y,
      w,
      h,
      toolSelect,
      infoCanvas,
      colors,
      movementX,
      movementY,
      prevPosition,
    })

    if (!color) return
    setColor(color)
  }

  function handleTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
    drawing = true

    if (e.targetTouches.length >= 2) return
    if (!ctx) return

    const { clientX, clientY } = e.targetTouches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()
    const { x, y, w, h } = calculatePixelMouse({
      clientX,
      clientY,
      left,
      top,
      brushSize,
      multiplier,
      sizePixel,
      prevPosition,
    })

    prevPosition = { x, y }

    const color = actionsDrawing({
      ctx,
      x,
      y,
      w,
      h,
      toolSelect,
      infoCanvas,
      colors,
      prevPosition,
    })

    if (!color) return
    setColor(color)
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
    if (e.targetTouches.length <= 1 || drawing) return

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
    ctxMouse?.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
    handleEndDrawing()
  }

  function handleEndDrawing() {
    drawing = false
    coords.update()
    if (!LayerDrawing.current) return
    const imageUrl = LayerDrawing.current.toDataURL('image/png')
    setUrlImage(imageUrl)
    ctxMouse?.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
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
          onMouseUp={handleEndDrawing}
          onKeyDown={keyboardEvents}
          onMouseLeave={cleanCanvasMouse}
          onTouchMove={handleTouch}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleEndDrawing}
          tabIndex={0}
        ></canvas>
      </div>
    </div>
  )
}
// 458
