import { Meta, StoryObj } from '@storybook/react'
import ConfigurationCanvas from './ConfigurationCanvas'
import { fireEvent, userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof ConfigurationCanvas> = {
  title: 'v1/Components/ConfigurationCanvas',
  component: ConfigurationCanvas,
  args: { closeConfigurationCanvas: () => {} },
  argTypes: {
    closeConfigurationCanvas: {
      type: 'function',
    },
  },
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement, step }) => {
    const { findByRole } = within(canvasElement)
    const button = await findByRole('button')
    const check = await findByRole('checkbox')

    await expect(button).toBeInTheDocument()
    await expect(check).toBeInTheDocument()

    await step(
      'abriendo la configuración de color del fondo del canvas',
      async () => {
        await userEvent.click(check)
        await expect(check).toBeChecked()
        const inputColor = await findByRole('boxColor')
        await expect(inputColor).toBeInTheDocument()
        fireEvent.change(inputColor, { target: { value: '#00ff00' } })
        await expect(inputColor).toHaveValue('#00ff00')
      }
    )
  },
}

export default meta

type Story = StoryObj<typeof ConfigurationCanvas>

export const Default: Story = {
  args: {},
}
