import { ReactNode, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './styles.module.css';
import { Row } from '../row';

interface ExpandProps {
  header: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Expand = ({ header, children, defaultExpanded = false, className = '', style }: ExpandProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <button 
        className={styles.trigger} 
        onClick={() => setExpanded((prev) => !prev)}
        type="button"
      >
        <Row align="center" style={{ flex: 1 }}>{header}</Row>
        <span className={`${styles.triggerIcon} ${expanded ? styles.expanded : ''}`}>
          <ChevronRight size={16} />
        </span>
      </button>
      <div className={`${styles.contentWrapper} ${expanded ? styles.expandedContent : ''}`}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
