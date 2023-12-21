import { useContext, useEffect, useState } from 'react'
import { coords } from '../../api/canvas/coord'
import { actionsDrawing } from '../../api/canvas/drawingActions'
import {
  calculatePixelMouse,
  getMovementPosition,
} from '../../api/canvas/utils/pixel'
import { ColorContext } from '../../context/state/color/Color'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { BrushContext } from '../../context/state/pencil/Pencil'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Drawing, DrawingMove } from '../../types/drawing/interface'

type Context2D = CanvasRenderingContext2D | null
interface useDrawingMouseProps {
  sizeCanvas: { w: number; h: number }
}

let canDrawn = false
let prevPosition = { x: 0, y: 0 }

export function useDrawingMouse({ sizeCanvas }: useDrawingMouseProps) {
  const [ctx, setCtx] = useState<Context2D>(null)
  const [ctxMouse, setCtxMouse] = useState<Context2D>(null)
  const { infoCanvas, sizePixel, setUrlImage } = useContext(InfoCanvasContext)
  const { toolSelect } = useContext(SelectorToolsContext)
  const { colors, setColor } = useContext(ColorContext)
  const { brushSize } = useContext(BrushContext)
  const [multiplier, setMultiplier] = useState({ x: 1, y: 1 })

  useEffect(() => {
    setMultiplier({
      x: sizeCanvas.w / infoCanvas.w,
      y: sizeCanvas.h / infoCanvas.h,
    })
  }, [infoCanvas, sizeCanvas])

  useEffect(() => {
    setMultiplier({
      x: sizeCanvas.w / infoCanvas.w,
      y: sizeCanvas.h / infoCanvas.h,
    })
  }, [infoCanvas, sizeCanvas])

  function startDrawing({ clientX, clientY, left, top }: Drawing) {
    canDrawn = true

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

  function drawing({
    left,
    top,
    clientX,
    clientY,
    movementX,
    movementY,
  }: DrawingMove) {
    if (!ctx || !ctxMouse) return

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

    if (movementX === undefined || movementY === undefined) {
      const movementDirection = getMovementPosition({
        x: clientX,
        y: clientY,
        prevPosition,
      })
      movementX = movementDirection.movementX
      movementY = movementDirection.movementY
    }

    ctxMouse.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
    ctxMouse.beginPath()
    ctxMouse.fillStyle = colors[colors.colorFocus].color
    ctxMouse.rect(x, y, w, h)
    ctxMouse.fill()
    ctxMouse.closePath()

    if (prevPosition.x === x && prevPosition.y === y) return
    if (!canDrawn) return

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

  function endDrawing() {
    canDrawn = false
    coords.update()
    ctxMouse?.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
    if (!ctx) return
    const imageUrl = ctx.canvas.toDataURL('image/png')
    setUrlImage(imageUrl)
    ctxMouse?.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
  }

  return {
    startDrawing,
    drawing,
    endDrawing,
    setCtx,
    setCtxMouse,
    setMultiplier,
  }
}
