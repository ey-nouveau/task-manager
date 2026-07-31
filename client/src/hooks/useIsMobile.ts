import { useEffect, useState } from 'react';

const mobileBreakpoint = '(max-width: 1279px)';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(mobileBreakpoint).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileBreakpoint);

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
};