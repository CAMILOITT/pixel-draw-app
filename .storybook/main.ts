import type { StorybookConfig } from '@storybook/react-vite'

import type { AddonOptionsBabel } from '@storybook/addon-coverage'

// const coverageConfig: AddonOptionsBabel = {
//   include: ['**/stories/**'],
//   exclude: ['**/exampleDirectory/**'],
//   excludeNodeModules: true,
// }

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/test-runner',
    '@storybook/addon-coverage',
    // {
    //   name: '@storybook/addon-coverage',
    //   options: {
    //     istanbul: {
    //       ...coverageConfig,
    //     },
    //   },
    // },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
}
export default config
