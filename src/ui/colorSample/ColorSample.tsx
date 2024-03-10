import Button from '@ui/button/Button'
import { useContext, useRef } from 'react'
import { ColorContext } from '../../context/state/color/Color'
import { ListInfoColor } from '../../types/color/interface'
import css from './ColorSample.module.css'

interface ColorSampleProps {
  color: ListInfoColor
  setRecentColors: React.Dispatch<React.SetStateAction<ListInfoColor[]>>
}

export default function ColorSample({
  color,
  setRecentColors,
}: ColorSampleProps) {
  const { setColor } = useContext(ColorContext)

  const RemoveColor = useRef<HTMLButtonElement | null>(null)

  function visibilityButton(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    e.preventDefault()
    const child = e.currentTarget.firstElementChild as HTMLButtonElement
    child.style.display = 'block'
    child.focus()
  }

  function hiddenBtn(e: React.FocusEvent<HTMLButtonElement, Element>) {
    e.currentTarget.style.display = 'none'
  }

  function deleteColor(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    const parent = e.currentTarget.parentElement
    if (!parent) return
    const { id } = parent.dataset
    setRecentColors(prevValue => prevValue.filter(color => color.id !== id))
  }

  return (
    <li
      className={css.color}
      style={{
        background: `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`,
      }}
      data-id={color.id}
      data-value-color={color}
      onClick={() => setColor(color)}
      onContextMenu={visibilityButton}
    >
      <Button
        ref={RemoveColor}
        onClick={deleteColor}
        type="button"
        onBlur={hiddenBtn}
        tabIndex={1}
        children="Delete"
        className={css.deleteColor}
      />
    </li>
  )
}
