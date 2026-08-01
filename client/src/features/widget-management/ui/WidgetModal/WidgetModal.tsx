import { useState } from "react";
import { useWidgetStore } from "@/entities/widget/model/store";
import { Globe, LineChart, FileText, Clock } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";
import { Tooltip } from "@/shared/ui/tooltip";
import { Input } from "@/shared/ui/input";
import { Col } from "@/shared/ui/col";
import { Row } from "@/shared/ui/row";
import styles from './WidgetModal.module.css';

const WIDGET_TYPES = [
  {
    id: "clock",
    label: "World Clock",
    icon: <Clock size={24} />,
    desc: "Neumorphic minimalist clock",
  },
  {
    id: "iframe",
    label: "Web Embed",
    icon: <Globe size={24} />,
    desc: "Embed any website or tool via URL",
  },
  {
    id: "native_chart",
    label: "Native Chart",
    icon: <LineChart size={24} />,
    desc: "Internal analytics metrics",
  },
  {
    id: "text_note",
    label: "Sticky Note",
    icon: <FileText size={24} />,
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
      open={isModalOpen}
      onCancel={handleClose}
      width={400}
    >
      <div className={styles.content}>
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
                  <div className={styles.tooltipContainer}>
                    <div className={styles.tooltipLabel}>{type.label}</div>
                    <div className={styles.tooltipDesc}>{type.desc}</div>
                  </div>
                }
              >
                <Row
                  align="center"
                  justify="center"
                  onClick={() => handleTypeSelect(type.id)}
                  className={styles.typeButton}
                >
                  {type.icon}
                </Row>
              </Tooltip>
            ))}
          </div>
        )}

        {step === 2 && (
          <Col gap={16} className={styles.formContainer}>
            {selectedType !== "clock" && selectedType !== "native_chart" && selectedType !== "text_note" && (
              <Col gap={6}>
                <div className={styles.label}>Widget Title</div>
                <Input
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                  placeholder="e.g. Analytics, Weather..."
                />
              </Col>
            )}

            {selectedType === "iframe" && (
              <Col gap={6}>
                <div className={styles.label}>Embed URL</div>
                <Input
                  value={url}
                  onChange={(e: any) => setUrl(e.target.value)}
                  placeholder="https://..."
                />
              </Col>
            )}

            <Row gap={8} className={styles.buttonsRow}>
              <Button
                variant="default"
                onClick={() => setStep(1)}
                className={styles.backButton}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleAdd}
                disabled={selectedType === 'iframe' ? (!title || !url) : false}
                className={styles.createButton}
              >
                Create Widget
              </Button>
            </Row>
          </Col>
        )}
      </div>
    </Modal>
  );
};
