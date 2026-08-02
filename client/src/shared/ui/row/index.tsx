import s from "./styles.module.css";
import cn from "classnames";

const justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
} as const;

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
} as const;

type Props = {
  gap?: number;
  children: React.ReactNode;
  justify?: keyof typeof justifyMap;
  align?: keyof typeof alignMap;
  flexWrap?: "wrap" | "nowrap";
  className?: string;
  flex?: React.CSSProperties["flex"];
  style?: React.CSSProperties;
  stretchX?: boolean;
  stretchY?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

export const Row = ({
  gap,
  children,
  justify,
  stretchX,
  stretchY,
  align = "center",
  flex,
  flexWrap,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <div
      className={cn(s.row, className)}
      style={{
        gap,
        justifyContent: justify ? justifyMap[justify] : undefined,
        alignItems: align ? alignMap[align] : undefined,
        flexWrap,
        flex,
        width: stretchX ? "100%" : undefined,
        height: stretchY ? "100%" : undefined,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
