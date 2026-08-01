import { useTime } from "@/shared/lib/hooks/use-time";
import s from "./styles.module.css";

const Hand = ({
  width,
  height,
  color,
  rotation,
}: {
  width: number;
  height: number;
  color: string;
  rotation: number;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "50%",
        left: `calc(50% - ${width / 2}px)`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        borderRadius: `${width}px`,
        transformOrigin: "bottom center",
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
      }}
    />
  );
};

export const ClockWidget = () => {
  const time = useTime();

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hrRotation = (hours % 12) * 30 + minutes * 0.5;
  const minRotation = minutes * 6 + seconds * 0.1;
  const secRotation = seconds * 6;

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={s.widgetContainer}>
      <div className={s.cityTitle}>New York</div>

      <div className={s.clockFace}>
        <Hand
          width={4}
          height={40}
          color="var(--color-text-light)"
          rotation={hrRotation}
        />
        <Hand
          width={3}
          height={60}
          color="var(--color-text-light)"
          rotation={minRotation}
        />
        <Hand
          width={2}
          height={70}
          color="var(--color-purple)"
          rotation={secRotation}
        />

        <div className={s.centerPivot} />
      </div>

      <div className={s.dateSubtitle}>{dateString}</div>
    </div>
  );
};
