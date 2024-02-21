import Button from '@ui/button/Button'
import ColorSample from '@ui/colorSample/ColorSample'
import { useState } from 'react'
import AddIcon from '../../assets/icons/AddIcon'
import {
  InformationColorChange,
  ListInfoColor,
} from '../../types/color/interface'
import css from './ListColors.module.css'

interface ListColorsProps {
  colors: InformationColorChange
}

export default function ListColors({ colors }: ListColorsProps) {
  const [recentColors, setRecentColors] = useState<ListInfoColor[]>([
    { ...colors.colorPrimary, id: crypto.randomUUID() },
  ])

  function handleAddColor() {
    const result = recentColors.some(value => {
      if (
        value.hue === colors[colors.colorFocus].hue &&
        value.saturation === colors[colors.colorFocus].saturation &&
        value.lightness === colors[colors.colorFocus].lightness &&
        value.alpha === colors[colors.colorFocus].alpha
      )
        return value
    })

    if (result) return
    setRecentColors(value => [
      ...value,
      {
        id: crypto.randomUUID(),
        ...colors[colors.colorFocus],
      },
    ])
  }

  return (
    <div className={css.listColorsContainer} role="listColor">
      <Button
        onClick={handleAddColor}
        children={<AddIcon />}
        className={css.addColor} role='addColor'
      />
      <ul className={css.listColors}>
        {recentColors.map((color, key) => (
          <ColorSample
            color={color}
            key={key}
            setRecentColors={setRecentColors}
          />
        ))}
      </ul>
    </div>
  )
}
