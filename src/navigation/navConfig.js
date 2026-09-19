import {
  MdDashboard,
  MdPeople,
  MdAttachMoney,
  MdLocationCity,
  MdEventNote,
  MdSettings,
  MdNotifications,
  MdAssessment,
  MdHistory,
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
import { LuSparkles } from "react-icons/lu";

export const navConfig = {
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

  hr: [
    {
      titleKey: "portal.dashboard",
      title: "Dashboard",
      path: "/hr/dashboard",
      icon: MdDashboard,
    },
    {
      titleKey: "portal.employees",
      title: "Employees",
      path: "/hr/employees",
      icon: MdPeople,
    },
    {
      titleKey: "portal.payroll",
      title: "Payroll",
      path: "/hr/payroll",
      icon: MdAttachMoney,
    },
    {
      titleKey: "portal.leaves",
      title: "Leaves",
      path: "/hr/leaves",
      icon: MdEventNote,
    },
    {
      titleKey: "portal.notifications",
      title: "Notifications",
      path: "/hr/notifications",
      icon: MdNotifications,
    },
  ],

  manager: [
    {
      titleKey: "portal.dashboard",
      title: "Dashboard",
      path: "/manager/dashboard",
      icon: MdDashboard,
    },
    {
      titleKey: "portal.myTeam",
      title: "My Team",
      path: "/manager/team",
      icon: MdPeople,
    },
    {
      titleKey: "portal.teamLeaves",
      title: "Team Leaves",
      path: "/manager/leaves",
      icon: MdEventNote,
    },
  ],

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
