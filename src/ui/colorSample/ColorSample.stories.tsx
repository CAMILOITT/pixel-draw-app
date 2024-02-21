import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { fireEvent, userEvent, within } from '@storybook/testing-library'
import ColorSample from './ColorSample'

const meta: Meta<typeof ColorSample> = {
  title: 'v1/ui/ColorSample',
  component: ColorSample,
  parameters: { layout: 'centered' },
  args: {
    color: {
      id: '1',
      hue: 45,
      saturation: 60,
      lightness: 80,
      alpha: 1,
    },
    setRecentColors: color => color,
  },
  argTypes: {
    setRecentColors: {
      type: 'function',
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const itemList = canvas.getByRole('listitem')
    await step(
      'verificando que los componentes estén renderizados',
      async () => {
        await expect(itemList).toBeInTheDocument()

        await step('verificando que el botón se muestre', async () => {
          fireEvent.contextMenu(itemList)
          const button = await canvas.findByRole('button')
          await expect(button).toBeInTheDocument()
          await expect(button).toHaveStyle('display: block')
        })

        await step('verificando que el botón esté oculto', async () => {
          const button = await canvas.findByRole('button')
          await userEvent.click(itemList)
          await expect(button).toHaveStyle('display: none')
        })
      }
    )
  },
}

export default meta

type Story = StoryObj<typeof ColorSample>

export const Default: Story = {}
