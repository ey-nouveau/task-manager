import { create } from 'zustand';
import { apiClient } from '../api/api';

export interface Task {
  id: string | number;
  title: string;
  description: string;
  status: string;
  created_at?: string;
  created_by?: string;
  assigned_to?: string;
}

export interface Column {
  id: string;
  title: string;
}

interface BoardState {
  columns: Column[];
  tasks: Task[];
  activeTaskId: string | number | null;
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (status: string, title: string) => Promise<void>;
  updateTask: (taskId: string | number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string | number) => Promise<void>;
  moveTask: (taskId: string | number, targetStatus: string) => Promise<void>;
  setActiveTask: (id: string | number | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  columns: [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ],
  tasks: [],
  activeTaskId: null,
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const tasks = await apiClient.get<Task[]>('/tasks');
      set({ tasks: tasks || [], isLoading: false });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ isLoading: false });
    }
  },

  addTask: async (status, title) => {
    try {
      const newTask = await apiClient.post<Task>('/tasks', { title, status, description: '' });
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  updateTask: async (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    }));
    try {
      await apiClient.put(`/tasks/${taskId}`, updates);
    } catch (error) {
      console.error('Failed to update task:', error);
      get().fetchTasks(); 
    }
  },

  deleteTask: async (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
      activeTaskId: state.activeTaskId === taskId ? null : state.activeTaskId,
    }));
    try {
      await apiClient.delete(`/tasks/${taskId}`);
    } catch (error) {
      console.error('Failed to delete task:', error);
      get().fetchTasks();
    }
  },

  moveTask: async (taskId, targetStatus) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t)),
    }));
    try {
      await apiClient.put(`/tasks/${taskId}`, { status: targetStatus }); 
    } catch (error) {
      console.error('Failed to move task:', error);
      get().fetchTasks();
    }
  },

  setActiveTask: (id) => set({ activeTaskId: id }),
}));