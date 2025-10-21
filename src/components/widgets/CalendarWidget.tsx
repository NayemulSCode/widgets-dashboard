import { useStore } from "@/store/useStore";
import { THEMES } from "@/types";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
const COLORS = ["bg-yellow-200", "bg-pink-200", "bg-blue-200", "bg-green-200"];

const CalendarWidget = () => {
  const [newEvent, setNewEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const theme = useStore((state) => state.theme);
  const events = useStore((state) => state.events);
  console.log("events", events);
  const addEvent = useStore((state) => state.addEvent);
  const deleteEvent = useStore((state) => state.deleteEvent);
  const currentTheme = THEMES[theme];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.trim() && selectedDate) {
      addEvent({
        title: newEvent,
        date: new Date(selectedDate),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      setNewEvent("");
      setSelectedDate("");
    }
  };
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Event title..."
          className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className={`${currentTheme.primary} ${currentTheme.hover} px-4 py-2 text-white rounded-lg transition-colors`}
          >
            <Plus size={20} />
          </button>
        </div>
      </form>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-slate-300 text-center py-8">No events scheduled</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`${event.color} flex items-start gap-3 p-3 rounded-lg  text-slate-900 group`}
            >
              <div className={`w-1 h-full rounded-full`} />
              <CalendarIcon size={20} className="text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-white font-medium">{event.title}</p>
                <p className="text-slate-400 text-sm">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => deleteEvent(event.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400"
              >
                <Plus size={16} className="rotate-45" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
