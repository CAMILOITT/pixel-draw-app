import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '../../assets/icons/AddIcon'
import { ColorContext } from '../../context/state/color/Color'
import { InfoColor } from '../../types/color/enums'
import { InformationColor, ListInfoColor } from '../../types/color/interface'
import SliderColor from '../sliderColor/SliderColor'
import css from './PickerColor.module.css'
import OutputColor from './outputColor/OutputColor'
interface PickerColorProps {
  addColor: React.Dispatch<React.SetStateAction<ListInfoColor[]>>
  listColors: InformationColor[]
}
export function PickerColor({ addColor, listColors }: PickerColorProps) {
  const { setColor: getColor } = useContext(ColorContext)
  const [color, setColor] = useState<InfoColor>({
    hue: 359,
    saturation: 100,
    lightness: 50,
    alpha: 1,
  })
  useEffect(() => {
    const newColor: InformationColor = {
      hue: color.hue,
      saturation: color.saturation,
      lightness: color.lightness,
      alpha: color.alpha || 1,
      color: `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`,
    }
    getColor(newColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color])
  function handleAddColor() {
    const indexColor = listColors.findIndex(value => {
      if (
        value.hue === color.hue &&
        value.saturation === color.saturation &&
        value.lightness === color.lightness &&
        value.alpha === color.alpha
      )
        return value
    })
    if (indexColor > 0) return
    addColor(value => [
      ...value,
      {
        id: crypto.randomUUID(),
        ...color,
        color: `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`,
      },
    ])
  }
  function changeHue(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    const hue = parseInt(value)
    setColor(colorValue => ({ ...colorValue, hue }))
  }
  function changeSaturation(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    const saturation = parseInt(value)
    setColor(colorData => ({ ...colorData, saturation }))
  }
  function changeLightness(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    const lightness = parseInt(value)
    setColor(colorData => ({ ...colorData, lightness }))
  }
  function changeAlpha(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    const alpha = parseInt(value) / 100
    setColor(colorData => ({ ...colorData, alpha }))
  }
  return (
    <div className={css.pickerColor}>
      <OutputColor infoColor={color} />

      <SliderColor
        changeColor={changeHue}
        color={`linear-gradient(to right, hsl(0deg 100% 50%),hsl(90deg 100% 50%), hsl(180deg 100% 50%), hsl(270deg 100% 50%),  hsl(360deg 100% 50%))`}
        max={360}
      />
      <SliderColor
        changeColor={changeSaturation}
        color={`linear-gradient(to right, hsl(${color.hue}deg 0% 50%), hsl(${color.hue}deg 100% 50%)`}
      />
      <SliderColor
        color={`linear-gradient(to right, hsl(${color.hue}deg ${color.saturation}% 0%), hsl(${color.hue}deg 100% 50%), hsl(${color.hue}deg ${color.saturation}% 100%))`}
        changeColor={changeLightness}
      />
      <SliderColor
        color={`linear-gradient(to right, transparent, hsl(${color.hue}deg 100% 50%))`}
        changeColor={changeAlpha}
      />
      <button className={css.addColor} onClick={handleAddColor}>
        <AddIcon />
      </button>
    </div>
  )
}
