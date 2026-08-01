import { ConfigProvider } from "antd";
import { HashRouter, Routes, Route } from "react-router-dom";
import { BoardPage } from "@/pages/board/ui/BoardPage";
import { DashboardPage } from "@/pages/dashboard/ui/DashboardPage";
import { HomePage } from "@/pages/home/ui/HomePage";
import { MainLayout } from "@/app/layout/MainLayout/MainLayout";
import { useEffect } from "react";
import { useBoardStore } from "@/entities/task/model/store";

export const App = () => {
  const fetchTasks = useBoardStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--color-purple)",
          borderRadius: 8,
          colorBgContainer: "#ffffff",
          colorBorder: "var(--color-light-grey)",
        },
      }}
    >
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/board" element={<BoardPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;
