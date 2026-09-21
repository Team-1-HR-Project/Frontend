import {
  MdDashboard,
  MdTrackChanges,
  MdPeople,
  MdAttachMoney,
  MdLocationCity,
  MdEventNote,
  MdSettings,
  MdNotifications,
  MdAssessment,
  MdHistory,
  MdCalendarMonth,
  MdAccountBalanceWallet,
  MdCardGiftcard,
} from "react-icons/md";

import {
  FiHome,
  FiClock,
  FiCheckSquare,
  FiCalendar,
  FiTrendingUp,
  FiBookOpen,
  FiUser,
  FiBell,
} from "react-icons/fi";

import {
  MdGridView,
  MdChecklist,
  MdDescription,
  MdAssignmentTurnedIn,
  MdInsights,
  MdCalendarToday,
  MdEventAvailable,
} from "react-icons/md";

import { LuSparkles } from "react-icons/lu";

export const navConfig = {
  // ==================================================
  // ==================== ADMIN ========================
  // ==================================================

  admin: [
    {
      titleKey: "portal.dashboard",
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: MdDashboard,
    },
    {
      titleKey: "portal.users",
      title: "Users",
      path: "/admin/users",
      icon: MdPeople,
    },
    {
      titleKey: "portal.performance",
      title: "Performance & Goals",
      path: "/admin/performance",
      icon: MdAssessment,
    },
    {
      titleKey: "portal.branches",
      title: "Branches",
      path: "/admin/branches",
      icon: MdLocationCity,
    },
    {
      titleKey: "portal.auditLogs",
      title: "Audit Logs",
      path: "/admin/audit",
      icon: MdHistory,
    },
    {
      titleKey: "portal.notifications",
      title: "Notifications",
      path: "/admin/notifications",
      icon: MdNotifications,
    },
    {
      titleKey: "portal.settings",
      title: "Settings",
      path: "/admin/settings",
      icon: MdSettings,
    },
  ],

  // ==================================================
  // ====================== HR =========================
  // ==================================================

  hr: [
    {
      titleKey: "portal.dashboard",
      path: "/hr/dashboard",
      icon: MdDashboard,
    },
    {
      titleKey: "portal.employees",
      path: "/hr/employees",
      icon: MdPeople,
    },
    {
      titleKey: "portal.departmentsTeams",
      path: "/hr/departments",
      icon: MdLocationCity,
    },
    {
      titleKey: "portal.attendance",
      path: "/hr/attendance",
      icon: MdCalendarMonth,
    },
    {
      titleKey: "portal.leaveRequests",
      path: "/hr/leave-requests",
      icon: MdEventNote,
    },
    {
      titleKey: "portal.advancesDeductions",
      path: "/hr/advances-deductions",
      icon: MdAccountBalanceWallet,
    },
    {
      titleKey: "portal.payroll",
      path: "/hr/payroll",
      icon: MdAttachMoney,
    },
    {
      titleKey: "portal.rewardsBonuses",
      path: "/hr/rewards",
      icon: MdCardGiftcard,
    },
    {
      titleKey: "portal.evaluationsGoals",
      title: "Evaluations & Goals",
      path: "/hr/evaluations-goals",
      icon: MdTrackChanges,
    },
    {
      titleKey: "portal.performanceMetrics",
      title: "Performance Metrics",
      path: "/hr/performance-metrics",
      icon: MdAssessment,
    },
    {
      titleKey: "portal.aiInsights",
      title: "AI Insights",
      path: "/hr/ai-insights",
      icon: LuSparkles,
    },
    {
      titleKey: "portal.companyPolicies",
      title: "Company Policies",
      path: "/hr/company-policies",
      icon: FiBookOpen,
    },
    {
      titleKey: "portal.holidays",
      title: "Holidays & Seasons",
      path: "/hr/holidays",
      icon: MdEventAvailable,
    },
    {
      titleKey: "portal.notifications",
      path: "/hr/notifications",
      icon: MdNotifications,
    },
  ],

  // ==================================================
  // ==================== MANAGER ======================
  // ==================================================

  manager: [
    {
      titleKey: "portal.teamDashboard",
      title: "Team Dashboard",
      path: "/manager/dashboard",
      icon: MdGridView,
    },
    {
      titleKey: "portal.taskManagement",
      title: "Task Management",
      path: "/manager/tasks",
      icon: MdChecklist,
    },
    {
      titleKey: "portal.submissionReviews",
      title: "Submission Reviews",
      path: "/manager/submissions",
      icon: MdDescription,
    },
    {
      titleKey: "portal.teamEvaluations",
      title: "Team Evaluations",
      path: "/manager/evaluations",
      icon: MdAssignmentTurnedIn,
    },
    {
      titleKey: "portal.teamGoalsOkrs",
      title: "Team Goals & OKRs",
      path: "/manager/goals",
      icon: MdTrackChanges,
    },
    {
      titleKey: "portal.performanceAnalytics",
      title: "Performance Analytics",
      path: "/manager/analytics",
      icon: MdInsights,
    },
    {
      titleKey: "portal.teamAttendance",
      title: "Team Attendance",
      path: "/manager/attendance",
      icon: MdCalendarToday,
    },
    {
      titleKey: "portal.teamLeaveApprovals",
      title: "Team Leave Approvals",
      path: "/manager/leave-approvals",
      icon: MdEventAvailable,
    },
    {
      titleKey: "portal.aiTeamInsights",
      title: "AI Team Insights",
      path: "/manager/ai-insights",
      icon: LuSparkles,
    },
    {
      titleKey: "portal.notifications",
      title: "Notifications",
      path: "/manager/notifications",
      icon: MdNotifications,
    },
  ],

  // ==================================================
  // ==================== EMPLOYEE =====================
  // ==================================================

  employee: [
    {
      titleKey: "portal.homeDashboard",
      title: "Home Dashboard",
      path: "/employee/dashboard",
      icon: FiHome,
    },
    {
      titleKey: "portal.myAttendance",
      title: "My Attendance",
      path: "/employee/attendance",
      icon: FiClock,
    },
    {
      titleKey: "portal.myTasks",
      title: "My Tasks",
      path: "/employee/tasks",
      icon: FiCheckSquare,
    },
    {
      titleKey: "portal.leaveBalances",
      title: "Leave & Balances",
      path: "/employee/leaves",
      icon: FiCalendar,
    },
    {
      titleKey: "portal.myPerformance",
      title: "My Performance",
      path: "/employee/performance",
      icon: FiTrendingUp,
    },
    {
      titleKey: "portal.aiAssistant",
      title: "AI Assistant",
      path: "/employee/ai-assistant",
      icon: LuSparkles,
    },
    {
      titleKey: "portal.companyPolicies",
      title: "Company Policies",
      path: "/employee/policies",
      icon: FiBookOpen,
    },
    {
      titleKey: "portal.profileSettings",
      title: "Profile & Settings",
      path: "/employee/profile",
      icon: FiUser,
    },
    {
      titleKey: "portal.notifications",
      title: "Notifications",
      path: "/employee/notifications",
      icon: FiBell,
    },
  ],
};
