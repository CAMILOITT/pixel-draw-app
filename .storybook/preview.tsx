import type { Preview } from '@storybook/react'
import '../src/index.css'
import {
  Title,
  Description,
  Primary,
  Controls,
  Canvas,
} from '@storybook/blocks'
import * as React from 'react'
import StateProvider from '../src/context'
import { themes } from '@storybook/theming'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
  decorators: [
    Story => (
      <StateProvider>
        <Story />
      </StateProvider>
    ),
  ],
}

export default preview
