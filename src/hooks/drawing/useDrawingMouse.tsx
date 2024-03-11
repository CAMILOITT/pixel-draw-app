import { Color, ConvertColor } from '@utils/color'
import { useContext, useEffect, useState } from 'react'
import { coords } from '../../api/canvas/coord'
import { actionsDrawing } from '../../api/canvas/drawingActions'
import { bucketFill, eyeDropper } from '../../api/canvas/tools'
import {
  calculatePixelMouse,
  getMovementPosition,
} from '../../api/canvas/utils/pixel'
import { ColorContext } from '../../context/state/color/Color'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { BrushContext } from '../../context/state/pencil/Pencil'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Drawing, DrawingMove } from '../../types/drawing/interface'
import { Tools } from '../../types/tools/enums'

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

  const [sizeRelative, setSizeRelative] = useState({
    w: infoCanvas.w,
    h: infoCanvas.h,
  })

  useEffect(() => {
    setMultiplier({
      x: sizeCanvas.w / infoCanvas.w,
      y: sizeCanvas.h / infoCanvas.h,
    })
  }, [infoCanvas, sizeCanvas])

  function startDrawing({ clientX, clientY, left, top }: Drawing) {
    canDrawn = true
    if (toolSelect === Tools.eyeDropper || toolSelect === Tools.fillBucket)
      return
    const { x, y, w, h } = calculatePixelMouse({
      clientX,
      clientY,
      left,
      top,
      brushSize,
      multiplier,
      sizePixel,
      prevPosition,
      size: {
        absolute: infoCanvas,
        relative: sizeRelative,
      },
    })

    if (!ctx) return

    prevPosition = { x, y }

    actionsDrawing({
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
  }

  function drawing({
    left,
    top,
    clientX,
    clientY,
    movementX,
    movementY,
    type,
  }: DrawingMove) {
    if (!ctx || !ctxMouse) return
    if (toolSelect === Tools.eyeDropper || toolSelect === Tools.fillBucket)
      return

    const { x, y, w, h } = calculatePixelMouse({
      clientX,
      clientY,
      left,
      top,
      brushSize,
      multiplier,
      sizePixel,
      prevPosition,
      size: {
        absolute: infoCanvas,
        relative: sizeRelative,
      },
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
    ctxMouse.fillStyle = Color.convertDataToString(colors[colors.colorFocus])
    ctxMouse.rect(x, y, w, h)
    ctxMouse.fill()
    ctxMouse.closePath()

    if (prevPosition.x === x && prevPosition.y === y) return
    if (!canDrawn) return

    actionsDrawing({
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
      type,
    })

    prevPosition = { x, y }
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

  function useTools(e: React.MouseEvent<HTMLCanvasElement>) {
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
      size: {
        absolute: infoCanvas,
        relative: sizeRelative,
      },
    })

    if (!ctx) return

    if (toolSelect === Tools.eyeDropper) {
      const color = eyeDropper({
        ctx,
        x,
        y,
      })
      const [hue, saturation, lightness, alpha] = ConvertColor.rgbToHsl(
        color[0],
        color[1],
        color[2],
        color[3] / 255
      )
      setColor({
        hue,
        lightness,
        saturation,
        alpha,
      })
    }
    if (toolSelect === Tools.fillBucket) {
      const color = eyeDropper({
        ctx,
        x,
        y,
      })
      const bg = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      const fillColor = Color.convertDataToString(colors[colors.colorFocus])
      bucketFill({ ctx, x, y, w, h, color: bg, fillColor })
    }
  }

  return {
    startDrawing,
    drawing,
    endDrawing,
    setCtx,
    setCtxMouse,
    setMultiplier,
    useTools,
    setSizeRelative,
  }
}
