import React from 'react'
import css from './SliderColor.module.css'

interface SliderColorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function SliderColor({
  ...props
}:
SliderColorProps) {
  return <input type="range" className={css.sliderColor} {...props} />
}
