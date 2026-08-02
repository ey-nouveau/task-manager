import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from '../ProfileCard';

const meta = {
  title: 'Dashboard/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', background: 'var(--color-bg-outer)', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
