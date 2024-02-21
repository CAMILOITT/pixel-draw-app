import { Meta, StoryObj } from '@storybook/react'
import Range from './Range'

const meta: Meta<typeof Range> = {
  title: 'v1/UI/Range',
  component: Range,
  args: {},
}

export default meta

type Story = StoryObj<typeof Range>

export const Default: Story = {}
