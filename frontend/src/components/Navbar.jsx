import { useNavigate } from "react-router-dom";
import { LogOutIcon, Search } from "lucide-react";
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
    <nav className="border-b border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative hidden md:block flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600 hidden sm:block">
            {user.name}
          </span>
        )}

        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOutIcon className="size-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
