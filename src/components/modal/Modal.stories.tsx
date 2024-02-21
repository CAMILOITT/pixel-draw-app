import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import Modal, { ModalRef } from './Modal'
import { useRef } from 'react'
import Button from '@ui/button/Button'

const meta: Meta<typeof Modal> = {
  title: 'v1/components/modal',
  component: Modal,
  args: {
    children: 'este es el contenido de un modal',
    ref: {
      current: {
        open() {},
        close() {},
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const { getByRole, findByRole } = within(canvasElement)

    await step('abriendo el modal', async () => {
      const btnOpen = getByRole('button')
      await userEvent.click(btnOpen)
      const dialog = await findByRole('dialog')
      await expect(dialog).toBeInTheDocument()
    })
    await step('cerrando el modal', async () => {
      const btnClose = getByRole('closeDialog')
      await userEvent.click(btnClose)
      const dialog = canvasElement.querySelector('dialog')
      await expect(dialog)
    })
  },
  render: function Render(storyArgs) {
    const RefModal = useRef<ModalRef | null>(null)

    function open() {
      if (!RefModal.current) return
      RefModal.current?.open()
    }

    return (
      <div>
        <Button onClick={open} children="open modal" />
        <Modal ref={RefModal} children={storyArgs.children}  />
      </div>
    )
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {},
}
