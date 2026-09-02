import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-['Poppins'] font-bold tracking-tight text-base-content">
            My Notes
          </h1>
          <p className="text-base text-base-content/60 font-['Outfit']">
            Organize and manage your thoughts
          </p>
        </div>

        {isRateLimited && <RateLimitedUI />}

        <CategoryTabs />

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {!isLoading && !isRateLimited &&
          filteredNotes.length === 0 && (
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl py-16 text-center shadow-lg">
              <p className="text-lg font-['Outfit'] text-base-content/60">
                No notes yet. Create your first note
                to get started.
              </p>
            </div>
          )}

        {!isLoading && !isRateLimited &&
          filteredNotes.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <Link
                  key={note._id}
                  to={`/note/${note._id}`}
                  className="group rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg transition-all duration-200 hover:border-white/30 hover:shadow-xl hover:bg-white/15 p-6 flex flex-col"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h2 className="flex-1 text-lg font-['Poppins'] font-semibold text-base-content line-clamp-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h2>

                    <div className="shrink-0 space-x-2 flex items-center">
                      {note.reminder?.enabled && (
                        <span
                          className="text-lg"
                          title="Has reminder"
                        >
                          🔔
                        </span>
                      )}
                      <div
                        className={`badge badge-sm ${getCategoryColor(
                          note.category
                        )}`}
                      >
                        {note.category}
                      </div>
                    </div>
                  </div>

                  <p className="mb-6 flex-1 text-sm font-['Outfit'] text-base-content/70 line-clamp-3">
                    {note.content}
                  </p>

                  <p className="text-xs font-['Outfit'] font-medium text-base-content/50">
                    {new Date(
                      note.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>
          )}
      </main>
    </div>
  );
};

export default HomePage;



