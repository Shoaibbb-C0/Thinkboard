import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
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
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-12">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-secondary hover:text-base-content transition-colors"
      >
        <ArrowLeftIcon className="size-5" />
        Back to notes
      </Link>

      <div className="rounded-2xl border border-base-content/10 bg-base-100 shadow-sm p-8 md:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Create New Note
          </h1>
          <p className="text-secondary">
            Add a new note with category and optional reminder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              className="block text-sm font-semibold text-base-content mb-3"
              htmlFor="title"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter note title"
              className="input input-bordered w-full bg-base-100 text-base-content placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-base-content/20"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              maxLength={100}
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-base-content mb-3"
              htmlFor="category"
            >
              Category
            </label>

            {!showCustomInput ? (
              <div className="flex gap-3">
                <select
                  id="category"
                  className="select select-bordered flex-1 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-base-content/20"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
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
                  className="rounded-lg border border-base-content/20 px-4 py-3 font-medium transition-all hover:border-base-content/40 hover:bg-base-200"
                  onClick={() =>
                    setShowCustomInput(true)
                  }
                >
                  + Custom
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter custom category"
                  className="input input-bordered flex-1 bg-base-100 text-base-content placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-base-content/20"
                  value={customCategory}
                  onChange={(event) =>
                    setCustomCategory(
                      event.target.value
                    )
                  }
                  maxLength={50}
                />

                <button
                  type="button"
                  className="rounded-lg border border-base-content/20 px-4 py-3 font-medium transition-all hover:border-base-content/40 hover:bg-base-200"
                  onClick={() =>
                    setShowCustomInput(false)
                  }
                >
                  Use Category
                </button>
              </div>
            )}
          </div>

          <div>
            <ReminderForm
              initialReminder={reminder}
              onReminderChange={
                handleReminderChange
              }
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-base-content mb-3"
              htmlFor="content"
            >
              Content
            </label>

            <textarea
              id="content"
              placeholder="Write your note..."
              className="textarea textarea-bordered w-full min-h-64 bg-base-100 text-base-content placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-base-content/20 p-4 font-base resize-none"
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              maxLength={5000}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/"
              className="rounded-lg border border-base-content/20 px-6 py-3 font-medium transition-all hover:border-base-content/40 hover:bg-base-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-base-content px-6 py-3 font-medium text-base-100 transition-all hover:shadow-md active:scale-95"
              disabled={isSaving}
            >
              {isSaving ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;


