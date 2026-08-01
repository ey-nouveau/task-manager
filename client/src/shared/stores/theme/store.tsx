import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "./types";

export type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
};

export const createThemeStore = () =>
  createStore<ThemeStore>()(
    persist(
      (set) => ({
        theme: "light",
        toggleTheme: () => {
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          }));
        },
      }),
      {
        name: "theme-storage",
      },
    ),
  );
