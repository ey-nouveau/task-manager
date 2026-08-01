import { BuiltInWidget } from "@/entities/widget/model/types";
import { ClockWidget } from "@/shared/ui/widgets/clock";
import { ReactNode, useCallback, useState } from "react";

const TYPE_TO_COMPONENT: Record<BuiltInWidget, ReactNode> = {
  clock: <ClockWidget />,
};

export const useWidgets = () => {
  const [widgets, setWidgets] = useState<ReactNode[]>([]);

  const handleAddWidget = useCallback((type: BuiltInWidget) => {
    const newWidget = TYPE_TO_COMPONENT[type];

    setWidgets((prev) => {
      const next = [...prev];
      next.push(newWidget);

      return next;
    });
  }, []);

  return {
    widgets,
    onAddWidget: handleAddWidget,
  };
};
