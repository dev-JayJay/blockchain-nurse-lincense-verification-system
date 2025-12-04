import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import VerifierRoute from "./VerifierRoute";
import { ROUTES } from "./paths";

// Layouts
import AdminLayout from "../components/layout/AdminLayout";
import VerifierLayout from "../components/layout/VerifierLayout";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/verifier/Register";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import VerifiersList from "../pages/admin/VerifiersList";
import ReviewVerifier from "../pages/admin/ReviewVerifier";
import Licenses from "../pages/admin/Licenses";
import AddLicense from "../pages/admin/AddLicense";

// Verifier pages
import VerifierHome from "../pages/verifier/Home";
import VerifyLicense from "../pages/verifier/VerifyLicense";
import VerifierProfile from "../pages/verifier/Profile";
import Profile from "../pages/admin/Profile";
import AddAdmin from "../pages/admin/AddAdmin";
import LandingPage from "../pages/home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* -------------------- PUBLIC -------------------- */}
        <Route path={ROUTES.PUBLIC.LANDING_PAGE} element={<LandingPage />} />
        <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
        <Route path={ROUTES.PUBLIC.VERIFIER_REGISTER} element={<Register />} />
        {/* -------------------- ADMIN -------------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="verifiers" element={<VerifiersList />} />
          <Route path="verifiers/:id" element={<ReviewVerifier />} />
          <Route path="licenses" element={<Licenses />} />
          <Route path="licenses/new" element={<AddLicense />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-admin" element={<AddAdmin />} />
        </Route>

        {/* -------------------- VERIFIER -------------------- */}
        <Route
          path="/verifier"
          element={
            <ProtectedRoute>
              <VerifierRoute>
                <VerifierLayout />
              </VerifierRoute>
            </ProtectedRoute>
          }
        >
          {/* redirect /verifier → /verifier/home */}
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<VerifierHome />} />
          <Route path="verify" element={<VerifyLicense />} />
          <Route path="profile" element={<VerifierProfile />} />
        </Route>

        {/* Catch all for unknown routes */}
        <Route path="*" element={<Navigate to={ROUTES.PUBLIC.LOGIN} replace />} />

      </Routes>
    </BrowserRouter>
  );
}
