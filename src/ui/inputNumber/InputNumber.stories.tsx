import { Meta, StoryObj } from '@storybook/react'
import InputNumber from './InputNumber'

const meta: Meta<typeof InputNumber> = {
  title: 'v1/UI/InputNumber',
  component: InputNumber,
  args: {
    value: 0,
  },
}

export default meta

type Story = StoryObj<typeof InputNumber>

export const Default: Story = {}
