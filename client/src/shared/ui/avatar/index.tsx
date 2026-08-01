import { ReactNode, Children } from 'react';
import styles from './styles.module.css';

interface AvatarProps {
  src?: string;
  size?: number;
  children?: ReactNode;
  className?: string;
}

export const Avatar = ({ src, size = 24, children, className = '' }: AvatarProps) => {
  return (
    <div 
      className={`${styles.avatar} ${className}`} 
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {src ? <img src={src} alt="avatar" className={styles.img} /> : children}
    </div>
  );
};

interface GroupProps {
  children: ReactNode;
  maxCount?: number;
  size?: number;
}

Avatar.Group = ({ children, maxCount, size = 24 }: GroupProps) => {
  const items = Children.toArray(children);
  const displayItems = maxCount ? items.slice(0, maxCount) : items;
  const extraCount = maxCount ? Math.max(0, items.length - maxCount) : 0;

  return (
    <div className={styles.group}>
      {displayItems.map((child: any, i) => (
        <div key={i} className={styles.groupItem}>
          {/* Inject size prop into children */}
          {{ ...child, props: { ...child.props, size } }}
        </div>
      ))}
      {extraCount > 0 && (
        <div className={styles.groupItem}>
          <Avatar size={size}>+{extraCount}</Avatar>
        </div>
      )}
    </div>
  );
};
