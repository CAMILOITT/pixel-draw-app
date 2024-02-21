import { Meta, StoryObj } from '@storybook/react'
import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'v1/UI/Select',
  component: Select,
  args: {
    children: (
      <>
        <option value="1">uno</option>
        <option value="2">dos</option>
        <option value="3">tres</option>
      </>
    ),
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {}
