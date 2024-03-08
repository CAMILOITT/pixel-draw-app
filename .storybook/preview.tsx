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
import { DocsContainer } from '@storybook/addon-docs'

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

      // container: ({ children, context }) => (
      //   <DocsContainer context={context} children={children} />

      // ),
    },
  },
  decorators: [
    Story => (
      <StateProvider>
        <Story />
      </StateProvider>
    ),
  ],
  globalTypes: {
    docs: {
      description: 'change page of canvas to docs',
      defaultValue: 'canvas',
      toolbar: {
        title: 'canvas',
        icon: 'circlehollow',
        items: ['canvas', 'docs'],
        dynamicTitle: true,
      },
    },
  },
}

export default preview
