import type {Meta, StoryObj} from '@storybook/vue3-vite'

import {fn} from 'storybook/test'

import Button from './Button.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {control: 'select', options: ['small', 'medium', 'large']},
    backgroundColor: {control: 'color'},
  },
  args: {
    primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>


export const AllVariants: Story = {
  parameters: {
    indexing: {disable: true} // Скроет из боковой панели, если нужно
  },
  render: (args) => ({
    components: {Button},
    setup() {
      return {args}
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <Button v-bind="args" primary label="Primary" />
          <Button v-bind="args" :primary="false" label="Secondary" />
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <Button v-bind="args" size="small" label="Small" />
          <Button v-bind="args" size="medium" label="Medium" />
          <Button v-bind="args" size="large" label="Large" />
        </div>
      </div>
    `,
  }),
}
