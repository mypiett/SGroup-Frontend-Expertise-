import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/ui/LoginPage";
import ProtectedRoute from "./shared/lib/ProtectedRoute";
import DashboardPage from "./pages/dashboard/DashBoardPage";


export default function App() {
  return (
    <BrowserRouter basename="/SGroup-Frontend-Expertise-/">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
