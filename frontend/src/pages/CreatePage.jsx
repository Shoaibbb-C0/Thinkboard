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
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-2xl p-4 py-10">
        <Link to="/" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to notes
        </Link>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title mb-4 text-2xl">
              Create New Note
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label" htmlFor="title">
                  <span className="label-text">Title</span>
                </label>

                <input
                  id="title"
                  type="text"
                  placeholder="Enter note title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  maxLength={100}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label" htmlFor="category">
                  <span className="label-text">
                    Category
                  </span>
                </label>

                {!showCustomInput ? (
                  <div className="flex gap-2">
                    <select
                      id="category"
                      className="select select-bordered w-full"
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
                      className="btn btn-outline"
                      onClick={() =>
                        setShowCustomInput(true)
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter custom category"
                      className="input input-bordered w-full"
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
                      className="btn btn-outline"
                      onClick={() =>
                        setShowCustomInput(false)
                      }
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <ReminderForm
                initialReminder={reminder}
                onReminderChange={
                  handleReminderChange
                }
              />

              <div className="form-control mb-6">
                <label className="label" htmlFor="content">
                  <span className="label-text">
                    Content
                  </span>
                </label>

                <textarea
                  id="content"
                  placeholder="Write your note..."
                  className="textarea textarea-bordered min-h-40 w-full"
                  value={content}
                  onChange={(event) =>
                    setContent(event.target.value)
                  }
                  maxLength={5000}
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

