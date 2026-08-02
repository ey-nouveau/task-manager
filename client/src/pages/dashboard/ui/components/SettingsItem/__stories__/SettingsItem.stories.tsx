import type { Meta, StoryObj } from '@storybook/react';
import { SettingsItem } from '../SettingsItem';
import { Mail, Smartphone, BellRing } from 'lucide-react';
import { Switch } from '@/shared/ui/switch';
import { Badge } from '@/shared/ui/badge';

const meta = {
  title: 'Dashboard/SettingsItem',
  component: SettingsItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', background: 'var(--color-bg-surface)', padding: '16px', borderRadius: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Mail size={20} />,
    title: 'Email Notifications',
    subtitle: 'Daily digest and reports',
    showChevron: true,
  },
};

export const WithSwitch: Story = {
  args: {
    icon: <Smartphone size={20} />,
    title: 'Push Notifications',
    subtitle: 'Real-time task reminders',
    action: <Switch checked={true} />,
    showChevron: false,
  },
};

export const WithBadge: Story = {
  args: {
    icon: <BellRing size={20} />,
    title: 'Updates',
    subtitle: 'App version alerts',
    action: <Badge variant="primary">New</Badge>,
    showChevron: true,
  },
};
