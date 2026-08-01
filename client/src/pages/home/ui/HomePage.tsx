import { Plus } from "lucide-react";
import { useWidgetStore } from "@/entities/widget/model/store";
import { WidgetModal } from "@/features/widget-management/ui/WidgetModal/WidgetModal";
import { WidgetCard } from "@/entities/widget/ui/WidgetCard/WidgetCard";
import styles from "./HomePage.module.css";
import { useTheme } from "@/shared/stores/theme/selectors";

export const HomePage = () => {
  const theme = useTheme();
  const bgPath = theme === "dark" ? "vibey-bg-dark.png" : "vibey-bg.png";
  const bgUrl = import.meta.env.BASE_URL + bgPath;
  const { widgets, setModalOpen } = useWidgetStore();

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url("${bgUrl}")` }}
    >
      {widgets.length > 0 && (
        <div className={styles.grid}>
          {widgets.map((w) => (
            <WidgetCard key={w.id} widget={w} />
          ))}
        </div>
      )}

      <div className={styles.fab} onClick={() => setModalOpen(true)}>
        <Plus size={24} />
      </div>

      <WidgetModal />
    </div>
  );
};
