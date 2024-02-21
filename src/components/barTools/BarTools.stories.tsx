import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import BarTools from './BarTools'
import css from './BarTools.module.css'
const meta: Meta<typeof BarTools> = {
  title: 'v1/Components/BarTools',
  component: BarTools,
  args: {},
  play: async ({ canvasElement, step }) => {
    const { getByRole } = within(canvasElement)
    const btnCloseOpen = getByRole('closeMenu')
    const menuTools = getByRole('menuTools')
    const btnConfigCanvas = getByRole('openConfigCanvas')
    const btnConfigDownload = getByRole('openConfigDownload')

    await expect(btnCloseOpen).toBeInTheDocument()

    await step('cerrando el menu de herramientas', async () => {
      await userEvent.click(btnCloseOpen)
      await expect(menuTools).toHaveClass(css.menuClose)
    })

    await step('abriendo el menu de herramientas', async () => {
      await userEvent.click(btnCloseOpen)
      await expect(menuTools).toHaveClass(css.menuOpen)
    })

    await step('abriendo y cerrando configuración del canvas', async () => {
      await userEvent.click(btnConfigCanvas)
      const configCanvas = getByRole('configCanvas')
      await expect(configCanvas).toBeInTheDocument()
      const closeDialog = getByRole('closeDialog')
      await userEvent.click(closeDialog)
      await expect(configCanvas).toHaveStyle('display: none')
    })

    await step('abriendo y cerrando configuración de descarga', async () => {
      await userEvent.click(btnConfigDownload)
      const configDownload = getByRole('configDownload')
      await expect(configDownload).toBeInTheDocument()
      const closeDialog = getByRole('closeDialog')
      await userEvent.click(closeDialog)
      await expect(configDownload).toHaveStyle('display: none')
    })
  },
  render: function Render() {
    return (
      <div id="root">
        <BarTools />
      </div>
    )
  },
}

export default meta

type Story = StoryObj<typeof BarTools>

export const Default: Story = {
  args: {},
}
