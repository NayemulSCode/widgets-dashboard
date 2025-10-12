import { ThemeColor } from "@/types";
import { create } from "zustand";
interface DashboardStore {
  // theme
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

export const useStore = create<DashboardStore>((set) => ({
  // theme
  theme: "purple",
  setTheme: (theme) => set({ theme }),
}));
