import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import RateLimitedUI from "../components/RateLimitedUI";
import CategoryTabs from "../components/CategoryTabs";
import { useCategory } from "../context/CategoryContext";
import { useReminders } from "../hooks/useReminders";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const { selectedCategory } = useCategory();

  useReminders(notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/notes`,
          {
            credentials: "include",
          }
        );

        if (response.status === 429) {
          setIsRateLimited(true);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter(
          (note) => note.category === selectedCategory
        );

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

  return (
    <div className="min-h-full md:ml-64 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <p className="text-gray-600 mt-1">
              Organize and manage your thoughts
            </p>
          </div>

          <Link
            to="/create"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Note
          </Link>
        </div>

        {isRateLimited && <RateLimitedUI />}

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryTabs />
        </div>

        {/* Content */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {!isLoading && !isRateLimited && filteredNotes.length === 0 && (
          <div className="border border-gray-200 rounded-lg p-12 text-center bg-gray-50">
            <p className="text-gray-600">
              No notes yet. Create your first note to get started.
            </p>
          </div>
        )}

        {!isLoading && !isRateLimited && filteredNotes.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <Link
                key={note._id}
                to={`/note/${note._id}`}
                className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {note.title}
                  </h2>

                  <div className="flex items-center gap-2 shrink-0">
                    {note.reminder?.enabled && (
                      <span className="text-lg" title="Has reminder">
                        🔔
                      </span>
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

                {/* Card Body */}
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {note.content}
                </p>

                {/* Card Footer */}
                <p className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;





