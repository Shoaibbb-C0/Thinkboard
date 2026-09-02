import { Link, useNavigate } from "react-router-dom";
import {
  LogOutIcon,
  PlusIcon,
  Menu,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { useSideNav } from "../context/SideNavContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toggleSideNav } = useSideNav();

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-base-100 py-4 shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-base-content/10 bg-linear-to-r from-base-100 to-base-100 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-lg p-2 transition-all hover:bg-base-200 active:scale-95 md:hidden"
                onClick={toggleSideNav}
                title="Toggle sidebar"
              >
                <Menu className="size-5" />
              </button>

              <Link
                to="/"
                className="inline-block font-mono text-4xl font-black tracking-tight text-base-content transition-transform hover:scale-105"
              >
                THINKBOARD
              </Link>
            </div>

            {user && (
              <p className="hidden text-xs font-semibold tracking-widest text-secondary uppercase sm:block">
                Welcome, {user.name.toUpperCase()}
              </p>
            )}

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



