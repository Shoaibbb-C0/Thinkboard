import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ReminderForm from "../components/ReminderForm";
import { useCategory } from "../context/CategoryContext";

const API_URL = import.meta.env.VITE_API_URL;

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategory();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`${API_URL}/notes/${id}`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch note");
        }

        setNote(data);
        setShowCustomInput(!categories.includes(data.category));
        if (!categories.includes(data.category)) {
          setCustomCategory(data.category);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, categories]);

  const handleReminderChange = (reminderData) => {
    setNote({ ...note, reminder: reminderData });
  };

  const handleCategoryChange = (newCategory) => {
    setNote({ ...note, category: newCategory });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const finalCategory = showCustomInput
      ? customCategory.trim()
      : note.category;

    if (!finalCategory) {
      toast.error("Please select or enter a category");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: note.title,
          content: note.content,
          category: finalCategory,
          reminder: note.reminder,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update note");
      }

      setNote(data);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!shouldDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-full md:ml-64 bg-white flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-full md:ml-64 bg-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Note not found</h1>
        <Link
          to="/"
          className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-full md:ml-64 bg-white">
      <div className="max-w-2xl mx-auto px-6 md:px-8 py-8">
        {/* Header with Back & Delete */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-5 h-5" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Edit Note
          </h1>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Title */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={note.title}
                onChange={(event) =>
                  setNote({ ...note, title: event.target.value })
                }
                maxLength={100}
              />
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-2"
                htmlFor="category"
              >
                Category
              </label>

              {!showCustomInput ? (
                <div className="flex gap-2">
                  <select
                    id="category"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    value={note.category}
                    onChange={(event) =>
                      handleCategoryChange(event.target.value)
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => setShowCustomInput(true)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter custom category"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    value={customCategory}
                    onChange={(event) =>
                      setCustomCategory(event.target.value)
                    }
                    maxLength={50}
                  />

                  <button
                    type="button"
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => setShowCustomInput(false)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Reminder */}
            <ReminderForm
              initialReminder={note.reminder}
              onReminderChange={handleReminderChange}
            />

            {/* Content */}
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                id="content"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none min-h-64"
                value={note.content}
                onChange={(event) =>
                  setNote({ ...note, content: event.target.value })
                }
                maxLength={5000}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

