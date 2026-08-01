import { useWidgetStore } from "../../store/useWidgetStore";
import type { Widget } from "../../store/useWidgetStore";
import { DeleteOutlined } from "@ant-design/icons";
import { ClockWidget } from "../widgets/clock";

export const WidgetCard = ({ widget }: { widget: Widget }) => {
  const { removeWidget } = useWidgetStore();

  return (
    <div
      style={{
        background: "rgba(20, 20, 20, 0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "24px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "350px",
        boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
        transition: "transform 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "rgba(0,0,0,0.2)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: "14px",
            color: "var(--color-text-light)",
            letterSpacing: "0.02em",
          }}
        >
          {widget.title}
        </div>
        <div
          onClick={() => removeWidget(widget.id)}
          style={{
            cursor: "pointer",
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            borderRadius: "6px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <DeleteOutlined style={{ fontSize: "13px" }} />
        </div>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        {widget.type === "iframe" && widget.url ? (
          <iframe
            src={widget.url}
            title={widget.title}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "transparent",
            }}
            allow="fullscreen; clipboard-read; clipboard-write"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : widget.type === "clock" ? (
          <ClockWidget />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "var(--color-text-muted)",
              fontSize: "13px",
            }}
          >
            {widget.type === "native_chart"
              ? "Chart Placeholder"
              : "Note Placeholder"}
          </div>
        )}
      </div>
    </div>
  );
};
