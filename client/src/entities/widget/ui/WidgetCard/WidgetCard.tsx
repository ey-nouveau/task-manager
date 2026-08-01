import { useWidgetStore } from '@/entities/widget/model/store';
import type { Widget } from '@/entities/widget/model/store';
import { DeleteOutlined } from '@ant-design/icons';
import { ClockWidget } from '@/entities/widget/ui/ClockWidget';
import styles from './WidgetCard.module.css';

export const WidgetCard = ({ widget }: { widget: Widget }) => {
  const { removeWidget } = useWidgetStore();

  if (widget.type === "clock") {
    return (
      <div className={styles.seamlessContainer}>
        <ClockWidget />
        <div
          onClick={() => removeWidget(widget.id)}
          className={styles.seamlessDelete}
        >
          <DeleteOutlined style={{ fontSize: "14px" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{widget.title}</div>
        <div onClick={() => removeWidget(widget.id)} className={styles.delete}>
          <DeleteOutlined style={{ fontSize: "13px" }} />
        </div>
      </div>

      <div className={styles.body}>
        {widget.type === "iframe" && widget.url ? (
          <iframe
            src={widget.url}
            title={widget.title}
            className={styles.iframe}
            allow="fullscreen; clipboard-read; clipboard-write"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className={styles.placeholder}>
            {widget.type === "native_chart"
              ? "Chart Placeholder"
              : "Note Placeholder"}
          </div>
        )}
      </div>
    </div>
  );
};
