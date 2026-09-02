import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import CategoryTabs from "../components/CategoryTabs";
import { useCategory } from "../context/CategoryContext";
import { useReminders } from "../hooks/useReminders";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] =
    useState(false);

  const { selectedCategory } = useCategory();

  // Set up reminders
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

  // Filter notes by selected category
  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter(
          (note) => note.category === selectedCategory
        );

  // Get category color (deterministic based on category name)
  const getCategoryColor = (category) => {
    const colors = [
      "badge-primary",
      "badge-secondary",
      "badge-accent",
      "badge-info",
      "badge-success",
      "badge-warning",
      "badge-error",
    ];
    const hash = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <main className="mx-auto max-w-6xl p-4">
        <CategoryTabs />

        {isLoading && (
          <p className="text-center text-lg">
            Loading notes...
          </p>
        )}

        {!isLoading && !isRateLimited &&
          filteredNotes.length === 0 && (
            <p className="text-center text-lg">
              No notes yet. Create your first note.
            </p>
          )}

        {!isLoading && !isRateLimited &&
          filteredNotes.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <Link
                  key={note._id}
                  to={`/note/${note._id}`}
                  className="card border border-base-content/10 bg-base-100 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="card-body">
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="card-title">
                        {note.title}
                      </h2>

                      <div
                        className={`badge ${getCategoryColor(
                          note.category
                        )}`}
                      >
                        {note.category}
                      </div>
                    </div>

                    <p className="line-clamp-3">
                      {note.content}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs opacity-60">
                        {new Date(
                          note.createdAt
                        ).toLocaleDateString()}
                      </p>

                      {note.reminder?.enabled && (
                        <span className="text-lg">
                          🔔
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </main>
    </div>
  );
};

export default HomePage;

