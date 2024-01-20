import { Meta, StoryObj } from '@storybook/react'
import ConfigDownload from './ConfigDownload'

const meta: Meta<typeof ConfigDownload> = {
  title: 'Components/ConfigDownload',
  component: ConfigDownload,
  args: {},
}

export default meta

type Story = StoryObj<typeof ConfigDownload>

export const Default: Story = {
  args: {},
}
