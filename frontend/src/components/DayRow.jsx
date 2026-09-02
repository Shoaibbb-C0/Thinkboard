import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Clock } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const DayRow = ({ date, notes, onAddNote }) => {
  const dayNotes = notes.filter((note) => {
    const noteDate = new Date(note.createdAt);
    return noteDate.toDateString() === date.toDateString();
  });

  const getCategoryColor = (category) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-green-100 text-green-700",
      "bg-red-100 text-red-700",
      "bg-yellow-100 text-yellow-700",
      "bg-pink-100 text-pink-700",
      "bg-gray-100 text-gray-700",
    ];
    const hash = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <div
      className={`border rounded-lg transition-all ${
        isToday
          ? "border-primary bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b ${
          isToday
            ? "border-primary/20 bg-blue-50"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div>
          <p className="font-semibold text-gray-900">
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
          {isToday && (
            <span className="text-xs text-primary font-medium">
              Today
            </span>
          )}
        </div>

        <button
          onClick={() => onAddNote(date)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
          title="Add note for this day"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {dayNotes.length === 0 ? (
          <p className="text-sm text-gray-500">
            No notes for this day
          </p>
        ) : (
          <div className="space-y-3">
            {dayNotes.map((note) => (
              <Link
                key={note._id}
                to={`/note/${note._id}`}
                className="block border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="flex-1 font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                    {note.title}
                  </h3>

                  <div className="flex items-center gap-2 shrink-0">
                    {note.reminder?.enabled && (
                      <Clock className="w-4 h-4 text-yellow-600" title="Has reminder" />
                    )}
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded ${getCategoryColor(
                        note.category
                      )}`}
                    >
                      {note.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">
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

