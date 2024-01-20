import { Meta, StoryObj } from '@storybook/react'
import LayerPixel from './LayerPixel'

type Story = StoryObj<typeof LayerPixel>

export default {
  title: 'Components/LayerPixel',
  component: LayerPixel,
  args: {},
  argTypes: {
    width: {
      option: ['brush', 'eraser', 'other'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof LayerPixel>


export const Layer: Story = {
  args: {},
}
