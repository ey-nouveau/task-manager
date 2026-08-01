import { create } from 'zustand';

export type WidgetType = 'iframe' | 'native_chart' | 'text_note';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  url?: string;
  content?: string;
}

interface WidgetState {
  widgets: Widget[];
  isModalOpen: boolean;
  addWidget: (widget: Omit<Widget, 'id'>) => void;
  removeWidget: (id: string) => void;
  setModalOpen: (isOpen: boolean) => void;
}

export const useWidgetStore = create<WidgetState>((set) => ({
  widgets: [],
  isModalOpen: false,

  addWidget: (widget) => set((state) => ({
    widgets: [...state.widgets, { ...widget, id: crypto.randomUUID() }]
  })),

  removeWidget: (id) => set((state) => ({
    widgets: state.widgets.filter(w => w.id !== id)
  })),

  setModalOpen: (isOpen) => set({ isModalOpen: isOpen })
}));