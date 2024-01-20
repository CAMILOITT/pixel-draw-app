import { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Default',
  component: Modal,
  args: {},
  
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {},
}
