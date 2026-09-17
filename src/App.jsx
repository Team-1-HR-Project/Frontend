import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./features/home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyOTP from "./features/auth/pages/VerifyOTP";
import ResetPassword from "./features/auth/pages/ResetPassword";
import PasswordResetSuccess from "./features/auth/pages/PasswordResetSuccess";
import Branches from "./features/admin/pages/branches";
import DashboardLayout from "./layouts/DashboardLayout";
import { useTranslation } from "react-i18next";

function DashboardPlaceholder({ messageKey, defaultMessage }) {
  const { t } = useTranslation();
  return (
    <div
      style={{
        padding: "20px",
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--navy)",
      }}
    >
      {t(messageKey, defaultMessage)}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Password Reset */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccess />}
        />

        {/* --- مسارات لوحة التحكم (Dashboard) --- */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin"
            element={<Navigate to="/admin/branches" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <DashboardPlaceholder
                messageKey="portal.welcomeAdmin"
                defaultMessage="مرحباً بك في لوحة تحكم الإدارة"
              />
            }
          />
          <Route
            path="/admin/users"
            element={
              <DashboardPlaceholder
                messageKey="portal.allUsers"
                defaultMessage="جميع المستخدمين"
              />
            }
          />
          <Route path="/admin/branches" element={<Branches />} />
          <Route
            path="/admin/settings"
            element={
              <DashboardPlaceholder
                messageKey="portal.settings"
                defaultMessage="الإعدادات"
              />
            }
          />
          <Route
            path="/hr/dashboard"
            element={
              <DashboardPlaceholder
                messageKey="portal.welcomeHr"
                defaultMessage="مرحباً بك في لوحة تحكم الـ HR"
              />
            }
          />
          <Route
            path="/employee/dashboard"
            element={
              <DashboardPlaceholder
                messageKey="portal.welcomeEmployee"
                defaultMessage="مرحباً بك في صفحة الموظف"
              />
            }
          />
        </Route>
        {/* Direct Branches Route */}
        <Route path="/branches" element={<Branches />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
