export const useBackgroundImage = () => {
  const bgUrl = import.meta.env.BASE_URL;

  return `url("${bgUrl}/wallpapers/light/5.webp")`;
};