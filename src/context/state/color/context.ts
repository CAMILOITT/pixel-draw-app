import {
  ColorContext,
  InformationColor,
  InformationColors,
} from '../../../types/color/interface'
import { ColorType } from '../../../types/color/type'

const ColorPrimary: Omit<InformationColor, 'color'> = {
  hue: 0,
  saturation: 100,
  lightness: 50,
  alpha: 1,
}
const ColorSecondary: Omit<InformationColor, 'color'> = {
  hue: 0,
  saturation: 100,
  lightness: 50,
  alpha: 1,
}

const InitialColorsPrimary: InformationColor = {
  ...ColorPrimary,
  color: `hsla(${ColorPrimary.hue}, ${ColorPrimary.saturation}%, ${ColorPrimary.lightness}%, ${ColorPrimary.alpha})`,
}

const InitialColorsSecondary: InformationColor = {
  ...ColorSecondary,
  color: `hsla(${ColorSecondary.hue}, ${ColorSecondary.saturation}%, ${ColorSecondary.lightness}%, ${ColorSecondary.alpha})`,
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
