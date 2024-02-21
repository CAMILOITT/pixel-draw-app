import { expect, jest } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import OutputColor from './OutputColor'

const meta: Meta<typeof OutputColor> = {
  title: 'v1/UI/OutputColor',
  component: OutputColor,
  args: { infoColor: { alpha: 1, hue: 20, lightness: 50, saturation: 50 } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const colorSelector = canvas.getByRole('ColorSelectorBox')

    await step(
      'verificando que los componentes estén renderizados',
      async () => {
        await expect(colorSelector).toBeInTheDocument()
        await expect(colorSelector).toHaveTextContent('hsla(20, 50%, 50%, 1)')
      }
    )

    await step('verificando que el color se copie correctamente', async () => {
      const clipboardSpy = jest.spyOn(navigator.clipboard, 'writeText')
      clipboardSpy.mockImplementation(() => Promise.resolve())
      await userEvent.click(colorSelector)
      await expect(clipboardSpy).toHaveBeenCalledWith('hsla(20, 50%, 50%, 1)')
      await expect(clipboardSpy).not.toHaveBeenCalledWith('')
      clipboardSpy.mockRestore()
    })
  },
}

export default meta

type Story = StoryObj<typeof OutputColor>

export const Default: Story = {}
