import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

// ==================== Home ====================
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
import ProfileSetting from "./features/manager/pages/ProfileSetting";

// ==================== HR Pages ====================
import HrDashboard from "./features/hr/pages/hrDashboard";
import HrAttendance from "./features/hr/pages/attendance";
import HrAdvances from "./features/hr/pages/advances&Deductions";
import HrDepartments from "./features/hr/pages/departments&Teams";
import HrEmployees from "./features/hr/pages/employees";
import HrLeaveRequests from "./features/hr/pages/leaveRequests";
import HrPayroll from "./features/hr/pages/payroll";
import HrRewards from "./features/hr/pages/rewards&Bonuses";
import HrEvaluationsGoals from "./features/hr/pages/evaluations&goals";
import PerformanceMetrics from "./features/hr/pages/performanceMatrics";
import AIInsights from "./features/hr/pages/aiInsights";
import HrCompanyPolicies from "./features/hr/pages/companyPolicies";
import Holidays from "./features/hr/pages/holidays";
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

    // HTML direction
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";

    // Body direction
    document.body.dir = isArabic ? "rtl" : "ltr";

    // Language classes
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
          {/* ================================================== */}
          {/* ==================== ADMIN ======================= */}
          {/* ================================================== */}

          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/users" element={<Users />} />

          <Route path="/admin/branches" element={<Branches />} />

          <Route path="/admin/performance" element={<AdminPerformance />} />

          <Route path="/admin/notifications" element={<Notification />} />

          <Route path="/admin/audit" element={<ActivityLog />} />

          <Route
            path="/admin/settings"
            element={
              <DashboardPlaceholder
                messageKey="portal.settings"
                defaultMessage="الإعدادات"
              />
            }
          />

          {/* ================================================== */}
          {/* ====================== HR ======================== */}
          {/* ================================================== */}

          {/* HR Redirect */}
          <Route path="/hr" element={<Navigate to="/hr/dashboard" replace />} />

          {/* HR Dashboard */}
          <Route path="/hr/dashboard" element={<HrDashboard />} />

          {/* HR Employees */}
          <Route path="/hr/employees" element={<HrEmployees />} />

          {/* HR Departments & Teams */}
          <Route path="/hr/departments" element={<HrDepartments />} />

          {/* HR Attendance */}
          <Route path="/hr/attendance" element={<HrAttendance />} />

          {/* HR Leave Requests */}
          <Route path="/hr/leave-requests" element={<HrLeaveRequests />} />

          {/* HR Advances & Deductions */}
          <Route path="/hr/advances-deductions" element={<HrAdvances />} />

          {/* HR Payroll */}
          <Route path="/hr/payroll" element={<HrPayroll />} />

          {/* HR Rewards & Bonuses */}
          <Route path="/hr/rewards" element={<HrRewards />} />

          {/* HR Evaluations & Goals */}
          <Route
            path="/hr/evaluations-goals"
            element={<HrEvaluationsGoals />}
          />

          {/* HR Performance Metrics */}
          <Route
            path="/hr/performance-metrics"
            element={<PerformanceMetrics />}
          />

          {/* HR AI Insights */}
          <Route path="/hr/ai-insights" element={<AIInsights />} />

          {/* HR Company Policies */}
          <Route path="/hr/company-policies" element={<HrCompanyPolicies />} />

          {/* HR Holidays & Seasons */}
          <Route path="/hr/holidays" element={<Holidays />} />

          {/* HR Notifications */}
          <Route path="/hr/notifications" element={<Notification />} />

          {/* HR Settings */}
          <Route
            path="/hr/settings"
            element={
              <DashboardPlaceholder
                messageKey="portal.settings"
                defaultMessage="الإعدادات"
              />
            }
          />

          {/* ================================================== */}
          {/* ==================== MANAGER ===================== */}
          {/* ================================================== */}

          <Route
            path="/manager"
            element={<Navigate to="/manager/dashboard" replace />}
          />

          <Route path="/manager/dashboard" element={<TeamDashboard />} />

          <Route path="/manager/tasks" element={<TaskManagement />} />

          <Route path="/manager/submissions" element={<SubmissionReviews />} />

          <Route path="/manager/evaluations" element={<TeamEvaluations />} />

          <Route path="/manager/goals" element={<TeamGoals />} />

          <Route path="/manager/analytics" element={<PerformanceAnalytics />} />

          <Route path="/manager/attendance" element={<TeamAttendance />} />

          <Route
            path="/manager/leave-approvals"
            element={<TeamLeaveApprovals />}
          />

          <Route path="/manager/ai-insights" element={<AITeamInsights />} />

          <Route path="/manager/notifications" element={<Notification />} />
          <Route path="/manager/profile" element={<ProfileSetting />} />

          {/* ================================================== */}
          {/* ==================== EMPLOYEE ==================== */}
          {/* ================================================== */}

          <Route
            path="/employee"
            element={<Navigate to="/employee/dashboard" replace />}
          />

          <Route path="/employee/dashboard" element={<HomeDashboard />} />

          <Route path="/employee/attendance" element={<Attendance />} />

          <Route path="/employee/tasks" element={<Tasks />} />

          <Route
            path="/employee/performance"
            element={<EmployeePerformance />}
          />

          <Route path="/employee/leaves" element={<LeaveBalances />} />

          <Route
            path="/employee/leave-balances"
            element={<Navigate to="/employee/leaves" replace />}
          />

          <Route path="/employee/ai-assistant" element={<AIAssistant />} />

          <Route
            path="/employee/assistant"
            element={<Navigate to="/employee/ai-assistant" replace />}
          />

          <Route path="/employee/notifications" element={<Notification />} />

          {/* Employee Company Policies */}
          <Route path="/employee/policies" element={<CompanyPolicies />} />

          <Route
            path="/employee/profile"
            element={<EmployeeProfileSettings />}
          />

          {/* ==================== Shared ==================== */}

          <Route path="/branches" element={<Branches />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
