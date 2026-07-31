import { useBoardStore } from "../../store/useBoardStore";
import { BoardColumn } from "../organisms/BoardColumn";
import { TaskDetailsModal } from "../organisms/TaskDetailsModal";

export const BoardPage = ({ tasks }: { tasks: any[] }) => {
  const columns = useBoardStore((state) => state.columns);
  const activeTaskId = useBoardStore((state) => state.activeTaskId);
  const setActiveTask = useBoardStore((state) => state.setActiveTask);

  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        padding: "24px",
        height: "100vh",
        boxSizing: "border-box",
        overflowX: "auto",
        alignItems: "flex-start",
      }}
    >
      {columns.map((col, index) => (
        <BoardColumn key={col.id} column={col} index={index} />
      ))}

      <TaskDetailsModal
        task={activeTask}
        isOpen={!!activeTaskId}
        onClose={() => setActiveTask(null)}
      />
    </div>
  );
};
