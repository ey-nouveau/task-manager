import { ConfigProvider } from "antd";
import { HashRouter, Routes, Route } from "react-router-dom";
import { BoardPage } from "./components/pages/BoardPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { MainLayout } from "./components/layout/MainLayout";
import { useEffect } from "react";
import { useBoardStore } from "./store/useBoardStore";

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
            <Route path="/" element={<DashboardPage />} />
            <Route path="/board" element={<BoardPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;
