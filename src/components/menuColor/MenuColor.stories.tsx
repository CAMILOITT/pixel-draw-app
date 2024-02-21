import { Meta, StoryObj } from '@storybook/react'
import MenuColor from './MenuColor'
import { fireEvent, userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import css from './MenuColor.module.css'
/** menu en donde puedes escoger el color de la herramienta del pincel */
const meta: Meta<typeof MenuColor> = {
  title: 'v1/Components/MenuColor',
  component: MenuColor,
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const menuColor = await canvas.findByRole('menuColor')
    const btn = canvas.getByText('color')
    const pickerColor = canvas.getByRole('pickerColor')
    const listColors = canvas.getByRole('listColor')

    await step(
      'verificando que los componentes estén renderizados',
      async () => {
        await expect(menuColor).toBeInTheDocument()
        await expect(btn).toBeInTheDocument()
        await expect(pickerColor).toBeInTheDocument()
        await expect(listColors).toBeInTheDocument()
      }
    )

    await step('cerrando el menu', async () => {
      const menuColor = await canvas.findByRole('menuColor')
      await userEvent.click(btn)
      await expect(menuColor).toHaveClass(css.barDesignClose)
    })

    await step('open el menu', async () => {
      const menuColor = await canvas.findByRole('menuColor')
      await userEvent.click(btn)
      await expect(menuColor).toHaveClass(css.barDesignOpen)
    })

    await step('interactuando con el menu', async () => {
      const menuColor = await canvas.findByRole('menuColor')
      const listColors = canvas.getByRole('list')
      const hue = canvas.getByRole('sliderHue')
      const saturation = canvas.getByRole('sliderSaturation')
      const lightness = canvas.getByRole('sliderLightness')
      const alpha = canvas.getByRole('sliderAlpha')
      const btnAddColor = canvas.getByRole('addColor')

      await expect(menuColor).toHaveClass(css.barDesignOpen)
      await expect(listColors.childElementCount).toBe(1)
      await expect(hue).toBeInTheDocument()
      await expect(saturation).toBeInTheDocument()
      await expect(lightness).toBeInTheDocument()
      await expect(alpha).toBeInTheDocument()
      await expect(btnAddColor).toBeInTheDocument()

      await step('cambiando colores', async () => {
        const newColor = {
          hue: 20,
          saturation: 20,
          lightness: 20,
          alpha: 1,
        }

        fireEvent.change(hue, { target: { value: newColor.hue } })
        fireEvent.change(saturation, { target: { value: newColor.saturation } })
        fireEvent.change(lightness, { target: { value: newColor.lightness } })
        fireEvent.change(alpha, { target: { value: newColor.alpha } })
        await expect(hue).toHaveValue(`${newColor.hue}`)
        await expect(saturation).toHaveValue(`${newColor.saturation}`)
        await expect(lightness).toHaveValue(`${newColor.lightness}`)
        await expect(alpha).toHaveValue(`${newColor.alpha}`)
      })

      await step('añadiendo un color', async () => {
        await userEvent.click(btnAddColor)
        await expect(listColors.childElementCount).toBe(2)
      })

      await step('añadiendo un color repetido', async () => {
        await userEvent.click(btnAddColor)
        await expect(listColors.childElementCount).toBe(2)
      })

      await step('eliminando color', async () => {
        const colorItems = await canvas.findAllByRole('listitem')
        fireEvent.contextMenu(colorItems[0])
        const [btnDeleteColor] = await canvas.findAllByText(/delete/i)
        await userEvent.click(btnDeleteColor)
        await expect(listColors.childElementCount).toBe(1)
      })
    })
  },
}

export default meta

type Story = StoryObj<typeof MenuColor>

export const Default: Story = {}
