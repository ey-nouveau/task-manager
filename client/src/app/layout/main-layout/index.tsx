import { Outlet } from "react-router-dom";
import { Col } from "@/shared/ui/col";
import styles from "./styles.module.css";

import { AppHeader } from "@/widgets/app-header";

export const MainLayout = () => {
  return (
    <div className={styles.appContainer}>
      <Col className={styles.appWindow}>
        <AppHeader />

        <div className={styles.bottomSection}>
          <Outlet />
        </div>
      </Col>
    </div>
  );
};
