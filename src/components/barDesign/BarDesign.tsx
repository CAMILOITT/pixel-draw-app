import { useContext, useState } from 'react'
import { ColorContext } from '../../context/state/color/Color'
import { ListInfoColor } from '../../types/color/interface'
import { PickerColor } from '../pickerColor/PickerColor'
import css from './BarDesign.module.css'
import ColorSample from './colorSample/ColorSample'

interface BarDesignProps {}

export default function BarDesign({}: BarDesignProps) {
  const { colors } = useContext(ColorContext)

  const [recentColors, setRecentColors] = useState<ListInfoColor[]>([
    { ...colors.colorPrimary, id: crypto.randomUUID() },
  ])

  const [openBar, setOpenBar] = useState(true)

  return (
    <div
      className={`${css.barDesign} ${
        openBar ? css.barDesignOpen : css.barDesignClose
      }`}
    >
      <button
        className={css.closeMenu}
        onClick={() => setOpenBar(value => !value)}
      >
        color
      </button>
      <PickerColor addColor={setRecentColors} listColors={recentColors} />
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
