import { ReactNode } from 'react';
import styles from './styles.module.css';

type BadgeVariant = 'primary' | 'success' | 'default';

interface Props {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({ children, variant = 'default', className = '' }: Props) => {
  return (
    <span className={`${styles.badge} ${styles[`variant-${variant}`]} ${className}`}>
      {children}
    </span>
  );
};
