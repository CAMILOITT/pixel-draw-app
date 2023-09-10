import React, { useRef } from 'react'
import css from './RangeSettings.module.css'
import { InfoColor, UIInfoColor } from '../../../types/color/enums'

interface RangeColorProps {
  modifyColor: React.Dispatch<React.SetStateAction<InfoColor>>
}

let activePickerColor = false
const LimitTranslate = 0
const borderWidth = 5

export default function RangeColor({ modifyColor }: RangeColorProps) {
  const InfoColor = useRef<HTMLDivElement | null>(null)

  function activeChangeColor({
    clientX,
    left,
    widthParentPicker,
  }: UIInfoColor) {
    activePickerColor = true
    if (!InfoColor.current) return

    const { width: widthPicker } = InfoColor.current.getBoundingClientRect()

    const posX = Math.round(clientX - left)

    if (
      posX < LimitTranslate + borderWidth ||
      posX > widthParentPicker - borderWidth
    )
      return
    InfoColor.current.style.left = `${posX - widthPicker}px`

    const porcentaje =
      ((posX - borderWidth) / (widthParentPicker - borderWidth * 2)) * 100

    const color = Math.round((porcentaje / 100) * 360)
    modifyColor(value => {
      return {
        ...value,
        color,
      }
    })
  }

  function changeColor({ clientX, left, widthParentPicker }: UIInfoColor) {
    if (!activePickerColor) return
    if (!InfoColor.current) return

    const { width: widthPicker } = InfoColor.current.getBoundingClientRect()

    const posX = Math.round(clientX - left)
    if (
      posX < LimitTranslate + borderWidth ||
      posX > widthParentPicker - borderWidth
    )
      return
    InfoColor.current.style.left = `${posX - widthPicker}px`

    const porcentaje =
      ((posX - borderWidth) / (widthParentPicker - borderWidth * 2)) * 100

    const color = Math.round((porcentaje / 100) * 360)
    modifyColor(value => {
      return {
        ...value,
        color,
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
        background: `linear-gradient(to right, hsl(0deg 100% 50%),hsl(90deg 100% 50%), hsl(180deg 100% 50%), hsl(270deg 100% 50%),  hsl(360deg 100% 50%))`,
      }}
    >
      <div className={css.infoRange} ref={InfoColor}></div>
    </div>
  )
}
