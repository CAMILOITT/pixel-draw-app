import { InformationColor } from '../../../types/color/enums'
import {
  ColorContext,
  InformationColorChange,
} from '../../../types/color/interface'

const ColorPrimary: InformationColor = {
  hue: 0,
  saturation: 100,
  lightness: 50,
  alpha: 1,
}

const ColorSecondary: InformationColor = {
  hue: 0,
  saturation: 100,
  lightness: 50,
  alpha: 1,
}

export const InitialColors: InformationColorChange = {
  colorPrimary: ColorPrimary,
  colorSecondary: ColorSecondary,
  colorFocus: 'colorPrimary',
}

export const Context: ColorContext = {
  colors: InitialColors,
  setColor: color => color,
  setColorFocus: focus => focus,
}
