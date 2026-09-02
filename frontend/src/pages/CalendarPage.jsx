import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CalendarView from "../components/CalendarView";
import { useReminders } from "../hooks/useReminders";

const CalendarPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    navigate("/create", {
      state: { selectedDate: date },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-full md:ml-64 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full md:ml-64 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">
            View your notes organized by date
          </p>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg border border-gray-200">
          <CalendarView
            notes={notes}
            onAddNote={handleAddNote}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

