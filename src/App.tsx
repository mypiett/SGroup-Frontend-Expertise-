import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./shared/lib/ProtectedRoute";
const LoginPage = lazy(() => import("./pages/login/ui/LoginPage"));
const DashboardPage = lazy(() => import("./pages/dashboard/DashBoardPage"));

export default function App() {
  return (
    <BrowserRouter basename="/SGroup-Frontend-Expertise-/">
      <Suspense fallback={<div>Loading</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}
