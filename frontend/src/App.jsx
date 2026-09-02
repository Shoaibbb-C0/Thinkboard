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
      className="min-h-screen bg-base-200 text-base-content"
    >
      <SideNavProvider>
        <CalendarProvider>
          <Navbar />
          <SideNavigation />

          <main className="pt-24 md:ml-64">
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
        </CalendarProvider>
      </SideNavProvider>
    </div>
  );
};

export default App;




