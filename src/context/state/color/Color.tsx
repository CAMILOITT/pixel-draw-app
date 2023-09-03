import { createContext, useState } from 'react'
import { Context, InitialColors } from './context'
import { ColorType } from '../../../types/color/type'
import { InformationColor } from '../../../types/color/interface'

export const ColorContext = createContext(Context)

interface ColorProviderProps {
  children: React.ReactNode
}

export function ColorProvider({ children }: ColorProviderProps) {
  const [colors, setColors] = useState(InitialColors)

  function setColor(color: InformationColor) {
    colors.colorFocus === 'colorPrimary'
      ? setColors(prevValue => {
          return { ...prevValue, colorPrimary: color }
        })
      : setColors(prevValue => {
          return { ...prevValue, colorSecondary: color }
        })
  }

  function setColorFocus(focus: ColorType) {
    focus === 'colorPrimary'
      ? setColors(prevValue => {
          return { ...prevValue, colorFocus: 'colorPrimary' }
        })
      : setColors(prevValue => {
          return { ...prevValue, colorFocus: 'colorSecondary' }
        })
  }

  const data = {
    colors,
    setColor,
    setColorFocus,
  }
  return <ColorContext.Provider value={data}>{children}</ColorContext.Provider>
}
