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

  function activeChangeColor(e: React.MouseEvent<HTMLDivElement>) {
    activePickerColor = true

    if (!InfoColor.current) return
    const { left, width: widthParentPicker } =
      e.currentTarget.getBoundingClientRect()
    const { clientX } = e
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
    console.log(infoColor.light)
  }

  function desactiveChangeColor() {
    activePickerColor = false
  }
  function changeColor(e: React.MouseEvent<HTMLDivElement>) {
    if (!activePickerColor) return
    if (!InfoColor.current) return
    const { left, width: widthParentPicker } =
      e.currentTarget.getBoundingClientRect()
    const { clientX } = e
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

  return (
    <div
      className={css.rangeColor}
      onMouseDown={activeChangeColor}
      onMouseMove={changeColor}
      onMouseUp={desactiveChangeColor}
      onMouseOut={desactiveChangeColor}
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
