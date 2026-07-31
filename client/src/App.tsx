import { ConfigProvider } from "antd";
import { BoardPage } from "./components/pages/BoardPage";
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
          colorPrimary: "#000000",
          borderRadius: 0,
          colorBgContainer: "#ffffff",
          colorBorder: "#000000",
        },
      }}
    >
      <BoardPage />
    </ConfigProvider>
  );
};

export default App;
