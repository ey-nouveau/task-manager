import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

interface Props {
  open: boolean;
  onCancel: () => void;
  children: ReactNode;
  width?: number;
}

export const Modal = ({ open, onCancel, children, width = 400 }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div 
      className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div 
        className={`${styles.modal} ${open ? styles.modalOpen : ''}`}
        style={{ width }}
      >
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
