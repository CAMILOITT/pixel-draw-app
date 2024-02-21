import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { fireEvent, within } from '@storybook/testing-library'
import { Color } from '@utils/color'
import { useState } from 'react'
import { InformationColor } from 'src/types/color/enums'
import { PickerColor } from './PickerColor'

const meta: Meta<typeof PickerColor> = {
  title: 'v1/Components/PickerColor',
  component: PickerColor,
  args: {
    /** valores del componente */
    colors: {
      colorPrimary: { alpha: 1, hue: 50, lightness: 50, saturation: 50 },
      colorSecondary: { alpha: 1, hue: 50, lightness: 50, saturation: 50 },
      colorFocus: 'colorPrimary',
    },
    setColor: color => color,
  },
  argTypes: {
    setColor: { control: { type: '' } },
    colors: {
      control: {
        type: 'object',
      },
      table: {
        type: {
          summary: 'ColorProps', // Aquí puedes documentar el tipo del objeto colors
        },
      },
    },
  },

  play: async ({ canvasElement, step,  }) => {
    const canvas = within(canvasElement)
    const selectBox = canvas.getByRole('ColorSelectorBox')
    const hue = canvas.getByRole('sliderHue')
    const saturation = canvas.getByRole('sliderSaturation')
    const lightness = canvas.getByRole('sliderLightness')
    const alpha = canvas.getByRole('sliderAlpha')

    await step(
      'verificando que los componentes estén renderizados',
      async () => {
        await expect(selectBox).toBeInTheDocument()
        await expect(hue).toBeInTheDocument()
        await expect(saturation).toBeInTheDocument()
        await expect(lightness).toBeInTheDocument()
        await expect(alpha).toBeInTheDocument()

        await step('cambiando de valor del colores', async () => {
          const valueInitial = Color.getDataHsla(
            selectBox.textContent as string
          ) as [number, number, number, number]
          await expect(selectBox).toHaveTextContent(
            `hsla(${valueInitial[0]}, ${valueInitial[1]}%, ${valueInitial[2]}%, ${valueInitial[3]})`
          )
          await expect(hue).toHaveValue(valueInitial[0].toString())
          await expect(saturation).toHaveValue(valueInitial[1].toString())
          await expect(lightness).toHaveValue(valueInitial[2].toString())
          await expect(alpha).toHaveValue(valueInitial[3].toString())

          fireEvent.change(hue, { target: { value: 20 } })
          fireEvent.change(saturation, { target: { value: 50 } })
          fireEvent.change(lightness, { target: { value: 50 } })
          fireEvent.change(alpha, { target: { value: 0.5 } })

          const valueChanged = Color.getDataHsla(
            selectBox.textContent as string
          ) as [number, number, number, number]
          expect(selectBox).toHaveTextContent(
            `hsla(${valueChanged[0]}, ${valueChanged[1]}%, ${valueChanged[2]}%, ${valueChanged[3]})`
          )
          expect(hue).toHaveValue(valueChanged[0].toString())
          expect(saturation).toHaveValue(valueChanged[1].toString())
          expect(lightness).toHaveValue(valueChanged[2].toString())
          expect(alpha).toHaveValue(valueChanged[3].toString())
        })
      }
    )
  },

  render: function Render({ colors }) {
    const [color, setColors] = useState(colors)

    function setColor(color: InformationColor) {
      colors.colorFocus === 'colorPrimary'
        ? setColors(prevValue => {
            return { ...prevValue, colorPrimary: color }
          })
        : setColors(prevValue => {
            return { ...prevValue, colorSecondary: color }
          })
    }

    return <PickerColor colors={color} setColor={setColor} />
  },
}

export default meta

type Story = StoryObj<typeof PickerColor>

export const Default: Story = {
  args: {},
}
