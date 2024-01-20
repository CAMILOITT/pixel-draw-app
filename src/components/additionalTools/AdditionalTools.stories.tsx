import { Meta, StoryObj } from '@storybook/react'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Context } from '../../context/state/selectorTools/context'
import { Tools } from '../../types/tools/enums'
import AdditionalTools from './AdditionalTools'

export default {
  title: 'Components/AdditionalTools',
  component: AdditionalTools,
  args: { toolSelect: Tools.brush },
  tags: ['autodocs'],
  argTypes: {
    toolSelect: {
      options: [Tools.brush, Tools.eraser, Tools.eyeDropper, Tools.fillBucket],
      control: 'select',
    },
  },
  render: function Render(args) {
    const { toolSelect } = args as { toolSelect: Tools }
    return (
      <SelectorToolsContext.Provider
        value={{ ...Context, toolSelect: toolSelect }}
        children={<AdditionalTools />}
      />
    )
  },
} satisfies Meta<typeof AdditionalTools>

type Story = StoryObj<typeof AdditionalTools>

export const AdditionalToolsBrush: Story = {}
