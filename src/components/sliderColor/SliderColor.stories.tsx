import { Meta, StoryObj } from '@storybook/react'
import SliderColor from './SliderColor'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const color = {
  hue: 0,
  saturation: 100,
  lightness: 50,
}

const meta: Meta<typeof SliderColor> = {
  title: 'v1/UI/SliderColor',
  component: SliderColor,
  args: {},
  parameters: { layout: 'centered' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    await expect(slider).toBeInTheDocument()
  },
}

export default meta

type Story = StoryObj<typeof SliderColor>

export const Default: Story = {}

export const SliderHue: Story = {
  args: {
    style: {
      background: `linear-gradient(to right, hsl(0deg 100% 50%),hsl(90deg 100% 50%), hsl(180deg 100% 50%), hsl(270deg 100% 50%),  hsl(360deg 100% 50%))`,
    },
  },
}
export const SliderSaturation: Story = {
  args: {
    style: {
      background: `linear-gradient(to right, hsl(${color.hue}deg 0% 50%), hsl(${color.hue}deg 100% 50%)`,
    },
  },
}
export const SliderLightness: Story = {
  args: {
    style: {
      background: `linear-gradient(to right, hsl(${color.hue}deg ${color.saturation}% 0%), hsl(${color.hue}deg 100% 50%), hsl(${color.hue}deg ${color.saturation}% 100%))`,
    },
  },
}
export const SliderAlpha: Story = {
  args: {
    style: {
      background: `linear-gradient(to right, transparent, hsl(${color.hue}deg 100% 50%))`,
    },
  },
}
