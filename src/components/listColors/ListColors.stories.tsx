import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { fireEvent, within } from '@storybook/testing-library'
import ListColors from './ListColors'

const meta: Meta<typeof ListColors> = {
  title: 'v1/Components/ListColors',
  component: ListColors,
  args: {
    colors: {
      colorPrimary: { alpha: 1, hue: 0, lightness: 50, saturation: 50 },
      colorSecondary: { alpha: 1, hue: 0, lightness: 50, saturation: 50 },
      colorFocus: 'colorPrimary',
    },
  },
  play: async ({ canvasElement, step }) => {
    const { findByRole, getByRole, findByText } = within(canvasElement)
    let listColors = getByRole('list')
    const itemColor = await findByRole('listitem')
    const btnAddColor = getByRole('addColor')

    await step(
      'verificando que los componentes estén renderizados',
      async () => {
        await expect(listColors).toBeInTheDocument()
        await expect(itemColor).toBeInTheDocument()
        await expect(btnAddColor).toBeInTheDocument()
        await expect(listColors.childElementCount).toBe(1)
      }
    )

    await step(
      'no añade color por que ya existe otro color con los mismos valores',
      async () => {
        fireEvent.click(btnAddColor)
        listColors = await findByRole('list')
        await expect(listColors.children.length).toBe(1)
      }
    )
    await step('eliminando el primer color de la lista', async () => {
      fireEvent.contextMenu(itemColor)
      const btnDelete = await findByText(/delete/i)
      await expect(btnDelete).toBeInTheDocument()
      fireEvent.click(btnDelete)
      listColors = await findByRole('list')
      await expect(listColors.children.length).toBe(0)
    })
    await step('añadiendo un color a la lista', async () => {
      fireEvent.click(btnAddColor)
      listColors = await findByRole('list')
      await expect(listColors.children.length).toBe(1)
    })
  },
}

export default meta

type Story = StoryObj<typeof ListColors>

export const Default: Story = {
  args: {},
}
