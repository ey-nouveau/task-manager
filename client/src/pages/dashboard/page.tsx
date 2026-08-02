import { Row } from "@/shared/ui/row";
import s from "./styles.module.css";
import { Col } from "@/shared/ui/col";
import { useIsMobile } from "@/shared/lib/hooks/use-is-mobile";
import { Responsive } from "@/shared/ui/responsive";
import { Typography } from "./ui/typography";
import { ProductivityScore } from "./ui/productivity-score";
import { DailyTasks } from "./ui/daily-tasks";
import { Habits } from "./ui/habits";
import { TopStreaks } from "./ui/top-streaks";

export const DashboardPage = () => {
  const isMobile = useIsMobile();

  return (
    <Row stretchY>
      <Responsive layout="desktop">
        <aside className={s.sidebar}></aside>
      </Responsive>

      {isMobile ? (
        <Col stretchX stretchY gap={24}>
          <Col>
            <Typography
              color="primary60"
              variant="captionBold"
              text="THURSDAY, OCTOBER 24"
            />
            <Typography variant="display" text="Good morning, Ivan" />
            <Typography
              variant="body"
              color="primary60"
              text="You have 4 tasks to focus on today."
            />
          </Col>

          <ProductivityScore />

          <DailyTasks />

          <Habits />

          <TopStreaks />
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
};
