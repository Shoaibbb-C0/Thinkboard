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
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-base-200 border-r border-gray-200 transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="font-semibold text-base-content hidden sm:inline">
              Thinkboard
            </span>
          </Link>
          <button
            type="button"
            className="md:hidden p-1 hover:bg-gray-200 rounded-lg"
            onClick={toggleSideNav}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Close sidebar on mobile after click
                  if (window.innerWidth < 768) {
                    toggleSideNav();
                  }
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-base-content hover:bg-gray-300"
                }`}
              >
                <Icon className="size-5" />
                <span className="text-sm font-medium">{item.label}</span>
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

      {/* Mobile Toggle Button */}
      <button
        type="button"
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        onClick={toggleSideNav}
      >
        <Menu className="size-6" />
      </button>
    </>
  );
};

export default SideNavigation;
