import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2Icon, PlusIcon, ClockIcon } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const DayRow = ({ date, notes, onAddNote }) => {
  const dayNotes = notes.filter((note) => {
    const noteDate = new Date(note.createdAt);
    return (
      noteDate.toDateString() === date.toDateString()
    );
  });

  const getCategoryColor = (category) => {
    const colors = [
      "from-slate-900 to-slate-800",
      "from-slate-800 to-slate-700",
      "from-slate-700 to-slate-600",
      "from-slate-600 to-slate-500",
      "from-slate-500 to-slate-400",
      "from-slate-400 to-slate-300",
      "from-slate-300 to-slate-200",
    ];
    const hash = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const isToday =
    date.toDateString() === new Date().toDateString();

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isToday
          ? "border-base-content/30 bg-base-100 shadow-md"
          : "border-base-content/10 bg-base-100 hover:border-base-content/20"
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-t-xl px-6 py-4 ${
          isToday ? "bg-base-content text-base-100" : "bg-base-200"
        }`}
      >
        <div>
          <p className="text-sm font-semibold">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {isToday && (
            <span className="text-xs opacity-75">
              Today
            </span>
          )}
        </div>

        <button
          onClick={() => onAddNote(date)}
          className="flex items-center gap-2 rounded-lg bg-base-content px-3 py-2 text-xs font-medium text-base-100 transition-all hover:shadow-md active:scale-95"
          title="Add note for this day"
        >
          <PlusIcon className="size-4" />
          Add
        </button>
      </div>

      <div className="p-6">
        {dayNotes.length === 0 ? (
          <p className="text-sm text-secondary">
            No notes for this day
          </p>
        ) : (
          <div className="space-y-3">
            {dayNotes.map((note) => (
              <Link
                key={note._id}
                to={`/note/${note._id}`}
                className="block rounded-lg border border-base-content/10 bg-base-200 p-4 transition-all hover:border-base-content/20 hover:bg-base-100"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="flex-1 font-semibold text-base-content line-clamp-2 group-hover:text-primary">
                    {note.title}
                  </h3>

                  <div className="flex shrink-0 items-center gap-2">
                    {note.reminder?.enabled && (
                      <span
                        className="text-lg"
                        title="Has reminder"
                      >
                        🔔
                      </span>
                    )}
                    <div className="badge badge-sm badge-primary">
                      {note.category}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-secondary line-clamp-2">
                  {note.content}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayRow;
