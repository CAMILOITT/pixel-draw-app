import { Meta, StoryObj } from '@storybook/react'
import JoinRoom from './JoinRoom'

const meta: Meta<typeof JoinRoom> = {
  title: 'Page/JoinRoom',
  component: JoinRoom,
  args: {},
}

export default meta

type Story = StoryObj<typeof JoinRoom>

export const Default: Story = {
  args: {},
}
