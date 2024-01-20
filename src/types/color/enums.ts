/**
 * canvas information in hsla format
 * @interface InfoColor
 * @prop {number} color - color value represents color hue
 * @prop {number} saturation - color saturation
 * @prop {number} light - color luminance
 * @prop {number} dark - color darkness
 * @prop {number | null} alpha - color opacity
 */
export interface InfoColor {
  /** color value represents color hue */
  hue: number
  /** color saturation */
  saturation: number
  /** color luminance */
  lightness: number
  /** color opacity */
  alpha: number
}

/** event values to change color
 * @interface UIInfoColor
 * @prop {number} clientX - is the mouse position value on the element
 * @prop {number} left - element position value from the right
 * @prop {number} widthParentPicker - element's parent value
 */
export interface UIInfoColor {
  /** is the mouse position value on the element */
  clientX: number
  /** element position value from the right */
  left: number
  /** element's parent value */
  widthParentPicker: number
}
