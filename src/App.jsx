import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import ActivityLog from "./features/admin/pages/audit-logs";
import Users from "./features/admin/pages/Users";
import PerformancePage from "./features/admin/pages/PerformancePage";

import DashboardLayout from "./layouts/DashboardLayout";

// استيراد لوحة تحكم الموظف وصفحة الحضور
import HomeDashboard from "./features/employee/pages/home/HomeDashboard";
import Attendance from "./features/employee/pages/attendance/Attendance";


// ==================== Dashboard Placeholder ====================

function DashboardPlaceholder({
  messageKey,
  defaultMessage,
}) {
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


// ==================== Main App ====================

function App() {
  const { i18n } = useTranslation();

  // ==================== Language Direction ====================

  useEffect(() => {
    const isArabic = i18n.language?.startsWith("ar");

    // اتجاه الصفحة بالكامل
    document.documentElement.dir = isArabic
      ? "rtl"
      : "ltr";

    // لغة الصفحة
    document.documentElement.lang = isArabic
      ? "ar"
      : "en";

    // اتجاه الـ Body
    document.body.dir = isArabic
      ? "rtl"
      : "ltr";

    // إضافة class للغة الحالية
    document.documentElement.classList.toggle(
      "arabic-mode",
      isArabic
    );

    document.documentElement.classList.toggle(
      "english-mode",
      !isArabic
    );
  }, [i18n.language]);


  return (
    <BrowserRouter>

      {/* ==================== Toast Notifications ==================== */}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />


      {/* ==================== Application Routes ==================== */}

      <Routes>

        {/* ==================== Home ==================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ==================== Authentication ==================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================== Password Reset ==================== */}

        <Route
          path="/ForgotPassword"
          element={<ForgotPassword />}
        />

        <Route
          path="/VerifyOTP"
          element={<VerifyOTP />}
        />

        <Route
          path="/ResetPassword"
          element={<ResetPassword />}
        />

        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccess />}
        />


        {/* ==================== Dashboard Layout ==================== */}

        <Route
          element={<DashboardLayout />}
        >

          {/* ==================== Admin Redirect ==================== */}

          <Route
            path="/admin"
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />


          {/* ==================== Admin Dashboard ==================== */}

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />


          {/* ==================== Users ==================== */}

          <Route
            path="/admin/users"
            element={<Users />}
          />


          {/* ==================== Branches ==================== */}

          <Route
            path="/admin/branches"
            element={<Branches />}
          />


          {/* ==================== Performance & Goals ==================== */}

          <Route
            path="/admin/performance"
            element={<PerformancePage />}
          />


          {/* ==================== Notifications ==================== */}

          <Route
            path="/admin/notifications"
            element={<Notification />}
          />


          {/* ==================== Audit Logs ==================== */}

          <Route
            path="/admin/audit"
            element={<ActivityLog />}
          />


          {/* ==================== Settings ==================== */}

          <Route
            path="/admin/settings"
            element={
              <DashboardPlaceholder
                messageKey="portal.settings"
                defaultMessage="الإعدادات"
              />
            }
          />


          {/* ==================== HR Dashboard ==================== */}

          <Route
            path="/hr/dashboard"
            element={
              <DashboardPlaceholder
                messageKey="portal.welcomeHr"
                defaultMessage="مرحباً بك في لوحة تحكم الـ HR"
              />
            }
          />


          {/* ==================== Employee Redirect ==================== */}

          <Route
            path="/employee"
            element={
              <Navigate
                to="/employee/dashboard"
                replace
              />
            }
          />


          {/* ==================== Employee Dashboard ==================== */}

          <Route
            path="/employee/dashboard"
            element={<HomeDashboard />}
          />


          {/* ==================== Employee Attendance ==================== */}

          <Route
            path="/employee/attendance"
            element={<Attendance />}
          />

        </Route>


        {/* ==================== Direct Branches Route ==================== */}

        <Route
          path="/branches"
          element={<Branches />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;