import { useStore } from "@/store/useStore";
import { THEMES } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
const COLORS = ["bg-yellow-200", "bg-pink-200", "bg-blue-200", "bg-green-200"];

const NotesWidget = () => {
  const [newNote, setNewNote] = useState<string>("");
  const theme = useStore((state) => state.theme);
  const notes = useStore((state) => state.notes);
  const addNote = useStore((state) => state.addNote);
  const deleteNote = useStore((state) => state.deleteNote);

  console.log("🚀 ~ NotesWidget ~ notes:", notes);
  const currentTheme = THEMES[theme];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote({
        content: newNote,
        createAt: new Date(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      setNewNote("");
    }
  };
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
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
        {notes.length === 0 ? (
          <p className="text-slate-300 text-center py-8">
            No notes yet. Add one!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`${note.color} p-4 rounded-lg shadow-md text-slate-900 group relative`}
            >
              <p className="pr-8">{note.content}</p>
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-600"
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

export default NotesWidget;
