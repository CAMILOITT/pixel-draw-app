import { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'v1/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { children: 'soy un botón' },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Secondary: Story = {
  args: { style: { backgroundColor: '#0099ff' } },
}

export const ButtonHover: Story = {}
