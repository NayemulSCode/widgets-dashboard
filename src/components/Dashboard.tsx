"use client";
import { useStore } from "@/store/useStore";
import { THEMES } from "@/types";
import ThemeSelector from "./ThemeSelector";

const Dashboard = () => {
  const theme = useStore((state) => state.theme);
  const currentTheme = THEMES[theme];
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} p-6 transition-all duration-500`}
    >
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-slate-300">
            Our Custom Gragable widgets and Theme.
          </p>
        </div>
        <ThemeSelector />
      </header>
    </div>
  );
};

export default Dashboard;
