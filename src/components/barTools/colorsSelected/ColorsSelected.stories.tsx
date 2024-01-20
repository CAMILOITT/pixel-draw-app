import { Meta, StoryObj } from '@storybook/react'
import ColorsSelected from './ColorsSelected'
import { ColorContext } from '../../../context/state/color/Color'
import { Context } from '../../../context/state/color/context'

const meta: Meta<typeof ColorsSelected> = {
  title: 'Components/ColorsSelected',
  component: ColorsSelected,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof ColorsSelected>

export const Default: Story = {
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
          <ColorContext.Provider value={Context} children={<Story />} />
        </div>
      )
    },
  ],
}
//   position: relative;
// height: 50px;
