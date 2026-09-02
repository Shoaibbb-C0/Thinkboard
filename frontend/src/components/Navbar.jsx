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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 md:pl-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-lg p-2 transition-all hover:bg-white/20 active:scale-95 md:hidden"
                onClick={toggleSideNav}
                title="Toggle sidebar"
              >
                <Menu className="size-5 text-base-content" />
              </button>

              <Link
                to="/"
                className="inline-block font-['Poppins'] text-2xl font-black tracking-tight text-primary transition-transform hover:scale-105"
              >
                TB
              </Link>
            </div>

            {user && (
              <p className="hidden text-xs font-light tracking-widest text-base-content/70 uppercase sm:block">
                {user.name}
              </p>
            )}

            <div className="flex items-center gap-2">
              <Link
                to="/create"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-['Outfit'] text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">
                  New
                </span>
              </Link>

              <button
                type="button"
                className="rounded-full border border-base-content/20 bg-white/10 p-2 backdrop-blur-sm transition-all hover:border-base-content/40 hover:bg-white/20 active:scale-95"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOutIcon className="size-4 text-base-content" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;




