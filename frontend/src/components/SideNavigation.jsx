import { Link, useLocation } from "react-router-dom";
import { FileText, Calendar } from "lucide-react";

const SideNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Notes", icon: FileText },
    { path: "/calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <aside className="sticky top-4 h-fit w-64 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg p-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-full px-4 py-3 font-['Outfit'] text-sm font-medium transition-all ${
                isActive(item.path)
                  ? "bg-primary/20 text-primary backdrop-blur-sm border border-primary/30"
                  : "text-base-content hover:bg-white/10 border border-transparent"
              }`}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNavigation;

