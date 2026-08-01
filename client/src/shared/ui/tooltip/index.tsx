import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  title: ReactNode;
  placement?: 'bottom'; // keeping simple for now
}

export const Tooltip = ({ children, title }: Props) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.tooltip}>
        <div className={styles.arrow} />
        <div className={styles.inner}>
          {title}
        </div>
      </div>
    </div>
  );
};
