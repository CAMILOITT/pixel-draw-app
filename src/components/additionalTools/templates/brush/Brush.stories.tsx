import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { fireEvent, within } from '@storybook/testing-library'
import { ShapesBrush } from '../../../../types/brush/enum'
import Brush from './Brush'

const meta: Meta<typeof Brush> = {
  title: 'v1/Components/AdditionalTools/Templates/Brush',
  component: Brush,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step(
      'verificando que los componentes de la figura del pincel "cuadrado" estén renderizados',
      async () => {
        const select = canvas.getByRole('combobox')
        const spinWidth = canvas.getByRole('spinbutton')
        await expect(select).toBeInTheDocument()
        await expect(spinWidth).toBeInTheDocument()
        await step('cambiando los valores del tamaño del pincel', async () => {
          const spinSize = canvas.getByRole('spinbutton')
          const newValue = 20
          fireEvent.change(spinSize, { target: { value: newValue } })
          expect(spinSize).toHaveValue(newValue)
        })
      }
    )

    await step(
      'verificando que los componentes de la figura del pincel "rectángulo" estén renderizados',
      async () => {
        const select = canvas.getByRole('combobox')
        fireEvent.change(select, { target: { value: ShapesBrush.rectangle } })
        const [spinWidth, spinHeight] = await canvas.findAllByRole('spinbutton')
        await expect(select).toBeInTheDocument()
        await expect(spinWidth).toBeInTheDocument()
        await expect(spinHeight).toBeInTheDocument()
        await step(
          'cambiando los valores del ancho y alto del pincel',
          async () => {
            const newValueWidth = 20
            const newValueHeight = 50
            fireEvent.change(spinWidth, { target: { value: newValueWidth } })
            fireEvent.change(spinHeight, { target: { value: newValueHeight } })
            expect(spinWidth).toHaveValue(newValueWidth)
            expect(spinHeight).toHaveValue(newValueHeight)
          }
        )
      }
    )
  },
}
export default meta

type Story = StoryObj<typeof Brush>

export const BrushSettings: Story = {
  args: {},
}
