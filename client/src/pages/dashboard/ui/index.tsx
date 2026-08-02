import { MoreHorizontal, Plus } from "lucide-react";
import { Row } from "@/shared/ui/row";
import { Col } from "@/shared/ui/col";
import styles from "./styles.module.css";
import { Responsive } from "@/shared/ui/responsive";

const Card = ({
  title,
  value,
  bg,
  textColor,
  icon,
  style,
}: {
  title?: string;
  value?: string | React.ReactNode;
  bg: string;
  textColor: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    className={styles.card}
    style={
      {
        "--accent-color": bg,
        color: textColor,
        ...style,
      } as React.CSSProperties
    }
  >
    <Col justify="between" style={{ height: "100%" }}>
      <Row justify="between" align="start">
        {title && <div className={styles.cardTitle}>{title}</div>}
        {icon && <div className={styles.cardIcon}>{icon}</div>}
      </Row>
      {value && <div className={styles.cardValue}>{value}</div>}
    </Col>
  </div>
);

const chartBars = [
  4, 6, 8, 5, 9, 12, 15, 10, 18, 22, 35, 40, 50, 45, 60, 80, 100, 95, 85, 70,
  65, 80, 75, 60, 50, 40, 30, 25, 20, 15, 10, 8, 12, 10, 5, 8, 4, 10, 15, 18,
  25, 20,
];

const stats = [
  { title: "Visits", value: "8,920", bg: "var(--color-orange)" },
  { title: "Transactions", value: "1,345", bg: "var(--color-peach)" },
  { title: "Registered", value: "663", bg: "var(--color-yellow)" },
  { title: "Online", value: "234", bg: "var(--color-pink)" },
  { title: "Avg Time", value: "4m", bg: "var(--color-blue)" },
  { title: "Bounce Rate", value: "32%", bg: "var(--color-mint)" },
  { title: "Conversion", value: "3.2%", bg: "var(--color-lilac)" },
  { title: "Signups", value: "128", bg: "var(--color-salmon)" },
  { title: "Active Users", value: "1,024", bg: "var(--color-lavender)" },
  { title: "Page Views", value: "12,300", bg: "var(--color-sage)" },
  { title: "Returning", value: "45%", bg: "var(--color-sky)" },
  { title: "New Users", value: "55%", bg: "var(--color-coral)" },
  { title: "Feedback", value: "4.8", bg: "var(--color-melon)" },
  { title: "Shares", value: "892", bg: "var(--color-vanilla)" },
  { title: "Likes", value: "3,400", bg: "var(--color-rose)" },
  { title: "Comments", value: "1,200", bg: "var(--color-periwinkle)" },
  { title: "Downloads", value: "450", bg: "var(--color-pistachio)" },
  { title: "Uploads", value: "320", bg: "var(--color-butter)" },
  { title: "Tasks Done", value: "89", bg: "var(--color-sand)" },
  { title: "Pending", value: "12", bg: "var(--color-apricot)" },
  { title: "Overdue", value: "3", bg: "var(--color-blush)" },
  { title: "Issues", value: "7", bg: "var(--color-olive)" },
  { title: "Resolved", value: "45", bg: "var(--color-powder)" },
  { title: "Uptime", value: "99.9%", bg: "var(--color-stone)" },
  { title: "Latency", value: "42ms", bg: "var(--color-dusty-blue)" },
  { title: "Bandwidth", value: "1.2TB", bg: "var(--color-crepe)" },
];

export const DashboardPage = () => {
  return (
    <Col flex={1} style={{ height: "100%" }}>
      <Row
        justify="between"
        align="end"
        wrap
        gap={16}
        className={styles.titleChartContainer}
      >
        <h1 className={styles.mainTitle}>{"Dashboard"}</h1>

        <Responsive layout="desktop">
          {location.pathname === "/dashboard" && (
            <Row align="end" gap={4} className={styles.chartContainer}>
              <div className={styles.chartTooltip}>
                1345 transactions
                <div className={styles.chartTooltipArrow} />
              </div>

              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className={styles.chartBar}
                  style={{ height: `${h}%` }}
                />
              ))}
            </Row>
          )}
        </Responsive>
      </Row>

      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <Card
              key={i}
              title={s.title}
              value={s.value}
              bg={s.bg}
              textColor="var(--text)"
              icon={<MoreHorizontal size={18} />}
            />
          ))}

          <Card
            title="Income"
            value="$7,312"
            bg="var(--color-green)"
            textColor="var(--text)"
            icon={
              <Row gap={8} className={styles.incomeIcon}>
                <span className={styles.daily}>Daily</span>
                <span className={styles.weekly}>Weekly</span>
              </Row>
            }
          />

          <Card
            value="Add"
            bg="var(--color-dark-grey)"
            textColor="var(--color-text-light)"
            icon={
              <Row align="center" justify="center" className={styles.addIcon}>
                <Plus size={14} />
              </Row>
            }
          />
        </div>
      </div>
    </Col>
  );
};
