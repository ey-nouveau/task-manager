import type { Preview } from '@storybook/react';
import '../src/app/styles/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', background: 'var(--color-bg-outer)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }} data-theme="light">
        <Story />
      </div>
    ),
  ],
};

export default preview;
