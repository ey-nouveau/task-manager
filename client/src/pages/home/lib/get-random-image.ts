import { Theme } from '@/shared/stores/theme/types';

type Path = number;

const IMAGES: Record<Theme, Path[]> = {
  dark: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ],
  light: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ],
};

export const getRandomImage = (theme: Theme) => {
  const imagesByTheme = IMAGES[theme];

  const randomIndex = Math.floor(Math.random() * imagesByTheme.length);
  const baseUrl = 'wallpapers';
  const imageByIndex = imagesByTheme[randomIndex];

  return `/${baseUrl}/${theme}/${imageByIndex}.webp`;
};