import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
          credentials: "include",
        });

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

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <main className="mx-auto max-w-6xl p-4">
        {isLoading && <p className="text-center text-lg">Loading notes...</p>}

        {!isLoading && !isRateLimited && notes.length === 0 && (
          <p className="text-center text-lg">
            No notes yet. Create your first note.
          </p>
        )}

        {!isLoading && !isRateLimited && notes.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Link
                key={note._id}
                to={`/note/${note._id}`}
                className="card border border-base-content/10 bg-base-100 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="card-body">
                  <h2 className="card-title">{note.title}</h2>

                  <p className="line-clamp-3">{note.content}</p>

                  <p className="mt-4 text-xs opacity-60">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
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
