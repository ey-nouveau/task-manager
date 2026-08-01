import { useThemeStore } from './provider';

export const useTheme = () => useThemeStore((s) => s.theme);
export const useToggleTheme = () => useThemeStore(s => s.toggleTheme);