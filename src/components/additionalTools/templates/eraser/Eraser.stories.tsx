import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { fireEvent, userEvent, within } from '@storybook/testing-library'
import Eraser from './Eraser'

export default {
  title: 'v1/Components/AdditionalTools/Templates/Eraser',
  component: Eraser,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const spinSize = await canvas.findByRole('spinbutton')

    await step(
      'verificando que los componentes estén renderizados',
      async () => {
        await expect(spinSize).toBeInTheDocument()

        await step('cambiando los valores del tamaño del pincel', async () => {
          const newValue = 10
          fireEvent.change(spinSize, { target: { value: newValue } })
          await expect(spinSize).toHaveValue(newValue)
          await expect(spinSize).not.toHaveValue(20)
          await userEvent.click(spinSize)
          await userEvent.keyboard('13{enter}')
          await expect(spinSize).toHaveValue(13)
          await userEvent.click(spinSize)
          await userEvent.keyboard('20{enter}')
          await expect(spinSize).toHaveValue(20)
          await userEvent.click(spinSize)
          await userEvent.keyboard('90{enter}')
          await expect(spinSize).toHaveValue(9)
        })
      }
    )
  },
} satisfies Meta<typeof Eraser>

type Story = StoryObj<typeof Eraser>

export const EraserSettings: Story = {
  args: {},
}
