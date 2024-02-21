import { Color } from '@utils/color'
import { useContext, useEffect, useState } from 'react'
import { ColorContext } from '../../context/state/color/Color'
import { StatusTransitionColor } from '../../types/color/type'
import css from './ColorsSelected.module.css'

interface ColorsSelectedProps {}

export default function ColorsSelected({}: ColorsSelectedProps) {
  const { setColorFocus, colors } = useContext(ColorContext)

  const [statusColorPrimary, setStatusColorPrimary] =
    useState<StatusTransitionColor>('colorActive')
  const [statusColorSecondary, setStatusColorSecondary] =
    useState<StatusTransitionColor>('colorDesactive')

  useEffect(() => {
    setStatusColorPrimary('colorChangePrimary')
    setStatusColorSecondary('colorChangeSecondary')
    const timeOut = 250
    let idTimeOut: unknown

    if (colors.colorFocus === 'colorPrimary') {
      idTimeOut = setTimeout(() => {
        setStatusColorPrimary('colorActive')
        setStatusColorSecondary('colorDesactive')
      }, timeOut)
    }
    if (colors.colorFocus === 'colorSecondary') {
      idTimeOut = setTimeout(() => {
        setStatusColorPrimary('colorDesactive')
        setStatusColorSecondary('colorActive')
      }, timeOut)
    }
    return () => {
      if (!idTimeOut) return
      clearTimeout(idTimeOut as number)
    }
  }, [colors.colorFocus])

  function handleSelectColor(e: React.MouseEvent<HTMLDivElement>) {
    const { color, colorSelect } = e.currentTarget.dataset
    if (colors.colorFocus === colorSelect) return
    if (colorSelect === 'colorPrimary' || colorSelect === 'colorSecondary')
      setColorFocus(colorSelect)
    if (!color) return
  }

  return (
    <>
      <div
        data-color={Color.convertDataToString(colors.colorPrimary)}
        data-color-select="colorPrimary"
        style={{ background: Color.convertDataToString(colors.colorPrimary) }}
        onClick={handleSelectColor}
        className={`${css.colorPrimary} ${css[statusColorPrimary]} `}
        role="colorPanelPrimary"
      ></div>
      <div
        data-color={Color.convertDataToString(colors.colorSecondary)}
        data-color-select="colorSecondary"
        style={{ background: Color.convertDataToString(colors.colorSecondary) }}
        onClick={handleSelectColor}
        className={` ${css.colorSecondary} ${css[statusColorSecondary]} `}
        role="colorPanelSecondary"
      ></div>
    </>
  )
}
