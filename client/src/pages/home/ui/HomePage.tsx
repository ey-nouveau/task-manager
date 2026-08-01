import { PlusOutlined } from '@ant-design/icons';
import { useWidgetStore } from '@/entities/widget/model/store';
import { WidgetModal } from '@/features/widget-management/ui/WidgetModal/WidgetModal';
import { WidgetCard } from '@/entities/widget/ui/WidgetCard/WidgetCard';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const bgUrl = import.meta.env.BASE_URL + 'vibey-bg.png';
  const { widgets, setModalOpen } = useWidgetStore();

  return (
    <div className={styles.container} style={{ backgroundImage: `url("${bgUrl}")` }}>
      {widgets.length > 0 && (
        <div className={styles.grid}>
          {widgets.map(w => (
            <WidgetCard key={w.id} widget={w} />
          ))}
        </div>
      )}

      <div className={styles.fab} onClick={() => setModalOpen(true)}>
        <PlusOutlined />
      </div>

      <WidgetModal />
    </div>
  );
};
