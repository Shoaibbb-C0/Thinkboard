import { Link, useLocation } from "react-router-dom";
import { FileText, Calendar, Menu, X } from "lucide-react";
import { useSideNav } from "../context/SideNavContext";

const SideNavigation = () => {
  const { isOpen, toggleSideNav } = useSideNav();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Notes", icon: FileText },
    { path: "/calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-base-content/10 bg-base-100 pt-24 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-base-content text-base-100"
                    : "text-base-content hover:bg-base-200"
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={toggleSideNav}
        />
      )}
    </>
  );
};

export default SideNavigation;
