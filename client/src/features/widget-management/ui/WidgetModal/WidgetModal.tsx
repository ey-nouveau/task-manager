import { useState } from "react";
import { Modal, Input, Button, Tooltip } from "antd";
import { useWidgetStore } from "@/entities/widget/model/store";
import {
  GlobalOutlined,
  LineChartOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import styles from './WidgetModal.module.css';

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
        <div className={styles.modalWrapper}>
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
        <h2 className={styles.title}>
          {step === 1 ? "Select Widget" : "Configure"}
        </h2>

        {step === 1 && (
          <div className={styles.grid}>
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
                  className={styles.typeButton}
                >
                  {type.icon}
                </div>
              </Tooltip>
            ))}
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {selectedType !== "clock" && selectedType !== "native_chart" && selectedType !== "text_note" && (
              <div>
                <div className={styles.label}>Widget Title</div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Analytics, Weather..."
                  variant="borderless"
                  className={styles.input}
                />
              </div>
            )}

            {selectedType === "iframe" && (
              <div>
                <div className={styles.label}>Embed URL</div>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  variant="borderless"
                  className={styles.input}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <Button
                type="default"
                onClick={() => setStep(1)}
                className={styles.backButton}
              >
                Back
              </Button>
              <Button
                type="default"
                onClick={handleAdd}
                disabled={selectedType === 'iframe' ? (!title || !url) : false}
                className={styles.createButton}
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
