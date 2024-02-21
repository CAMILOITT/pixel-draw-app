import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { SelectorToolsContext } from '../../context/state/selectorTools/SelectorTools'
import { Context } from '../../context/state/selectorTools/context'
import { Tools } from '../../types/tools/enums'
import AdditionalTools from './AdditionalTools'

/**
 * encabezado de la aplicación esta contiene el nombre de la app y a su lado algunas configuraciones de las herramientas que interactúan con el canvas como modificadores del pincel y borrador si no esta seleccionada ninguna de estas herramientas no muestra los modificadores.
 */
const meta: Meta<typeof AdditionalTools> = {
  title: 'v1/Components/AdditionalTools',
  component: AdditionalTools,
  args: { toolSelect: Tools.brush },
  tags: ['autodocs'],
  render: args => {
    const { toolSelect } = args as { toolSelect: Tools }
    return (
      <SelectorToolsContext.Provider
        value={{ ...Context, toolSelect }}
        children={<AdditionalTools />}
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const navigation = await canvas.findByRole('navigation')
    expect(navigation).toBeInTheDocument()
    expect(navigation).toHaveTextContent('PixelDraw')
  },
}

export default meta

type Story = StoryObj<typeof AdditionalTools>

export const Default: Story = {
  render: args => {
    const { toolSelect } = args as { toolSelect: Tools }
    return (
      <SelectorToolsContext.Provider
        value={{ ...Context, toolSelect }}
        children={<AdditionalTools />}
      />
    )
  },
}

export const AdditionalToolsBrush: Story = {
  args: { toolSelect: Tools.brush },
  argTypes: {
    toolSelect: {
      control: 'none',
    },
  },
}

export const AdditionalToolsEraser: Story = {
  args: { toolSelect: Tools.eraser },
  argTypes: {
    toolSelect: {
      control: 'none',
    },
  },
}
