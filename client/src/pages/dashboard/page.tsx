import { Row } from "@/shared/ui/row";
import s from "./styles.module.css";
import { Col } from "@/shared/ui/col";
import { useIsMobile } from "@/shared/lib/hooks/use-is-mobile";
import { Responsive } from "@/shared/ui/responsive";
import { ActivityCard } from "./ui/activity-card";

export const DashboardPage = () => {
  const isMobile = useIsMobile();

  return (
    <Row>
      <Responsive layout="desktop">
        <aside className={s.sidebar}></aside>
      </Responsive>

      {isMobile ? (
        <Col gap={24}>
          <Col gap={4}>
            <span
              style={{
                color: "#6B7280",
              }}
            >
              THURSDAY, OCTOBER 24
            </span>
            <span
              style={{
                color: "#111827",
              }}
            >
              Good morning, Ivan
            </span>
            <span
              style={{
                color: "#6B7280",
              }}
            >
              You have 4 tasks to focus on today.
            </span>
          </Col>

          <ActivityCard>
            <Col gap={16} align="center">
              <Col
                align="center"
                justify="center"
                className={s.circle}
                style={{ color: "blue" }}
              >
                <div>70%</div>
                <div>Daily</div>
              </Col>

              <Col>
                <span
                  style={{
                    color: "#111827",
                  }}
                >
                  Productivity Score
                </span>
                <span
                  style={{
                    color: "#6B7280",
                  }}
                >
                  You're doing better than 85% of peers
                </span>
              </Col>
            </Col>
          </ActivityCard>

          <ActivityCard>
            <Col>1</Col>
          </ActivityCard>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
};
