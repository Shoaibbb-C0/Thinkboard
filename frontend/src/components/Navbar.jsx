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
    <aside className="sticky top-4 h-fit w-64 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg p-6">
      <div className="flex flex-col gap-8">
        {/* Brand */}
        <Link
          to="/"
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
            <span className="font-['Poppins'] text-2xl font-black text-primary">
              TB
            </span>
          </div>
          <p className="text-xs font-light tracking-widest text-base-content/60 uppercase">
            Thinkboard
          </p>
        </Link>

        {/* User Info */}
        {user && (
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs font-light text-base-content/70">
              Welcome
            </p>
            <p className="text-sm font-['Outfit'] font-semibold text-base-content truncate">
              {user.name}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
          <Link
            to="/create"
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 font-['Outfit'] text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            <PlusIcon className="size-4" />
            New Note
          </Link>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-['Outfit'] text-sm font-medium text-base-content transition-all hover:bg-white/10 hover:border-white/30 active:scale-95 backdrop-blur-sm"
            onClick={handleLogout}
          >
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;





