import { useStore } from "@/store/useStore";
import { THEMES } from "@/types";
import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const TasksWidget = () => {
  const [newTask, setNewTask] = useState("");
  const theme = useStore((state) => state.theme);
  const addTask = useStore((state) => state.addTask);
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);

  const tasks = useStore((state) => state.tasks);
  console.log("tasks", tasks);
  const currentTheme = THEMES[theme];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({
        title: newTask,
        completed: false,
      });
      setNewTask("");
    }
  };
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a quick note..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className={`${currentTheme.primary} ${currentTheme.hover} px-4 py-2 text-white rounded-lg transition-colors`}
        >
          <Plus size={20} />
        </button>
      </form>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-slate-300 text-center py-8">
            No tasks yet. Add one!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? `${currentTheme.primary} border-transparent`
                    : "border-slate-400 hover:border-white/50"
                }`}
              >
                {task.completed && <Check size={16} className="text-white" />}
              </button>
              <span
                className={`flex-1 text-white ${
                  task.completed ? "line-through text-slate-400" : ""
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksWidget;
