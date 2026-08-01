import { createContext, ReactNode, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";
import { createThemeStore, ThemeStore } from "./store";

type ThemeStoreApi = StoreApi<ThemeStore>;

const ThemeStoreContext = createContext<ThemeStoreApi | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ThemeStoreApi | undefined>(undefined);

  if (!storeRef.current) {
    storeRef.current = createThemeStore();
  }

  storeRef.current.subscribe((state) => {
    const theme = state.theme;

    localStorage.setItem("theme", theme);
    document.body.dataset.theme = theme;
  });

  document.body.dataset.theme = localStorage.getItem("theme") || "light";

  return (
    <ThemeStoreContext.Provider value={storeRef.current}>
      {children}
    </ThemeStoreContext.Provider>
  );
};

export const useThemeStore = <T,>(selector: (store: ThemeStore) => T): T => {
  const store = useContext(ThemeStoreContext);

  if (!store) {
    throw new Error("useThemeStore must be used within ThemeStoreProvider");
  }

  return useStore(store, selector);
};
