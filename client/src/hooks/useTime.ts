import { useState, useEffect } from 'react';

export const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Sync with exact second boundary to avoid slight visual stutters
    const timeout = setTimeout(() => {
      setTime(new Date());
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, 1000 - new Date().getMilliseconds());

    return () => clearTimeout(timeout);
  }, []);

  return time;
};