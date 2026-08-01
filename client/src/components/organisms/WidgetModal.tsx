import { useState } from "react";
import { Modal, Input, Button, Tooltip } from "antd";
import { useWidgetStore } from "../../store/useWidgetStore";
import {
  GlobalOutlined,
  LineChartOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const WIDGET_TYPES = [
  {
    id: "clock",
    label: "World Clock",
    icon: <ClockCircleOutlined />,
    desc: "Neumorphic minimalist clock",
  },
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
    // If iframe, title and url are required. Otherwise we use a default title or skip it.
    let finalTitle = title.trim();
    if (selectedType === 'clock') finalTitle = 'World Clock';
    if (selectedType === 'native_chart') finalTitle = 'Native Chart';
    if (selectedType === 'text_note') finalTitle = 'Sticky Note';

    if (selectedType === 'iframe' && !finalTitle) return;

    addWidget({
      type: selectedType as any,
      title: finalTitle,
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
            textAlign: "center"
          }}
        >
          {step === 1 ? "Select Widget" : "Configure"}
        </h2>

        {step === 1 && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '12px',
            paddingTop: '8px'
          }}>
            {WIDGET_TYPES.map((type) => (
              <Tooltip 
                key={type.id} 
                placement="bottom" 
                title={
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, marginBottom: '2px' }}>{type.label}</div>
                    <div style={{ opacity: 0.8, fontSize: '12px' }}>{type.desc}</div>
                  </div>
                }
                color="rgba(0,0,0,0.8)"
                overlayInnerStyle={{ backdropFilter: 'blur(12px)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  onClick={() => handleTypeSelect(type.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: "28px",
                    color: "var(--color-text-light)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "var(--color-purple)";
                    e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                  }}
                >
                  {type.icon}
                </div>
              </Tooltip>
            ))}
          </div>
        )}

        {step === 2 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {selectedType !== "clock" && selectedType !== "native_chart" && selectedType !== "text_note" && (
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
            )}

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
                disabled={selectedType === 'iframe' ? (!title || !url) : false}
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
