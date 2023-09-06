import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
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

export default function LayerPixel({}: LayerPixelProps) {
  const LayerDrawing = useRef<HTMLCanvasElement | null>(null)
  const LayerMouse = useRef<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [ctxMouse, setCtxMouse] = useState<CanvasRenderingContext2D | null>(
    null
  )
  const [sizeCanvas] = useState({ w: 500, h: 500 })
  const [multiplier, setMultiplier] = useState({ x: 1, y: 1 })
  console.log('render')
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

    const ctx = LayerMouse.current.getContext('2d')

    setCtxMouse(ctx)

    if (!ctx) return
    fillBackgroundCanvas({ ctx, ...sizeCanvas, bg: infoCanvas.bg })
  }, [infoCanvas, sizeCanvas])

  useEffect(() => {
    if (!LayerDrawing.current) return
    LayerDrawing.current.width = sizeCanvas.w
    LayerDrawing.current.height = sizeCanvas.h
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

  const handleStartDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      drawing = true
      const { clientX, clientY } = e
      const { left, top } = e.currentTarget.getBoundingClientRect()

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
    },
    [
      brushSize.h,
      brushSize.w,
      colors,
      ctx,
      infoCanvas.bg,
      multiplier.x,
      multiplier.y,
      setColor,
      sizePixel.h,
      sizePixel.w,
      toolSelect,
    ]
  )

  
  // function handleStartDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
  //   drawing = true
  //   const { clientX, clientY } = e
  //   const { left, top } = e.currentTarget.getBoundingClientRect()

  //   const correctingX = clientX - left
  //   const correctingY = clientY - top

  //   const sizePixelW = sizePixel.w * multiplier.x
  //   const sizePixelH = sizePixel.h * multiplier.y

  //   const w = Math.ceil(sizePixelW * brushSize.w)
  //   const h = Math.ceil(sizePixelH * brushSize.h)

  //   const centerDrawX = brushSize.w > 1 ? w / 2 : 0
  //   const centerDrawY = brushSize.h > 1 ? h / 2 : 0

  //   const y = Math.floor(
  //     Math.floor(correctingY / sizePixelH) * sizePixelH - centerDrawY
  //   )

  //   const x = Math.floor(
  //     Math.floor(correctingX / sizePixelW) * sizePixelW - centerDrawX
  //   )

  //   if (!ctx) return

  //   prevPosition = { x, y }

  //   if (Tools.brush === toolSelect) {
  //     for (let i = 0; i < limit; i++) {
  //       draw({
  //         ctx,
  //         x: x - w * (limit - i - 1),
  //         y: y - h * i,
  //         w: w * (limit - i) * 2 - w,
  //         h: h,
  //         bg: colors[colors.colorFocus].color,
  //       })

  //       draw({
  //         ctx,
  //         x: x - w * (limit - i - 1),
  //         y: y + h * i,
  //         w: w * (limit - i) * 2 - w,
  //         h: h,
  //         bg: colors[colors.colorFocus].color,
  //       })
  //     }
  //   }

  //   if (Tools.eraser === toolSelect) {
  //     clean({ ctx, x, y, w, h, bg: infoCanvas.bg })
  //   }

  //   if (Tools.eyeDropper === toolSelect) {
  //     const color = eyeDropper({ ctx, x, y })
  //     setColor({
  //       hue: 0,
  //       lightness: 0,
  //       saturation: 100,
  //       alpha: 1,
  //       color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
  //     })
  //   }
  // }

  function handleDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!ctx || !ctxMouse) return

    const { clientX, clientY, movementX, movementY } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()

    const correctingX = clientX - left
    const correctingY = clientY - top

    const sizePixelW = sizePixel.w * multiplier.x
    const sizePixelH = sizePixel.h * multiplier.y

    const w = Math.ceil(sizePixelW * brushSize.w)
    const h = Math.ceil(sizePixelH * brushSize.h)

    // arreglar
    const centerDrawX = brushSize.w > 1 ? w / 2 : 0
    const centerDrawY = brushSize.h > 1 ? h / 2 : 0

    const y = Math.floor(
      Math.floor(correctingY / sizePixelH) * sizePixelH - centerDrawY
    )

    const x = Math.floor(
      Math.floor(correctingX / sizePixelW) * sizePixelW - centerDrawX
    )

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
  // comandos

  // touch
  function handleTouch(e: React.TouchEvent<HTMLCanvasElement>) {
    if (!ctx) return
    const { clientX, clientY } = e.targetTouches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()

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

    if (!ctx) return

    const { clientX, clientY } = e.targetTouches[0]
    const { left, top } = e.currentTarget.getBoundingClientRect()

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
      console.log('rehacer')
      if (!ctx) return
      redo({ ctx })
      return
    }
  }

  return (
    <>
      <canvas ref={LayerDrawing} className={css.canvasPixel}>
        parece que tu navegador no soporta la api de canvas por favor considera
        actualizar el navegador a la version mas reciente o utilizar otro
        navegador
      </canvas>
      <canvas
        ref={LayerMouse}
        className={css.canvasPixel}
        onMouseMove={handleDrawing}
        onMouseDown={handleStartDrawing}
        onMouseUp={handleEndDrawing}
        onKeyDown={handleCommand}
        // onKeyUp={e => console.log('no se puede mover', e.code)}
        onTouchMove={handleTouch}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleEndDrawing}
        tabIndex={0}
      ></canvas>
    </>
  )
}
