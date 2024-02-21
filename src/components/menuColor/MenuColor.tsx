import ListColors from '@components/listColors/ListColors'
import Button from '@ui/button/Button'
import { useContext, useState } from 'react'
import { ColorContext } from '../../context/state/color/Color'
import { PickerColor } from '../pickerColor/PickerColor'
import css from './MenuColor.module.css'

interface BarDesignProps {}

export default function MenuColor({}: BarDesignProps) {
  const [openBar, setOpenBar] = useState(true)
  const { colors, setColor } = useContext(ColorContext)

  return (
    <div
      className={`${css.barDesign} ${
        openBar ? css.barDesignOpen : css.barDesignClose
      }`}
      role="menuColor"
    >
      <Button
        className={css.closeMenu}
        onClick={() => setOpenBar(value => !value)}
        children="color"
      />
      <PickerColor colors={colors} setColor={setColor} />
      <ListColors colors={colors} />
    </div>
  )
}
