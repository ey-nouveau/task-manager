import { BoardPage } from "@/pages/board/ui";
import { DashboardPage } from "@/pages/dashboard/page";
import { HomePage } from "@/pages/home";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import { DashboardPageLayout } from "@/pages/dashboard/layout/layout";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/dashboard" element={<DashboardPageLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="tasks" element={<DashboardPage />} />
            <Route path="habits" element={<DashboardPage />} />
            <Route path="settings" element={<DashboardPage />} />
          </Route>

          <Route path="/board" element={<BoardPage />} />
          <Route path="/integrations" element={<BoardPage />} />
          <Route path="/preferences" element={<BoardPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
