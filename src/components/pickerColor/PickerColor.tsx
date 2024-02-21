import React from 'react'
import { ColorContext as Context } from '../../types/color/interface'
import { InformationColor } from '../../types/color/enums'
import OutputColor from '../../ui/outputColor/OutputColor'
import SliderColor from '../sliderColor/SliderColor'
import css from './PickerColor.module.css'

interface PickerColorProps extends Omit<Context, 'setColorFocus'> {}

export function PickerColor({ colors, setColor }: PickerColorProps) {
  function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, role } = e.currentTarget
    const color: InformationColor = { ...colors[colors.colorFocus] }
    
    if (role === 'sliderHue') setColor({ ...color, hue: parseInt(value) })

    if (role === 'sliderSaturation')
      setColor({ ...color, saturation: parseInt(value) })

    if (role === 'sliderLightness')
      setColor({ ...color, lightness: parseInt(value) })

    if (role === 'sliderAlpha') setColor({ ...color, alpha: Number(value) })
  }

  return (
    <div className={css.pickerColor} role="pickerColor">
      <OutputColor infoColor={colors[colors.colorFocus]} />
      <SliderColor
        onChange={changeColor}
        max={360}
        defaultValue={colors[colors.colorFocus].hue}
        role="sliderHue"
        style={{
          background: `linear-gradient(to right, hsl(0deg 100% 50%),hsl(90deg 100% 50%), hsl(180deg 100% 50%), hsl(270deg 100% 50%),  hsl(360deg 100% 50%))`,
        }}
      />
      <SliderColor
        role="sliderSaturation"
        onChange={changeColor}
        defaultValue={colors[colors.colorFocus].saturation}
        style={{
          background: `linear-gradient(to right, hsl(${
            colors[colors.colorFocus].hue
          }deg 0% 50%), hsl(${colors[colors.colorFocus].hue}deg 100% 50%)`,
        }}
      />
      <SliderColor
        role="sliderLightness"
        onChange={changeColor}
        defaultValue={colors[colors.colorFocus].lightness}
        style={{
          background: `linear-gradient(to right, hsl(${
            colors[colors.colorFocus].hue
          }deg ${colors[colors.colorFocus].saturation}% 0%), hsl(${
            colors[colors.colorFocus].hue
          }deg 100% 50%), hsl(${colors[colors.colorFocus].hue}deg ${
            colors[colors.colorFocus].saturation
          }% 100%))`,
        }}
      />
      <SliderColor
        role="sliderAlpha"
        onChange={changeColor}
        defaultValue={colors[colors.colorFocus].alpha}
        step={0.01}
        max={1}
        style={{
          background: `linear-gradient(to right, transparent, hsl(${
            colors[colors.colorFocus].hue
          }deg 100% 50%))`,
        }}
      />
    </div>
  )
}
