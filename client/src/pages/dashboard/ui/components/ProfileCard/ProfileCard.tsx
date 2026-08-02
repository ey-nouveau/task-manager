import { Edit2 } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import styles from './ProfileCard.module.css';

export const ProfileCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarRing}>
          <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className={styles.avatarImg} />
        </div>
        <div className={styles.editBadge}>
          <Edit2 size={12} />
        </div>
      </div>
      
      <div className={styles.nameRow}>
        <h2 className={styles.name}>Alex Sterling</h2>
        <Badge variant="primary">MVP Version</Badge>
      </div>
      
      <div className={styles.subtitle}>
        Productivity Specialist • London, UK
      </div>
    </div>
  );
};
