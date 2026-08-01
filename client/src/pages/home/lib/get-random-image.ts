import { Theme } from '@/shared/stores/theme/types';

type Path = string;

const IMAGES: Record<Theme, Path[]> = {
  dark: [
    'vibey-bg-dark.png'
  ],
  light: [
    'vibey-bg.png'
  ],
};

export const getRandomImage = (theme: Theme) => {
  const imagesByTheme = IMAGES[theme];

  const randomIndex = Math.floor(Math.random() * imagesByTheme.length);

  return imagesByTheme[randomIndex];
};