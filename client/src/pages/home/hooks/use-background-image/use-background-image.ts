import { useTheme } from '@/shared/stores/theme/selectors';
import { useEffect, useState } from 'react';
import { getRandomImage } from './get-random-image';

const BG_IMAGE_CHANGE_INTERVAL = 1000 * 60;

export const useBackgroundImage = () => {
  const theme = useTheme();
  const [bgImage, setBgImage] = useState(() => getRandomImage(theme));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImage(getRandomImage(theme));
    }, BG_IMAGE_CHANGE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setBgImage(getRandomImage(theme));
  }, [theme]);

  const bgUrl = import.meta.env.BASE_URL + bgImage;

  return `url("${bgUrl}")`;
};