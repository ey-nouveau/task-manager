import { ReactNode } from 'react';
import styles from './SettingsGroup.module.css';

interface Props {
  title: string;
  children: ReactNode;
}

export const SettingsGroup = ({ title, children }: Props) => {
  return (
    <div className={styles.group}>
      <div className={styles.title}>{title}</div>
      <div className={styles.card}>
        {children}
      </div>
    </div>
  );
};
