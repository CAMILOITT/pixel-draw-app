import {
  ColorContext,
  InformationColor,
  InformationColors,
} from '../../../types/color/interface'
import { ColorType } from '../../../types/color/type'

const InitialColorsPrimary: InformationColor = {
  hue: 0,
  saturation: 100,
  lightness: 50,
  alpha: 1,
  color: 'hsla(360, 100%, 50%, 1)',
}

const InitialColorsSecondary: InformationColor = {
  hue: 0,
  saturation: 100,
  lightness: 50,
  alpha: 1,
  color: 'hsla(20, 100%, 50%, 1)',
}

export const InitialColors: InformationColors = {
  colorPrimary: InitialColorsPrimary,
  colorSecondary: InitialColorsSecondary,
  colorFocus: 'colorPrimary',
}

export const Context: ColorContext = {
  colors: InitialColors,
  setColor: (color: InformationColor) => color,
  setColorFocus: (focus: ColorType) => focus,
}
