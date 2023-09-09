import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { handleCorrection } from '../../api/canvas/correction'
import { clean, draw, fillBackgroundCanvas } from '../../api/canvas/drawing'
import { eyeDropper, redo, undo } from '../../api/canvas/tools'
import { update } from '../../api/canvas/update'
import { ColorContext } from '../../context/state/color/Color'
import { InfoCanvasContext } from '../../context/state/infoCanvas/InfoCanvas'
import { BrushContext } from '../../context/state/pencil/Pencil'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Tools } from '../../types/tools/enums'
import css from './LayerPixel.module.css'

interface LayerPixelProps {}

let drawing = false

const limit = 1

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
  const { toolSelect, setToolSelect } = useContext(SelectorToolsContext)
  const { colors, setColorFocus, setColor } = useContext(ColorContext)
  const { brushSize } = useContext(BrushContext)

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
    setContextCanvasDrawing({ ctx })
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoCanvas, sizeCanvas])

  function calculatePixelMouse({
    clientX,
    clientY,
    left,
    top,
  }: {
    clientX: number
    clientY: number
    left: number
    top: number
  }) {
    const movementX = prevPosition.x < clientX ? 1 : -1
    const movementY = prevPosition.y < clientY ? 1 : -1

    const correctingX = clientX - left
    const correctingY = clientY - top

    const sizePixelW = sizePixel.w * multiplier.x
    const sizePixelH = sizePixel.h * multiplier.y

    const w = Math.ceil(sizePixelW * brushSize.w)
    const h = Math.ceil(sizePixelH * brushSize.h)

    const centerDrawX = brushSize.w > 1 ? w / 2 : 0
    const centerDrawY = brushSize.h > 1 ? h / 2 : 0

    const y = Math.floor(
      Math.floor(correctingY / sizePixelH) * sizePixelH - centerDrawY
    )

    const x = Math.floor(
      Math.floor(correctingX / sizePixelW) * sizePixelW - centerDrawX
    )

    return { x, y, w, h, movementX, movementY }
  }

  function handleStartDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    drawing = true
    const { clientX, clientY } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()

    const { x, y, w, h } = calculatePixelMouse({ clientX, clientY, left, top })

    if (!ctx) return

    prevPosition = { x, y }

    if (Tools.brush === toolSelect) {
      for (let i = 0; i < limit; i++) {
        draw({
          ctx,
          x: x - w * (limit - i - 1),
          y: y - h * i,
          w: w * (limit - i) * 2 - w,
          h: h,
          bg: colors[colors.colorFocus].color,
        })

        draw({
          ctx,
          x: x - w * (limit - i - 1),
          y: y + h * i,
          w: w * (limit - i) * 2 - w,
          h: h,
          bg: colors[colors.colorFocus].color,
        })
      }
    }

    if (Tools.eraser === toolSelect) {
      clean({ ctx, x, y, w, h, bg: infoCanvas.bg })
    }

    if (Tools.eyeDropper === toolSelect) {
      const color = eyeDropper({ ctx, x, y })
      setColor({
        hue: 0,
        lightness: 0,
        saturation: 100,
        alpha: 1,
        color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
      })
    }
  }

  function handleDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!ctx || !ctxMouse) return

    const { clientX, clientY, movementX, movementY } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()
    const { x, y, w, h } = calculatePixelMouse({ clientX, clientY, left, top })

    ctxMouse.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
    ctxMouse.beginPath()
    ctxMouse.fillStyle = colors[colors.colorFocus].color
    ctxMouse.rect(x, y, w, h)
    ctxMouse.fill()
    ctxMouse.closePath()

    if (prevPosition.x === x && prevPosition.y === y) return

    if (!drawing) return
    if (Tools.eyeDropper === toolSelect) {
      const color = eyeDropper({
        ctx,
        x,
        y,
      })
      setColor({
        hue: 0,
        lightness: 0,
        saturation: 100,
        alpha: 1,
        color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
      })
      return
    }
    if (Tools.eraser === toolSelect) {
      const valueClean = {
        ctx,
        x,
        y,
        w,
        h,
        bg: infoCanvas.bg,
      }
      clean(valueClean)
      return
    }

    if (Tools.brush === toolSelect) {
      handleCorrection({
        ctx,
        x,
        y,
        w,
        h,
        bg: colors[colors.colorFocus].color,
        movementX,
        movementY,
        prevPosition,
      })

      const infoDraw = {
        ctx,
        x,
        y,
        w,
        h,
        bg: colors[colors.colorFocus].color,
      }
      draw(infoDraw)
    }

    prevPosition = { x, y }
  }

  function handleEndDrawing() {
    drawing = false

    update()
    if (!LayerDrawing.current) return
    const imageUrl = LayerDrawing.current.toDataURL('image/png')
    setUrlImage(imageUrl)
    ctxMouse?.clearRect(0, 0, sizeCanvas.w, sizeCanvas.h)
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
    })

    if (prevPosition.x === x && prevPosition.y === y) return

    handleCorrection({
      ctx,
      x,
      y,
      w,
      h,
      bg: colors[colors.colorFocus].color,
      movementX,
      movementY,
      prevPosition,
    })

    prevPosition = { x, y }

    if (Tools.brush === toolSelect) {
      draw({ ctx, x, y, w, h, bg: colors[colors.colorFocus].color })
    }

    if (Tools.eraser === toolSelect) {
      clean({ ctx, x, y, w, h, bg: infoCanvas.bg })
    }
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
    })

    prevPosition = { x, y }

    if (Tools.brush === toolSelect) {
      for (let i = 0; i < limit; i++) {
        draw({
          ctx,
          x: x - w * (limit - i - 1),
          y: y - h * i,
          w: w * (limit - i) * 2 - w,
          h: h,
          bg: colors[colors.colorFocus].color,
        })

        draw({
          ctx,
          x: x - w * (limit - i - 1),
          y: y + h * i,
          w: w * (limit - i) * 2 - w,
          h: h,
          bg: colors[colors.colorFocus].color,
        })
      }
    }

    if (Tools.eraser === toolSelect) {
      clean({ ctx, x, y, w, h, bg: infoCanvas.bg })
    }

    if (Tools.eyeDropper === toolSelect) {
      eyeDropper({ ctx, x, y })
    }
  }

  function handleCommand(e: React.KeyboardEvent<HTMLCanvasElement>) {
    e.preventDefault()

    const { key, ctrlKey, shiftKey } = e

    if (key === 'x') {
      colors.colorFocus === 'colorPrimary'
        ? setColorFocus('colorSecondary')
        : setColorFocus('colorPrimary')
      return
    }
    if (key === 'b') {
      setToolSelect(Tools.brush)
      return
    }
    if (key === 'e') {
      setToolSelect(Tools.eraser)
      return
    }
    if (key === 'd') {
      setToolSelect(Tools.eyeDropper)
      return
    }

    if (key === 'z' && ctrlKey) {
      if (!ctx) return
      undo({ ctx })
      return
    }

    if (shiftKey && ctrlKey && key === 'Z') {
      if (!ctx) return
      redo({ ctx })
      return
    }
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
          otro navegador
        </canvas>
        <canvas
          ref={LayerMouse}
          className={css.canvasPixel}
          onMouseMove={handleDrawing}
          onMouseDown={handleStartDrawing}
          onMouseUp={handleEndDrawing}
          onKeyDown={handleCommand}
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
