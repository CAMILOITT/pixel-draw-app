import React, { useRef } from 'react'
import css from './RangeSettings.module.css'

let activePickerColor = false
const LimitTranslate = 0
const borderWidth = 5

export default function RangeColor({
  modifyColor,
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
}) {
  const InfoColor = useRef<HTMLDivElement | null>(null)

  function activeChangeColor(e: React.MouseEvent<HTMLDivElement>) {
    activePickerColor = true
    if (!InfoColor.current) return

    const { left, width: widthParentPicker } =
      e.currentTarget.getBoundingClientRect()
    const { clientX } = e
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

  function changeColor(e: React.MouseEvent<HTMLDivElement>) {
    if (!activePickerColor) return
    if (!InfoColor.current) return

    const { left, width: widthParentPicker } =
      e.currentTarget.getBoundingClientRect()

    const { clientX } = e

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

  return (
    <div
      className={css.rangeColor}
      onMouseDown={activeChangeColor}
      onMouseMove={changeColor}
      onMouseUp={desactiveChangeColor}
      onMouseOut={desactiveChangeColor}
      style={{
        background: `linear-gradient(to right, hsl(0deg 100% 50%),hsl(90deg 100% 50%), hsl(180deg 100% 50%), hsl(270deg 100% 50%),  hsl(360deg 100% 50%))`,
      }}
    >
      <div className={css.infoRange} ref={InfoColor}></div>
    </div>
  )
}
