import { useEffect, useState } from "react";
import s from "./index.module.css";

const NUMBERS = Array.from({ length: 12 }).map((_, i) => i + 1);

const getPositionStyles = (width: number, number: number) => {
  const radius = width / 2 - 20;
  const center = width / 2;
  const angle = (number * 30 - 90) * (Math.PI / 180);

  return {
    left: center + radius * Math.cos(angle),
    top: center + radius * Math.sin(angle),
  };
};

const getRotation = (base: number, value: number) => {
  const rotation = (value / base) * 360 - 90;

  return {
    transform: `rotate(${rotation}deg)`,
  };
};

const Hand = ({
  base,
  value,
  children,
}: {
  base: number;
  value: number;
  children: React.ReactNode;
}) => {
  return (
    <div style={getRotation(base, value)} className={s.hand}>
      {children}
      <div className={s.half} />
    </div>
  );
};

const SecondsHand = ({ second }: { second: number }) => {
  return (
    <Hand base={60} value={second}>
      <div className={s.secondsHand} />
    </Hand>
  );
};

const MinutesHand = ({ minute }: { minute: number }) => {
  return (
    <Hand base={60} value={minute}>
      <div className={s.minutesHand} />
    </Hand>
  );
};

const HoursHand = ({ hour }: { hour: number }) => {
  return (
    <Hand base={12} value={hour % 12}>
      <div className={s.hoursHand} />
    </Hand>
  );
};

const Hands = ({ time }: { time: Date }) => {
  return (
    <>
      <SecondsHand second={time.getSeconds()} />
      <MinutesHand minute={time.getMinutes()} />
      <HoursHand hour={time.getHours()} />
    </>
  );
};

export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.container}>
      {NUMBERS.map((number) => (
        <div
          style={getPositionStyles(180, number)}
          key={number}
          className={s.number}
        >
          {number}
        </div>
      ))}

      <Hands time={time} />
    </div>
  );
};
