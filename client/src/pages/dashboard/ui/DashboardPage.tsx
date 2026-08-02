import { 
  Clock, 
  Palette, 
  Lock, 
  ShieldCheck, 
  Mail, 
  Smartphone,
  Save,
  Check
} from "lucide-react";
import { Switch } from "@/shared/ui/switch";
import { Button } from "@/shared/ui/button";
import { useTheme, useToggleTheme } from "@/shared/stores/theme/selectors";
import { ProfileCard, SettingsGroup, SettingsItem } from "./components";
import styles from './DashboardPage.module.css';

export const DashboardPage = () => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  
  const isDarkMode = theme === 'dark';

  return (
    <div className={styles.container}>
      <div className={styles.mobileView}>
        
        <ProfileCard />

        <div style={{ marginTop: '32px' }}>
          <SettingsGroup title="PREFERENCES">
            <SettingsItem 
              icon={<Clock size={20} />}
              title="Timezone"
              subtitle="GMT+00:00 (London)"
            />
            <SettingsItem 
              icon={<Palette size={20} />}
              title="Theme"
              subtitle={isDarkMode ? "Dark Mode" : "Light Mode (System Default)"}
              action={<Switch checked={!isDarkMode} onChange={toggleTheme} />}
              showChevron={false}
            />
          </SettingsGroup>

          <SettingsGroup title="SECURITY">
            <SettingsItem 
              icon={<Lock size={20} />}
              title="Password"
              subtitle="Updated 2 months ago"
            />
            <SettingsItem 
              icon={<ShieldCheck size={20} />}
              title="2-Factor Authentication"
              subtitle={<span style={{ color: '#27ae60', fontWeight: 500 }}>Enabled</span>}
              action={
                <div style={{ background: '#27ae60', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={12} strokeWidth={4} />
                </div>
              }
            />
          </SettingsGroup>

          <SettingsGroup title="NOTIFICATION CHANNELS">
            <SettingsItem 
              icon={<Mail size={20} />}
              title="Email Notifications"
              subtitle="Daily digest and reports"
              action={<Switch checked={true} />}
              showChevron={false}
            />
            <SettingsItem 
              icon={<Smartphone size={20} />}
              title="Push Notifications"
              subtitle="Real-time task reminders"
              action={<Switch checked={false} />}
              showChevron={false}
            />
          </SettingsGroup>
        </div>

        <div className={styles.version}>
          LifeHub Version 2.4.0 (Stable Build)
        </div>

        <Button variant="primary" size="large" icon={<Save size={20} />} style={{ width: '100%' }}>
          Save Preferences
        </Button>
        
      </div>
    </div>
  );
};
