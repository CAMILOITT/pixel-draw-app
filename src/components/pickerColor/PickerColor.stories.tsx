import { Meta, StoryObj } from "@storybook/react";
import { PickerColor } from "./PickerColor";
// import { PickerColor } from "./PickerColor";

const meta: Meta<typeof PickerColor> = {
  title: 'Components/PickerColor',
  component: PickerColor,
}

export default meta

type Story = StoryObj<typeof PickerColor>

export const Default: Story = {
  args: {
    addColor: () => {},
    listColors: [],
  }
}