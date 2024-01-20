import React from 'react'
import css from './SliderColor.module.css'

interface SliderColorProps {
  changeColor: (e: React.ChangeEvent<HTMLInputElement>) => void
  color: string
  max?: number
}

export default function SliderColor({
  changeColor,
  color,
  max,
}: SliderColorProps) {
  return (
    <>
      <input
        type="range"
        name="range-color"
        id="RangeColor"
        className={css.sliderColor}
        onChange={changeColor}
        min={0}
        max={max || 100}
        style={{
          background: color,
        }}
      />
    </>
  )
}
