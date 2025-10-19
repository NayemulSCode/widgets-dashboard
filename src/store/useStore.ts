import { CalendarEvent, Note, Task, ThemeColor, Widget } from "@/types";
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

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // Calendar
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  deleteEvent: (id: string) => void;
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

  // tasks
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((n) => n.id !== id),
    })),
  // calender events
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: crypto.randomUUID() }],
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((n) => n.id !== id),
    })),
}));
