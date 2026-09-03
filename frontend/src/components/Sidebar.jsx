import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PlusIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

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

  const navigation = [
    {
      label: "All notes",
      path: "/",
      icon: HomeIcon,
    },
    {
      label: "New note",
      path: "/create",
      icon: PlusIcon,
    },
  ];

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-soft-border bg-pearl transition-[width] duration-300 ${
        isCollapsed ? "w-[76px]" : "w-[260px]"
      }`}
    >
      <div className="flex h-[78px] items-center justify-between border-b border-soft-border px-4">
        {!isCollapsed && (
          <Link
            to="/"
            className="text-2xl font-bold tracking-[-0.055em] text-ink"
          >
            Thinkboard
          </Link>
        )}

        {isCollapsed && (
          <Link
            to="/"
            aria-label="Thinkboard home"
            className="mx-auto flex size-10 items-center justify-center rounded-xl bg-cobalt text-white"
          >
            <FileTextIcon className="size-5" />
          </Link>
        )}

        {!isCollapsed && (
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl text-warm-gray transition hover:bg-cobalt-soft hover:text-cobalt"
            onClick={() => setIsCollapsed(true)}
            aria-label="Collapse sidebar"
          >
            <PanelLeftCloseIcon className="size-5" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button
          type="button"
          className="mx-auto mt-4 flex size-10 items-center justify-center rounded-xl text-warm-gray transition hover:bg-cobalt-soft hover:text-cobalt"
          onClick={() => setIsCollapsed(false)}
          aria-label="Expand sidebar"
        >
          <PanelLeftOpenIcon className="size-5" />
        </button>
      )}

      <nav className="flex flex-1 flex-col gap-2 px-3 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              title={isCollapsed ? item.label : undefined}
              className={`flex min-h-12 items-center rounded-xl transition ${
                isCollapsed
                  ? "justify-center px-0"
                  : "gap-3 px-4"
              } ${
                active
                  ? "bg-cobalt-soft font-semibold text-cobalt"
                  : "text-warm-gray hover:bg-base-200 hover:text-ink"
              }`}
            >
              <Icon className="size-5 shrink-0" />

              {!isCollapsed && (
                <span className="text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-soft-border p-3">
        {!isCollapsed && user && (
          <div className="mb-3 px-3">
            <p className="truncate text-sm font-semibold text-ink">
              {user.name}
            </p>

            <p className="truncate text-xs text-warm-gray">
              {user.email}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          title={isCollapsed ? "Log out" : undefined}
          aria-label="Log out"
          className={`flex min-h-12 w-full items-center rounded-xl text-warm-gray transition hover:bg-red-50 hover:text-error ${
            isCollapsed
              ? "justify-center"
              : "gap-3 px-4"
          }`}
        >
          <LogOutIcon className="size-5 shrink-0" />

          {!isCollapsed && (
            <span className="text-sm font-semibold">
              Log out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;