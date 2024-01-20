import { Meta, StoryObj } from '@storybook/react'
import BarTools from './BarTools'

const meta: Meta<typeof BarTools> = {
  title: 'Components/BarTools',
  component: BarTools,
  args: {},
}

export default meta

type Story = StoryObj<typeof BarTools>

export const Default: Story = {
  args: {},
}
