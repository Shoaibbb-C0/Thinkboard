import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CalendarView from "../components/CalendarView";
import { useReminders } from "../hooks/useReminders";

const CalendarPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to load notes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = (date) => {
    // Navigate to create page with date pre-selected
    navigate("/create", {
      state: { selectedDate: date },
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <div className="flex items-center justify-center py-16">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-base-content">
          Calendar View
        </h1>
        <p className="text-base text-secondary">
          View your notes organized by date
        </p>
      </div>

      <CalendarView
        notes={notes}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default CalendarPage;
