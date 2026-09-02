import { Link, useNavigate } from "react-router-dom";
import {
  LogOutIcon,
  PlusIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Could not log out");
    }
  };

  return (
    <header className="bg-base-100 py-6">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-base-content/10 bg-base-100 px-8 py-4 shadow-sm">
          <div className="flex-1">
            <Link
              to="/"
              className="block font-mono text-3xl font-black tracking-tight text-base-content"
            >
              THINKBOARD
            </Link>

            {user && (
              <p className="mt-1 text-xs font-medium tracking-wide text-secondary">
                Welcome, {user.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/create"
              className="btn btn-sm btn-primary gap-1 px-4"
            >
              <PlusIcon className="size-4" />
              <span className="hidden sm:inline">
                New Note
              </span>
            </Link>

            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={handleLogout}
            >
              <LogOutIcon className="size-4" />
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
