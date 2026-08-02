import type { Meta, StoryObj } from '@storybook/react';
import { SettingsGroup } from '../SettingsGroup';
import { SettingsItem } from '../../SettingsItem/SettingsItem';
import { Clock, Palette } from 'lucide-react';
import { Switch } from '@/shared/ui/switch';

const meta = {
  title: 'Dashboard/SettingsGroup',
  component: SettingsGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', background: 'var(--color-bg-outer)', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Preferences',
    children: (
      <>
        <SettingsItem 
          icon={<Clock size={20} />}
          title="Timezone"
          subtitle="GMT+00:00 (London)"
        />
        <SettingsItem 
          icon={<Palette size={20} />}
          title="Theme"
          subtitle="Light Mode (System Default)"
          action={<Switch checked={false} />}
          showChevron={false}
        />
      </>
    )
  },
};
