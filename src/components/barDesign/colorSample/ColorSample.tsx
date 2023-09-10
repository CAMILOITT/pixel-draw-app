import { useContext, useRef } from 'react'
import { ColorContext } from '../../../context/state/color/Color'
import { ListInfoColor } from '../../../types/color/interface'
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
      style={{ background: color.color }}
      data-id={color.id}
      data-value-color={color}
      onClick={() => setColor(color)}
      onContextMenu={visibilityButton}
    >
      <button
        className={css.deleteColor}
        onClick={deleteColor}
        type="button"
        ref={RemoveColor}
        onBlur={hiddenBtn}
        tabIndex={1}
      >
        Delete
      </button>
    </li>
  )
}
