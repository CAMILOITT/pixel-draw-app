import React, { useRef } from 'react'
import css from './RangeSettings.module.css'

let activePickerColor = false
const LimitTranslate = 0
const borderWidth = 5

export default function RangeSaturation({
  modifyColor,
  infoColor,
}: {
  modifyColor: React.Dispatch<
    React.SetStateAction<{
      color: number
      saturation: number
      light: number
      dark: number
      alpha: number
    }>
  >
  infoColor: {
    color: number
    saturation: number
    light: number
    dark: number
  }
}) {
  const InfoColor = useRef<HTMLDivElement | null>(null)

  function activeChangeColor({
    left,
    widthParentPicker,
    clientX,
  }: {
    left: number
    widthParentPicker: number
    clientX: number
  }) {
    activePickerColor = true

    if (!InfoColor.current) return
    const { width: widthPicker } = InfoColor.current.getBoundingClientRect()
    const posX = Math.floor(clientX - left)
    if (
      posX < LimitTranslate + borderWidth ||
      posX > widthParentPicker - borderWidth
    )
      return
    InfoColor.current.style.left = `${posX - widthPicker}px`

    const saturation = Math.round(
      ((posX - borderWidth) / (widthParentPicker - borderWidth * 2)) * 100
    )

    modifyColor(value => {
      return {
        ...value,
        saturation,
        light: Math.round(50 - saturation / 2),
      }
    })
  }

  function changeColor({
    left,
    widthParentPicker,
    clientX,
  }: {
    left: number
    widthParentPicker: number
    clientX: number
  }) {
    if (!activePickerColor) return
    if (!InfoColor.current) return
    const { width: widthPicker } = InfoColor.current.getBoundingClientRect()
    const posX = Math.floor(clientX - left)
    if (
      posX < LimitTranslate + borderWidth ||
      posX > widthParentPicker - borderWidth
    )
      return
    InfoColor.current.style.left = `${posX - widthPicker}px`

    const saturation = Math.round(
      ((posX - borderWidth) / (widthParentPicker - borderWidth * 2)) * 100
    )
    const light = Math.round(50 - saturation / 2)
    modifyColor(value => {
      return {
        ...value,
        saturation,
        light,
      }
    })
  }

  function desactiveChangeColor() {
    activePickerColor = false
  }

  function handlerActiveMouse(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    activeChangeColor({ clientX, left, widthParentPicker: width })
  }

  function handlerActiveTouch(e: React.TouchEvent<HTMLDivElement>) {
    const { clientX } = e.touches[0]
    const { left, width: widthParentPicker } =
      e.currentTarget.getBoundingClientRect()
    activeChangeColor({ clientX, left, widthParentPicker })
  }

  function handlerChangeColorMouse(e: React.MouseEvent<HTMLDivElement>) {
    const { left, width: widthParentPicker } =
      e.currentTarget.getBoundingClientRect()
    const { clientX } = e
    changeColor({ clientX, left, widthParentPicker })
  }

  function handlerChangeColorTouch(e: React.TouchEvent<HTMLDivElement>) {
    const { left, width: widthParentPicker } =
      e.currentTarget.getBoundingClientRect()
    const { clientX } = e.touches[0]
    changeColor({ clientX, left, widthParentPicker })
  }

  return (
    <div
      className={css.rangeColor}
      onMouseDown={handlerActiveMouse}
      onMouseMove={handlerChangeColorMouse}
      onMouseUp={desactiveChangeColor}
      onMouseOut={desactiveChangeColor}
      // touch
      onTouchStart={handlerActiveTouch}
      onTouchMove={handlerChangeColorTouch}
      onTouchEnd={desactiveChangeColor}
      style={{
        backgroundImage: `linear-gradient(to right, hsl(${
          infoColor.color
        }deg 0% ${infoColor.light + infoColor.dark}%), hsl(${
          infoColor.color
        }deg ${infoColor.saturation}% ${infoColor.light + infoColor.dark}%)`,
      }}
    >
      <div className={css.infoRange} ref={InfoColor}></div>
    </div>
  )
}
