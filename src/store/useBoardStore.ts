import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
}

interface BoardState {
  columns: Column[];
  tasks: Task[];
  activeTaskId: string | null;
  addTask: (columnId: string, title: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, targetColumnId: string) => void;
  setActiveTask: (id: string | null) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ],
  tasks: [],
  activeTaskId: null,
  addTask: (columnId, title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: uuidv4(), title, description: '', columnId }],
    })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
      activeTaskId: state.activeTaskId === taskId ? null : state.activeTaskId,
    })),
  moveTask: (taskId, targetColumnId) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, columnId: targetColumnId } : t)),
    })),
  setActiveTask: (id) => set({ activeTaskId: id }),
}));