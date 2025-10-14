import { Note, ThemeColor, Widget } from "@/types";
import { create } from "zustand";
interface DashboardStore {
  // theme
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;

  // widgets
  widgets: Widget[];
  // addWidget: (widget: Widget) => void;
  // removeWidget: (id: string) => void;

  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, "id">) => void;
  deleteNote: (id: string) => void;
}

export const useStore = create<DashboardStore>((set) => ({
  // theme
  theme: "purple",
  setTheme: (theme) => set({ theme }),

  // Widgets
  widgets: [
    { id: "1", type: "notes", title: "Quick Notes", position: 0 },
    { id: "2", type: "tasks", title: "My Tasks", position: 1 },
    { id: "3", type: "calendar", title: "Caldedar", position: 2 },
  ],

  // notes
  notes: [],
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, { ...note, id: crypto.randomUUID() }],
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),
}));
