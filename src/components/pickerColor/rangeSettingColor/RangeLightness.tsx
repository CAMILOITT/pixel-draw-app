import React, { useRef } from 'react'
import css from './RangeSettings.module.css'
import { InfoColor, UIInfoColor } from '../../../types/color/enums'

interface RangeLightnessProps {
  infoColor: InfoColor
  modifyColor: React.Dispatch<React.SetStateAction<InfoColor>>
}

let activePickerColor = false
const LimitTranslate = 0
const borderWidth = 5

export default function RangeLightness({
  modifyColor,
  infoColor,
}: RangeLightnessProps) {
  const InfoColor = useRef<HTMLDivElement | null>(null)

  function activeChangeColor({
    left,
    widthParentPicker,
    clientX,
  }: UIInfoColor) {
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

    modifyColor(value => {
      return {
        ...value,
        dark: Math.round(
          ((posX - borderWidth) / (widthParentPicker - borderWidth * 2)) * 50
        ),
      }
    })
  }

  function desactiveChangeColor() {
    activePickerColor = false
  }

  function changeColor({ left, widthParentPicker, clientX }: UIInfoColor) {
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

    modifyColor(value => {
      return {
        ...value,
        dark: Math.round(
          ((posX - borderWidth) / (widthParentPicker - borderWidth * 2)) * 50
        ),
      }
    })
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
      onTouchStart={handlerActiveTouch}
      onTouchMove={handlerChangeColorTouch}
      onTouchEnd={desactiveChangeColor}
      style={{
        backgroundImage: `linear-gradient(to right, hsl(${infoColor.color}deg ${
          infoColor.saturation
        }% 0%), hsl(${infoColor.color}deg ${infoColor.saturation}% ${
          infoColor.light + infoColor.dark
        }%))`,
      }}
    >
      <div className={css.infoRange} ref={InfoColor}></div>
    </div>
  )
}
