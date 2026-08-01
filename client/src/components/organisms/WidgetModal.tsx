import { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useWidgetStore } from "../../store/useWidgetStore";
import {
  GlobalOutlined,
  LineChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const WIDGET_TYPES = [
  {
    id: "iframe",
    label: "Web Embed",
    icon: <GlobalOutlined />,
    desc: "Embed any website or tool via URL",
  },
  {
    id: "native_chart",
    label: "Native Chart",
    icon: <LineChartOutlined />,
    desc: "Internal analytics metrics",
  },
  {
    id: "text_note",
    label: "Sticky Note",
    icon: <FileTextOutlined />,
    desc: "Quick notes & reminders",
  },
];

export const WidgetModal = () => {
  const { isModalOpen, setModalOpen, addWidget } = useWidgetStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const reset = () => {
    setStep(1);
    setSelectedType(null);
    setUrl("");
    setTitle("");
  };

  const handleClose = () => {
    setModalOpen(false);
    setTimeout(reset, 300);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setStep(2);
  };

  const handleAdd = () => {
    if (!title.trim()) return;

    addWidget({
      type: selectedType as any,
      title: title.trim(),
      url: selectedType === "iframe" ? url.trim() : undefined,
    });

    handleClose();
  };

  return (
    <Modal
      centered
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      closable={false}
      width={400}
      modalRender={(node) => (
        <div
          style={{
            background: "rgba(20, 20, 20, 0.45)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "24px",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {node}
        </div>
      )}
      styles={{
        body: { padding: "24px" },
        mask: { backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.4)" },
      }}
      className="glass-modal"
      wrapClassName="glass-modal-wrap"
      rootClassName="glass-modal-root"
    >
      <div style={{ color: "var(--color-text-light)" }}>
        <h2
          style={{
            margin: "0 0 16px 0",
            fontSize: "20px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          {step === 1 ? "Add Widget" : "Configure"}
        </h2>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {WIDGET_TYPES.map((type) => (
              <div
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "var(--color-purple)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    color: "var(--color-text-light)",
                  }}
                >
                  {type.icon}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: 1.2,
                    }}
                  >
                    {type.label}
                  </div>
                  <div
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "12px",
                      lineHeight: 1.2,
                    }}
                  >
                    {type.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  marginBottom: "6px",
                }}
              >
                Widget Title
              </div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Analytics, Weather..."
                variant="borderless"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  color: "var(--color-text-light)",
                  fontSize: "14px",
                  height: "40px",
                }}
              />
            </div>

            {selectedType === "iframe" && (
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-muted)",
                    marginBottom: "6px",
                  }}
                >
                  Embed URL
                </div>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  variant="borderless"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "var(--color-text-light)",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <Button
                type="default"
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  height: "40px",
                  color: "var(--color-text-light)",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}
              >
                Back
              </Button>
              <Button
                type="default"
                onClick={handleAdd}
                disabled={!title}
                style={{
                  flex: 1,
                  height: "40px",
                  background: "transparent",
                  border: "1px solid var(--color-purple)",
                  color: "var(--color-purple)"
                }}
              >
                Create Widget
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
