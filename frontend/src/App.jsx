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
      data-theme="notion"
      className="min-h-screen bg-base-100 text-base-content"
    >
      <SideNavProvider>
        <CalendarProvider>
          <div className="flex h-screen">
            {/* Left Sidebar */}
            <SideNavigation />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Top Navbar */}
              <Navbar />

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto bg-base-100">
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
          </div>
        </CalendarProvider>
      </SideNavProvider>
    </div>
  );
};

export default App;







