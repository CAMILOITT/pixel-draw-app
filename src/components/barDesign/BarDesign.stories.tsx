import { Meta, StoryObj } from '@storybook/react'
import BarDesign from './BarDesign'

const meta: Meta<typeof BarDesign> = {
  title: 'Components/BarDesign',
  component: BarDesign,
  args: {},
}

export default meta

type Story = StoryObj<typeof BarDesign>

export const Default: Story = {
  args: {},
}
