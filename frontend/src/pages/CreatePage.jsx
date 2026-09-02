import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import ReminderForm from "../components/ReminderForm";
import { useCategory } from "../context/CategoryContext";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [customCategory, setCustomCategory] = useState("");
  const [reminder, setReminder] = useState({
    enabled: false,
    dateTime: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const navigate = useNavigate();
  const { categories } = useCategory();

  const handleReminderChange = (reminderData) => {
    setReminder(reminderData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please enter both title and content");
      return;
    }

    const finalCategory = showCustomInput
      ? customCategory.trim()
      : category;

    if (!finalCategory) {
      toast.error("Please select or enter a category");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            content,
            category: finalCategory,
            reminder,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Could not create note");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-full md:ml-64 bg-white">
      <div className="max-w-2xl mx-auto px-6 md:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to notes</span>
        </Link>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Note
            </h1>
            <p className="text-gray-600 mt-1">
              Add a new note with category and optional reminder
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter note title"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
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
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
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
                    + Custom
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
                    Use
                  </button>
                </div>
              )}
            </div>

            {/* Reminder */}
            <ReminderForm
              initialReminder={reminder}
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
                placeholder="Write your note..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none min-h-64 font-base"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                maxLength={5000}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Link
                to="/"
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;



