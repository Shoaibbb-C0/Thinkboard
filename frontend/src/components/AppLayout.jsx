import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem(
      "sidebar-collapsed",
      String(isCollapsed)
    );
  }, [isCollapsed]);

  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;