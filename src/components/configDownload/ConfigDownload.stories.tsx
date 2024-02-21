import { Meta, StoryObj } from '@storybook/react'
import ConfigDownload from './ConfigDownload'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof ConfigDownload> = {
  title: 'v1/Components/ConfigDownload',
  component: ConfigDownload,
  args: {},
  play: async ({ canvasElement, step }) => {
    const { getByRole } = within(canvasElement)
    const download = getByRole('link')
    const inputName = getByRole('textbox')
    const selectFormat = getByRole('combobox')

    await step(
      'verificando que los componentes esten renderizados',
      async () => {
        await expect(download).toBeInTheDocument()
        await expect(inputName).toBeInTheDocument()
        await expect(selectFormat).toBeInTheDocument()
      }
    )

    await step(
      'cambiando el valor del input del nombre de la imagen',
      async () => {
        await userEvent.click(inputName)
        await userEvent.type(inputName, 'test')
        await expect(inputName).toHaveValue('test')
      }
    )

    await step('cambiando el valor del formato de la imagen', async () => {
      await userEvent.selectOptions(selectFormat, 'img')
      await expect(selectFormat).toHaveValue('img')
    })

    await step ('comprobando que es un link de descarga', async () => {
      await expect(download).toHaveAttribute('download')
    })
  },
}

export default meta

type Story = StoryObj<typeof ConfigDownload>

export const Default: Story = {
  args: {},
}
