import { CalendarEvent, Note, Task, ThemeColor, Widget } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface DashboardStore {
  // Hydration state
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  // theme
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;

  // widgets
  widgets: Widget[];
  // addWidget: (widget: Widget) => void;
  // removeWidget: (id: string) => void;

  reorderWidgets: (widgets: Widget[]) => void;

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

export const useStore = create<DashboardStore>()(
  persist(
    (set) => ({
      // Hydartion state
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      // theme
      theme: "purple",
      setTheme: (theme) => set({ theme }),

      // Widgets
      widgets: [
        { id: "1", type: "notes", title: "Quick Notes", position: 0 },
        { id: "2", type: "tasks", title: "My Tasks", position: 1 },
        { id: "3", type: "calendar", title: "Caldedar", position: 2 },
      ],

      reorderWidgets: (widgets) => set({ widgets }),
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
    }),
    {
      name: "dashboard-storage", // localStorage key name
      storage: createJSONStorage(() => localStorage), // Use localStorage
      // Only persist these fileds
      partialize: (state) => ({
        notes: state.notes,
        tasks: state.tasks,
        events: state.events,
        // theme: state.theme,
        // widgets: state.widgets
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
