import { Meta, StoryObj } from '@storybook/react'
import ConfigurationCanvas from './ConfigurationCanvas'

const meta: Meta<typeof ConfigurationCanvas> = {
  title: 'Components/ConfigurationCanvas',
  component: ConfigurationCanvas,
  args: {},
  parameters:{
    layout: "centered"
  }
}

export default meta

type Story = StoryObj<typeof ConfigurationCanvas>

export const Default: Story = {
  args: {},
}
