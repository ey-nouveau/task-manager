import { HashRouter, Routes, Route } from "react-router-dom";
import { BoardPage } from "@/pages/board/ui/BoardPage";
import { DashboardPage } from "@/pages/dashboard/ui";
import { HomePage } from "@/pages/home";
import { MainLayout } from "@/app/layout/main-layout";
import { useEffect } from "react";
import { useBoardStore } from "@/entities/task/model/store";
import { ThemeProvider } from "@/shared/stores/theme/provider";

export const App = () => {
  const fetchTasks = useBoardStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/board" element={<BoardPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
