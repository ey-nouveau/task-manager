import { Plus } from "lucide-react";
import { WidgetModal } from "@/features/widget-management/ui/WidgetModal/WidgetModal";
import styles from "./styles.module.css";
import { useBackgroundImage } from "./hooks/use-background-image/use-background-image";
import { useWidgets } from "./hooks/use-widgets/use-widgets";
import { useAppModal } from "@/shared/lib/hooks/use-app-modal";
import { Fragment } from "react/jsx-runtime";

export const HomePage = () => {
  const { widgets, onAddWidget } = useWidgets();
  const backgroundImage = useBackgroundImage();
  const { open, onClose, onOpen } = useAppModal();

  return (
    <div className={styles.container} style={{ backgroundImage }}>
      {widgets.length > 0 && (
        <div className={styles.grid}>
          {widgets.map((Widget, idx) => (
            <Fragment key={idx}>{Widget}</Fragment>
          ))}
        </div>
      )}

      <div className={styles.fab} onClick={onOpen}>
        <Plus size={24} />
      </div>

      <WidgetModal onAddWidget={onAddWidget} isOpen={open} onClose={onClose} />
    </div>
  );
};
