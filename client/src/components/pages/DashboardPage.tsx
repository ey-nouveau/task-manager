import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";

const Card = ({
  title,
  value,
  bg,
  textColor,
  icon,
  style = {},
}: {
  title?: string;
  value?: string | React.ReactNode;
  bg: string;
  textColor: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: bg,
      color: textColor,
      borderRadius: "16px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "160px",
      position: "relative",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {title && (
        <div style={{ fontSize: "14px", fontWeight: 500 }}>{title}</div>
      )}
      {icon && <div style={{ opacity: 0.8, cursor: "pointer" }}>{icon}</div>}
    </div>
    {value && (
      <div
        style={{
          fontSize: "40px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          marginTop: "16px",
        }}
      >
        {value}
      </div>
    )}
  </div>
);

export const DashboardPage = () => {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingBottom: "48px"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
          width: "100%",
        }}
      >
        {stats.map((s, i) => (
          <Card
            key={i}
            title={s.title}
            value={s.value}
            bg={s.bg}
            textColor="var(--color-text-dark)"
            icon={<EllipsisOutlined />}
          />
        ))}

        <Card
          title="Income"
          value="$7,312"
          bg="var(--color-green)"
          textColor="var(--color-text-dark)"
          icon={
            <div
              style={{
                display: "flex",
                gap: "8px",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "20px",
                padding: "2px 8px",
                fontSize: "10px",
              }}
            >
              <span style={{ fontWeight: 500 }}>Daily</span>
              <span style={{ opacity: 0.5 }}>Weekly</span>
            </div>
          }
        />
        <Card
          value="Add"
          bg="var(--color-dark-grey)"
          textColor="var(--color-text-light)"
          icon={
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "var(--color-orange)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-dark)",
              }}
            >
              <PlusOutlined style={{ fontSize: "14px" }} />
            </div>
          }
          style={{ justifyContent: "flex-end" }}
        />
      </div>
    </div>
  );
};