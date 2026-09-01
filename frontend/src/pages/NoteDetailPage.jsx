import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeftIcon,
  Trash2Icon,
} from "lucide-react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `${API_URL}/notes/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch note"
          );
        }

        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/notes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: note.title,
            content: note.content,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update note"
        );
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
      const response = await fetch(
        `${API_URL}/notes/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete note"
        );
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
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          Note not found
        </h1>

        <Link to="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-2xl p-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            Back
          </Link>

          <button
            type="button"
            className="btn btn-error btn-outline"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2Icon className="size-5" />

            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title mb-4 text-2xl">
              Edit Note
            </h1>

            <form onSubmit={handleUpdate}>
              <div className="form-control mb-4">
                <label className="label" htmlFor="title">
                  <span className="label-text">
                    Title
                  </span>
                </label>

                <input
                  id="title"
                  type="text"
                  className="input input-bordered w-full"
                  value={note.title}
                  onChange={(event) =>
                    setNote({
                      ...note,
                      title: event.target.value,
                    })
                  }
                  maxLength={100}
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label
                  className="label"
                  htmlFor="content"
                >
                  <span className="label-text">
                    Content
                  </span>
                </label>

                <textarea
                  id="content"
                  className="textarea textarea-bordered min-h-48 w-full"
                  value={note.content}
                  onChange={(event) =>
                    setNote({
                      ...note,
                      content: event.target.value,
                    })
                  }
                  maxLength={5000}
                  required
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;