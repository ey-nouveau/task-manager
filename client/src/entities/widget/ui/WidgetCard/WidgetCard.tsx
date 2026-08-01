import { useWidgetStore } from '@/entities/widget/model/store';
import type { Widget } from '@/entities/widget/model/store';
import { Trash2 } from 'lucide-react';
import { ClockWidget } from '@/shared/ui/widgets/clock';
import styles from './WidgetCard.module.css';
import { Row } from '@/shared/ui/row';
import { Col } from '@/shared/ui/col';

export const WidgetCard = ({ widget }: { widget: Widget }) => {
  const { removeWidget } = useWidgetStore();

  if (widget.type === "clock") {
    return (
      <div className={styles.seamlessContainer}>
        <ClockWidget />
        <Row
          align="center"
          justify="center"
          onClick={() => removeWidget(widget.id)}
          className={styles.seamlessDelete}
        >
          <Trash2 size={14} />
        </Row>
      </div>
    );
  }

  return (
    <Col justify="between" className={styles.container}>
      <Row justify="between" align="center" className={styles.header}>
        <div className={styles.title}>{widget.title}</div>
        <Row align="center" justify="center" onClick={() => removeWidget(widget.id)} className={styles.delete}>
          <Trash2 size={13} />
        </Row>
      </Row>

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
          <Row align="center" justify="center" className={styles.placeholder}>
            {widget.type === "native_chart"
              ? "Chart Placeholder"
              : "Note Placeholder"}
          </Row>
        )}
      </div>
    </Col>
  );
};
