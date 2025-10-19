"use client";
import { useStore } from "@/store/useStore";
import { THEMES } from "@/types";
import ThemeSelector from "./ThemeSelector";
import WidgetContainer from "./WidgetContainer";
import CalendarWidget from "./widgets/CalendarWidget";
import NotesWidget from "./widgets/NotesWidget";
import TasksWidget from "./widgets/TasksWidget";

const Dashboard = () => {
  const theme = useStore((state) => state.theme);
  const widgets = useStore((state) => state.widgets);
  const currentTheme = THEMES[theme];
  const renderWiget = (widget: any) => {
    switch (widget.type) {
      case "notes":
        return <NotesWidget />;
      case "tasks":
        return <TasksWidget />;
      case "calendar":
        return <CalendarWidget />;
      default:
        return null;
    }
  };
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <WidgetContainer key={widget.id} widget={widget}>
            {renderWiget(widget)}
          </WidgetContainer>
          // <p className="text-white" >
          //   {widgets.title}key={widget.id}
          // </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
