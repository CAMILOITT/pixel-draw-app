import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import ColorsSelected from './ColorsSelected'
import css from './ColorsSelected.module.css'

const meta: Meta<typeof ColorsSelected> = {
  title: 'v1/ui/ColorsSelected',
  component: ColorsSelected,
  parameters: {
    layout: 'centered',
    style: { position: 'relative' },
  },
  play: async ({ canvasElement, step }) => {
    const { getByRole, findByRole } = within(canvasElement)
    const panelPrimary = getByRole('colorPanelPrimary')
    const panelSecondary = getByRole('colorPanelSecondary')

    await expect(panelPrimary).toBeInTheDocument()
    await expect(panelSecondary).toBeInTheDocument()

    await step('cambiando al color secundario', async () => {
      await userEvent.click(panelSecondary)
      await expect(panelSecondary).toHaveClass(css.colorChangeSecondary)
      await expect(panelPrimary).toHaveClass(css.colorChangePrimary)

      await waitFor(async () => {
        await expect(panelPrimary).toHaveClass(css.colorDesactive)
        await expect(panelSecondary).toHaveClass(css.colorActive)
      })
    })

    await step(' cambiar al color secundario por segunda vez', async () => {
      await userEvent.click(panelSecondary)
      await expect(panelSecondary).not.toHaveClass(css.colorChangeSecondary)
      await expect(panelPrimary).not.toHaveClass(css.colorChangePrimary)
    })

    await step('cambiando al color primario', async () => {
      await userEvent.click(panelPrimary)

      await expect(panelSecondary).toHaveClass(css.colorChangeSecondary)
      await expect(panelPrimary).toHaveClass(css.colorChangePrimary)

      await waitFor(async () => {
        const panelPrimary = await findByRole('colorPanelPrimary')
        await expect(panelPrimary).toHaveClass(css.colorActive)
        await expect(panelSecondary).toHaveClass(css.colorDesactive)
      })
    })
  },
  decorators: [
    Story => {
      return (
        <div
          style={{
            position: 'relative',
            height: '50px',
            width: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Story />
          {/* <ColorContext.Provider value={Context} children={<Story />} /> */}
        </div>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof ColorsSelected>

export const Default: Story = {}
