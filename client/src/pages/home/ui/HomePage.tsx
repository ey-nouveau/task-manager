import { Plus } from "lucide-react";
import { useWidgetStore } from "@/entities/widget/model/store";
import { WidgetModal } from "@/features/widget-management/ui/WidgetModal/WidgetModal";
import { WidgetCard } from "@/entities/widget/ui/WidgetCard/WidgetCard";
import styles from "./HomePage.module.css";
import { useTheme } from "@/shared/stores/theme/selectors";
import { useEffect, useState } from "react";
import { getRandomImage } from "../lib/get-random-image";

const BG_IMAGE_CHANGE_INTERVAL = 1000 * 60;

export const HomePage = () => {
  const theme = useTheme();
  const [bgImage, setBgImage] = useState(() => getRandomImage(theme));
  console.log(bgImage)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImage(getRandomImage(theme));
    }, BG_IMAGE_CHANGE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setBgImage(getRandomImage(theme));
  }, [theme]);

  const bgUrl = import.meta.env.BASE_URL + bgImage;
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
