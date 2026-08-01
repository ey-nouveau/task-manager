import { Globe, LineChart, FileText, Clock } from "lucide-react";
import { Modal } from "@/shared/ui/modal";
import { Tooltip } from "@/shared/ui/tooltip";
import { Row } from "@/shared/ui/row";
import styles from "./WidgetModal.module.css";
import {
  BuiltInWidget,
  BuiltInWidgetEnum,
} from "@/entities/widget/model/types";

const WIDGET_TYPES = [
  {
    id: BuiltInWidgetEnum.Clock,
    label: "World Clock",
    icon: <Clock size={24} />,
    desc: "Neumorphic minimalist clock",
  },
  {
    id: BuiltInWidgetEnum.Clock,
    label: "Web Embed",
    icon: <Globe size={24} />,
    desc: "Embed any website or tool via URL",
  },
  {
    id: BuiltInWidgetEnum.Clock,
    label: "Native Chart",
    icon: <LineChart size={24} />,
    desc: "Internal analytics metrics",
  },
  {
    id: BuiltInWidgetEnum.Clock,
    label: "Sticky Note",
    icon: <FileText size={24} />,
    desc: "Quick notes & reminders",
  },
];

export const WidgetModal = ({
  isOpen,
  onClose,
  onAddWidget,
}: {
  onClose: () => void;
  onAddWidget: (type: BuiltInWidget) => void;
  isOpen: boolean;
}) => {
  return (
    <Modal open={isOpen} onCancel={onClose} width={400}>
      <div className={styles.content}>
        <h2 className={styles.title}>Select Widget</h2>

        <div className={styles.grid}>
          {WIDGET_TYPES.map((type) => (
            <Tooltip
              key={type.id}
              placement="bottom"
              title={
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltipLabel}>{type.label}</div>
                  <div className={styles.tooltipDesc}>{type.desc}</div>
                </div>
              }
            >
              <Row
                align="center"
                justify="center"
                onClick={() => {
                  onAddWidget(type.id);
                  onClose();
                }}
                className={styles.typeButton}
              >
                {type.icon}
              </Row>
            </Tooltip>
          ))}
        </div>
      </div>
    </Modal>
  );
};
