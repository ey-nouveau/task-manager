import { useBoardStore } from "../../store/useBoardStore";
import { BoardColumn } from "../organisms/BoardColumn";
import { TaskDetailsSidebar } from "../organisms/TaskDetailsSidebar";
import { Spin } from "antd";

export const BoardPage = () => {
  const columns = useBoardStore((state) => state.columns);
  const activeTaskId = useBoardStore((state) => state.activeTaskId);
  const setActiveTask = useBoardStore((state) => state.setActiveTask);
  const tasks = useBoardStore((state) => state.tasks);
  const isLoading = useBoardStore((state) => state.isLoading);

  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  if (isLoading && tasks.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        height: "100%",
        boxSizing: "border-box",
        overflowX: "auto",
        alignItems: "flex-start",
        paddingBottom: "24px"
      }}
    >
      {columns.map((col, index) => (
        <BoardColumn key={col.id} column={col} index={index} />
      ))}

      <TaskDetailsSidebar
        task={activeTask}
        isOpen={!!activeTaskId}
        onClose={() => setActiveTask(null)}
      />
    </div>
  );
};