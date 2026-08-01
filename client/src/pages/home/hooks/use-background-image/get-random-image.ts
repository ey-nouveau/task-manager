import { Theme } from '@/shared/stores/theme/types';

type Path = number;

const imgsCount = Array.from({ length: 7 }).map((_, idx) => idx + 1);

const IMAGES: Record<Theme, Path[]> = {
  dark: imgsCount,
  light: imgsCount,
};

export const getRandomImage = (theme: Theme) => {
  const imagesByTheme = IMAGES[theme];

  const randomIndex = Math.floor(Math.random() * imagesByTheme.length);
  const baseUrl = 'wallpapers';
  const imageByIndex = imagesByTheme[randomIndex];

  return `/${baseUrl}/${theme}/${imageByIndex}.webp`;
};