import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { createEvent, fireEvent, within } from '@storybook/testing-library'
import LayerPixel from './LayerPixel'

type Story = StoryObj<typeof LayerPixel>

const meta: Meta<typeof LayerPixel> = {
  title: 'v1/Components/LayerPixel',
  component: LayerPixel,
  args: {},
  render: function Render() {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <LayerPixel />
      </div>
    )
  },
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement)
    const layerDrawing = getByRole('layerDrawing')
    const layerMouse = getByRole('layerMouse')
    await expect(layerDrawing).toBeInTheDocument()
    await expect(layerMouse).toBeInTheDocument()

    const { left, top } = layerMouse.getBoundingClientRect()

    fireEvent(
      layerMouse,
      createEvent.mouseDown(layerMouse, {
        clientX: left + 100,
        clientY: top + 100,
      })
    )
    for (let i = 100; i < 150; i += 5) {
      fireEvent(
        layerMouse,
        createEvent.mouseMove(layerMouse, {
          clientX: i,
          clientY: i,
        })
      )
    }
    fireEvent(
      layerMouse,
      createEvent.mouseUp(layerMouse, {
        clientX: 200,
        clientY: 200,
      })
    )
  },
}
export default meta

export const Layer: Story = {}
