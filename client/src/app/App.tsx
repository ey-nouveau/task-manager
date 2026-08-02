import { useEffect } from "react";
import { useBoardStore } from "@/entities/task/model/store";
import { ThemeProvider } from "@/shared/stores/theme/provider";
import { AppRouter } from "./router";

export const App = () => {
  const fetchTasks = useBoardStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
