import {
  MdDashboard,
  MdPeople,
  MdAttachMoney,
  MdLocationCity,
  MdEventNote,
  MdSettings,
  MdNotifications,
  MdBusiness,
  MdAssessment,
  MdSecurity,
  MdHistory,
  MdHome,
  MdAccessTime,
  MdCheckBox,
  MdTrendingUp,
  MdAutoAwesome,
  MdMenuBook,
  MdPerson,
} from "react-icons/md";

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
      icon: MdAssessment, // <--- أضفناها هنا تحت الـ Users مباشرة بالترتيب المطلوب
    },
    {
      titleKey: "portal.branches",
      title: "Branches",
      path: "/admin/branches",
      icon: MdLocationCity,
    },
    {
      titleKey: "portal.audit-logs",
      title: "Audit Logs",
      path: "/admin/audit", // تم توحيد المسار هنا ليطابق App.jsx
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
      icon: MdHome,
    },
    {
      titleKey: "portal.myAttendance",
      title: "My Attendance",
      path: "/employee/attendance",
      icon: MdAccessTime,
    },
    {
      titleKey: "portal.myTasks",
      title: "My Tasks",
      path: "/employee/tasks",
      icon: MdCheckBox,
    },
    {
      titleKey: "portal.leaveBalances",
      title: "Leave & Balances",
      path: "/employee/leaves",
      icon: MdEventNote,
    },
    {
      titleKey: "portal.myPerformance",
      title: "My Performance",
      path: "/employee/performance",
      icon: MdTrendingUp,
    },
    {
      titleKey: "portal.aiAssistant",
      title: "AI Assistant",
      path: "/employee/ai-assistant",
      icon: MdAutoAwesome,
    },
    {
      titleKey: "portal.companyPolicies",
      title: "Company Policies",
      path: "/employee/policies",
      icon: MdMenuBook,
    },
    {
      titleKey: "portal.profileSettings",
      title: "Profile & Settings",
      path: "/employee/profile",
      icon: MdPerson,
    },
    {
      titleKey: "portal.notifications",
      title: "Notifications",
      path: "/employee/notifications",
      icon: MdNotifications,
    },
    {
      titleKey: "portal.notifications",
      title: "Notifications",
      path: "/employee/notifications",
      icon: MdNotifications,
    },
  ],
};