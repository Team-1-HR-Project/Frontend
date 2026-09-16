import {
  MdDashboard,
  MdPeople,
  MdAttachMoney,
  MdEventNote,
  MdSettings,
  MdNotifications,
  MdBusiness,
  MdAssessment,
  MdSecurity,
} from "react-icons/md";

export const navConfig = {
  admin: [
    {
      titleKey: "portal.overview",
      title: "Overview",
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
      titleKey: "portal.activityLog",
      title: "Activity Log",
      path: "/admin/activity-log",
      icon: MdHistory,
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
      titleKey: "portal.dashboard",
      title: "Dashboard",
      path: "/employee/dashboard",
      icon: MdDashboard,
    },
    {
      titleKey: "portal.myLeaves",
      title: "My Leaves",
      path: "/employee/leaves",
      icon: MdEventNote,
    },
    {
      titleKey: "portal.myPayslip",
      title: "My Payslip",
      path: "/employee/payslip",
      icon: MdAttachMoney,
    },
  ],
};
