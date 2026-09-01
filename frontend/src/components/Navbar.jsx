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
    <header className="border-b border-base-content/10 bg-base-300">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="font-mono text-3xl font-bold tracking-tighter text-primary"
            >
              Thinkboard
            </Link>

            {user && (
              <p className="mt-1 text-sm opacity-70">
                Welcome, {user.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/create"
              className="btn btn-primary"
            >
              <PlusIcon className="size-5" />
              <span className="hidden sm:inline">
                New Note
              </span>
            </Link>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleLogout}
            >
              <LogOutIcon className="size-5" />
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