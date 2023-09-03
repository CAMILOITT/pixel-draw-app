import { useContext, useEffect, useState } from 'react'
import AddIcon from '../../assets/icons/AddIcon'
import { ColorContext } from '../../context/state/color/Color'
import { InformationColor, ListInfoColor } from '../../types/color/interface'
import css from './PickerColor.module.css'
import OutputColor from './outputColor/OutputColor'
import RangeColor from './rangeSettingColor/RangeColor'
import RangeLightness from './rangeSettingColor/RangeLightness'
import RangeSaturation from './rangeSettingColor/RangeSaturation'

interface PickerColorProps {
  addColor: React.Dispatch<React.SetStateAction<ListInfoColor[] >>
  listColors: InformationColor[]
}

export function PickerColor({ addColor, listColors }: PickerColorProps) {
  const { setColor: getColor } = useContext(ColorContext)

  const [color, setColor] = useState({
    color: 359,
    saturation: 100,
    light: 0,
    dark: 50,
    alpha: 1,
  })

  useEffect(() => {
    const newColor: InformationColor = {
      hue: color.color,
      saturation: color.saturation,
      lightness: color.light + color.dark,
      alpha: color.alpha,
      color: `hsla(${color.color}, ${color.saturation}%, ${
        color.light + color.dark
      }%, ${color.alpha})`,
    }
    getColor(newColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color])

  function handleAddColor() {
    const indexColor = listColors.findIndex(value => {
      if (
        value.hue === color.color &&
        value.saturation === color.saturation &&
        value.lightness === color.light + color.dark &&
        value.alpha === color.alpha
      ) {
        return value
      }
    })
    indexColor < 0 &&
      addColor(value => [
        ...value,
        {
          id: crypto.randomUUID(),
          hue: color.color,
          saturation: color.saturation,
          lightness: color.light + color.dark,
          alpha: 1,
          color: `hsl(${color.color}, ${color.saturation}%, ${
            color.light + color.dark
          }%)`,
        },
      ])
  }

  return (
    <div className={css.pickerColor}>
      <div
        style={{
          background: `hsl(${color.color}, ${color.saturation}%, ${
            color.light + color.dark
          }%)`,
        }}
        className={css.colorSwatch}
      ></div>
      <RangeColor modifyColor={setColor} />
      <RangeLightness modifyColor={setColor} infoColor={color} />
      <RangeSaturation modifyColor={setColor} infoColor={color} />
      <OutputColor infoColor={color} />
      <button className={css.addColor} onClick={handleAddColor}>
        <AddIcon />
      </button>
    </div>
  )
}
