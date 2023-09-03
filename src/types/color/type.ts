/**
 * Information about the color that is selected to paint
 */
export type ColorType = 'colorPrimary' | 'colorSecondary'

/**
 * animation states when changing the selected color from the main color to the secondary color and vice versa
 * @type { string } statusTransitionColor
 */
export type StatusTransitionColor =
  | 'colorActive'
  | 'colorDesactive'
  | 'colorChangePrimary'
  | 'colorChangeSecondary'
