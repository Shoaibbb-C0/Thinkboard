import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SideNavigation from "./components/SideNavigation";
import { SideNavProvider } from "./context/SideNavContext";
import { CalendarProvider } from "./context/CalendarContext";

import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div
      data-theme="porcelain"
      className="min-h-screen bg-linear-to-br from-base-100 via-base-100 to-base-200 text-base-content"
    >
      <SideNavProvider>
        <CalendarProvider>
          <div className="flex gap-4 p-4">
            {/* Left Navbar */}
            <Navbar />
            <SideNavigation />

            {/* Main Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                  path="/register"
                  element={<RegisterPage />}
                />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/calendar"
                  element={
                    <ProtectedRoute>
                      <CalendarPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <CreatePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/note/:id"
                  element={
                    <ProtectedRoute>
                      <NoteDetailPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </CalendarProvider>
      </SideNavProvider>
    </div>
  );
};

export default App;






