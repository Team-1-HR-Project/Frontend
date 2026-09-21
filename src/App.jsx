import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import Home from "./features/home";

// ==================== Auth ====================
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyOTP from "./features/auth/pages/VerifyOTP";
import ResetPassword from "./features/auth/pages/ResetPassword";
import PasswordResetSuccess from "./features/auth/pages/PasswordResetSuccess";

// ==================== Admin Pages ====================
import Branches from "./features/admin/pages/Branches";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import Notification from "./features/admin/pages/Notification";
import ActivityLog from "./features/admin/pages/AuditLogs";
import Users from "./features/admin/pages/Users";
import AdminPerformance from "./features/admin/pages/PerformancePage";

// ==================== Employee Pages ====================
import EmployeePerformance from "./features/employee/pages/Performance";
import CompanyPolicies from "./features/employee/pages/Policies";
import Tasks from "./features/employee/pages/Tasks";
import EmployeeProfileSettings from "./features/employee/pages/ProfileSettings";
import HomeDashboard from "./features/employee/pages/home/HomeDashboard";
import Attendance from "./features/employee/pages/attendance/Attendance";
import LeaveBalances from "./features/employee/pages/Leave & balances";
import AIAssistant from "./features/employee/pages/AI Assistant";

// ==================== Manager Pages ====================
import TeamDashboard from "./features/manager/pages/TeamDashboard";
import TaskManagement from "./features/manager/pages/TaskManagement";
import SubmissionReviews from "./features/manager/pages/SubmissionReviews";
import TeamEvaluations from "./features/manager/pages/TeamEvaluations";
import TeamGoals from "./features/manager/pages/TeamGoals";
import PerformanceAnalytics from "./features/manager/pages/PerformanceAnalytics";
import TeamAttendance from "./features/manager/pages/TeamAttendance";
import TeamLeaveApprovals from "./features/manager/pages/TeamLeaveApprovals";
import AITeamInsights from "./features/manager/pages/AITeamInsights";

// ==================== Layout ====================
import DashboardLayout from "./layouts/DashboardLayout";

// ==================== Dashboard Placeholder ====================
function DashboardPlaceholder({ messageKey, defaultMessage }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        padding: "40px 24px",
        textAlign: "center",
        color: "#64748b",
        fontSize: "16px",
      }}
    >
      {t(messageKey, defaultMessage)}
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language === "ar";

    // اتجاه الـ HTML
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";

    // اتجاه الـ Body
    document.body.dir = isArabic ? "rtl" : "ltr";

    // إضافة class للغة الحالية
    document.documentElement.classList.toggle("rtl", isArabic);
    document.body.classList.toggle("rtl", isArabic);
    document.documentElement.classList.toggle("arabic-mode", isArabic);
    document.documentElement.classList.toggle("english-mode", !isArabic);
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

        {/* ==================== Dashboard Layout ==================== */}
        <Route element={<DashboardLayout />}>
          {/* ==================== Admin Redirect ==================== */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* ==================== Admin Dashboard ==================== */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ==================== Admin Users ==================== */}
          <Route path="/admin/users" element={<Users />} />

          {/* ==================== Admin Branches ==================== */}
          <Route path="/admin/branches" element={<Branches />} />

          {/* ==================== Admin Performance ==================== */}
          <Route path="/admin/performance" element={<AdminPerformance />} />

          {/* ==================== Admin Notifications ==================== */}
          <Route path="/admin/notifications" element={<Notification />} />

          {/* ==================== Admin Audit Logs ==================== */}
          <Route path="/admin/audit" element={<ActivityLog />} />

          {/* ==================== Admin Settings ==================== */}
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

          {/* ==================== HR Notifications ==================== */}
          <Route path="/hr/notifications" element={<Notification />} />
          <Route
            path="/hr/employees"
            element={
              <DashboardPlaceholder
                messageKey="portal.employees"
                defaultMessage="الموظفون"
              />
            }
          />
          <Route
            path="/hr/payroll"
            element={
              <DashboardPlaceholder
                messageKey="portal.payroll"
                defaultMessage="الرواتب"
              />
            }
          />
          <Route
            path="/hr/leaves"
            element={
              <DashboardPlaceholder
                messageKey="portal.leaves"
                defaultMessage="الإجازات"
              />
            }
          />

          {/* ==================== Manager Redirect ==================== */}
          <Route
            path="/manager"
            element={<Navigate to="/manager/dashboard" replace />}
          />

          {/* ==================== Manager Routes ==================== */}
          <Route path="/manager/dashboard" element={<TeamDashboard />} />
          <Route path="/manager/tasks" element={<TaskManagement />} />
          <Route path="/manager/submissions" element={<SubmissionReviews />} />
          <Route path="/manager/evaluations" element={<TeamEvaluations />} />
          <Route path="/manager/goals" element={<TeamGoals />} />
          <Route path="/manager/analytics" element={<PerformanceAnalytics />} />
          <Route path="/manager/attendance" element={<TeamAttendance />} />
          <Route path="/manager/leave-approvals" element={<TeamLeaveApprovals />} />
          <Route path="/manager/ai-insights" element={<AITeamInsights />} />
          <Route path="/manager/notifications" element={<Notification />} />

          {/* ==================== Employee Redirect ==================== */}
          <Route
            path="/employee"
            element={<Navigate to="/employee/dashboard" replace />}
          />

          {/* ==================== Employee Dashboard ==================== */}
          <Route path="/employee/dashboard" element={<HomeDashboard />} />

          {/* ==================== Employee Attendance ==================== */}
          <Route path="/employee/attendance" element={<Attendance />} />

          {/* ==================== Employee Tasks ==================== */}
          <Route path="/employee/tasks" element={<Tasks />} />

          {/* ==================== Employee Performance ==================== */}
          <Route
            path="/employee/performance"
            element={<EmployeePerformance />}
          />

          {/* ==================== Employee Leave & Balances ==================== */}
          <Route path="/employee/leaves" element={<LeaveBalances />} />
          <Route
            path="/employee/leave-balances"
            element={<Navigate to="/employee/leaves" replace />}
          />

          {/* ==================== Employee AI Assistant ==================== */}
          <Route path="/employee/ai-assistant" element={<AIAssistant />} />
          <Route
            path="/employee/assistant"
            element={<Navigate to="/employee/ai-assistant" replace />}
          />

          {/* ==================== Employee Notifications ==================== */}
          <Route path="/employee/notifications" element={<Notification />} />

          {/* ==================== Employee Policies ==================== */}
          <Route path="/employee/policies" element={<CompanyPolicies />} />

          {/* ==================== Employee Profile & Settings ==================== */}
          <Route
            path="/employee/profile"
            element={<EmployeeProfileSettings />}
          />

          {/* ==================== Direct Branches Route inside Layout ==================== */}
          <Route path="/branches" element={<Branches />} />
        </Route>

        {/* ==================== Direct Branches Route fallback ==================== */}
        <Route path="/branches" element={<Branches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
