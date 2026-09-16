import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import Home from "./features/home";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyOTP from "./features/auth/pages/VerifyOTP";
import ResetPassword from "./features/auth/pages/ResetPassword";
import PasswordResetSuccess from "./features/auth/pages/PasswordResetSuccess";

import Branches from "./features/admin/pages/branches";
import AdminDashboard from "./features/admin/pages/Admin_Dashboard";
import Notification from "./features/admin/pages/Notification";
import { useTranslation } from "react-i18next";
import ActivityLog from "./features/admin/pages/audit-logs";

import DashboardLayout from "./layouts/DashboardLayout";

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
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Routes>
        {/* ==================== Home ==================== */}
        <Route path="/" element={<Home />} />

        {/* ==================== Authentication ==================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ==================== Password Reset ==================== */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccess />}
        />

        {/* ==================== Dashboard ==================== */}
        <Route element={<DashboardLayout />}>
          {/* /admin → /admin/dashboard */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<DashboardPlaceholder messageKey="portal.users" defaultMessage="المستخدمون" />} />
          <Route path="/admin/branches" element={<DashboardPlaceholder messageKey="portal.branches" defaultMessage="الفروع" />} />
          <Route path="/admin/performance" element={<DashboardPlaceholder messageKey="portal.performance" defaultMessage="الأداء والأهداف" />} />
          <Route path="/admin/notifications" element={<Notification />} />
          <Route path="/admin/audit-logs" element={<DashboardPlaceholder messageKey="portal.auditLogs" defaultMessage="سجلات التدقيق" />} />
          <Route path="/admin/settings" element={<DashboardPlaceholder messageKey="portal.settings" defaultMessage="الإعدادات" />} />
          <Route path="/hr/dashboard" element={<DashboardPlaceholder messageKey="portal.welcomeHr" defaultMessage="مرحباً بك في لوحة تحكم الـ HR" />} />
          <Route path="/employee/dashboard" element={<DashboardPlaceholder messageKey="portal.welcomeEmployee" defaultMessage="مرحباً بك في صفحة الموظف" />} />

          {/* Users */}
          <Route
            path="/admin/users"
            element={
              <DashboardPlaceholder
                messageKey="portal.allUsers"
                defaultMessage="جميع المستخدمين"
              />
            }
          />

          {/* Branches */}
          <Route path="/admin/branches" element={<Branches />} />

          {/* Activity Log */}
          <Route path="/admin/activity-log" element={<ActivityLog />} />

          {/* Audit Logs */}
          <Route path="/admin/audit-logs" element={<ActivityLog />} />

          {/* Settings */}
          <Route
            path="/admin/settings"
            element={
              <DashboardPlaceholder
                messageKey="portal.settings"
                defaultMessage="الإعدادات"
              />
            }
          />

          {/* HR Dashboard */}
          <Route
            path="/hr/dashboard"
            element={
              <DashboardPlaceholder
                messageKey="portal.welcomeHr"
                defaultMessage="مرحباً بك في لوحة تحكم الـ HR"
              />
            }
          />

          {/* Employee Dashboard */}
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
