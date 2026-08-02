import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './SettingsItem.module.css';

interface Props {
  icon: ReactNode;
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
  showChevron?: boolean;
}

export const SettingsItem = ({ icon, title, subtitle, action, showChevron = true }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      <div className={styles.action}>
        {action}
        {showChevron && <ChevronRight size={18} />}
      </div>
    </div>
  );
};
