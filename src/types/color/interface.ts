import { ColorType } from './type'

export interface ListInfoColor extends InformationColor {
  id: string
}

/**
 * Information about the color
 * @interface InformationColor
 * @prop {number} hue - The hue of the color
 * @prop {number} saturation - The saturation of the color
 * @prop {number} lightness - The lightness of the color
 * @prop {number} alpha - The alpha of the color
 * @prop {string} color - a text string of the color in **hsla** format
 */
export interface InformationColor {
  /** The hue of the color */
  hue: number
  /** The saturation of the color */
  saturation: number
  /** The lightness of the color */
  lightness: number
  /** The alpha of the color */
  alpha: number
  /** A text string of the color in **hsla** format */
  color: string
}

/**
 * Information about the color
 * @interface InformationColor
 * @prop {string} colorPrimary - The primary color
 * @prop {string} colorSecondary - The secondary color
 * @prop {ColorType} colorFocus - The primary color
 */

export interface InformationColors {
  /** color principal */
  colorPrimary: InformationColor
  /** color secondary */
  colorSecondary: InformationColor
  /** color focus */
  colorFocus: ColorType
}

export interface ColorContext {
  colors: InformationColors
  setColor: (color: InformationColor) => void
  setColorFocus: (focus: ColorType) => void
}
