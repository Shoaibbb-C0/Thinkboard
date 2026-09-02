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
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-2xl border border-base-content/10 bg-linear-to-r from-base-100 to-base-100 px-8 py-5 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <Link
                to="/"
                className="inline-block font-mono text-4xl font-black tracking-tight text-base-content transition-transform hover:scale-105"
              >
                THINKBOARD
              </Link>

              {user && (
                <p className="mt-2 text-xs font-semibold tracking-widest text-secondary uppercase">
                  Welcome, {user.name.toUpperCase()}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/create"
                className="flex items-center gap-2 rounded-lg bg-base-content px-4 py-2.5 font-medium text-base-100 transition-all hover:shadow-md active:scale-95"
              >
                <PlusIcon className="size-5" />
                <span className="hidden sm:inline">
                  New Note
                </span>
              </Link>

              <button
                type="button"
                className="rounded-lg border border-base-content/20 px-4 py-2.5 transition-all hover:border-base-content/40 hover:bg-base-200 active:scale-95"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOutIcon className="size-5" />
                <span className="hidden sm:inline ml-2">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


