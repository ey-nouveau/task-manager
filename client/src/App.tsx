import { ConfigProvider } from "antd";
import { BoardPage } from "./components/pages/BoardPage";
import { useEffect, useState } from "react";
import { apiClient } from "./api/api";

export const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    apiClient.get("/tasks").then(setTasks);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      apiClient
        .post("/tasks", {
          title: "Title",
          description: "Description",
          createdBy: "Petr",
          assignedTo: "Sergey",
        })
        .then(console.log);
    }, 2000);
  }, []);

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
      <BoardPage tasks={tasks} />
    </ConfigProvider>
  );
};

export default App;
