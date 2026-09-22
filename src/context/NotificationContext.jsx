import { createContext, useContext, useMemo, useState } from "react";

const NotificationContext = createContext(null);

// ============================================================
// ALL NOTIFICATIONS
// كل notification فيها userId و role بتاع صاحبها
// ============================================================

const ALL_NOTIFICATIONS = [

  // ── Ahmed Nasser (admin) ──────────────────────────────────
  {
    id: "notif-ahmed-1",
    role: "admin",
    userId: "user-ahmed",
    titleKey: "portal.notif1Title",
    defaultTitle: "Q3 2026 Evaluation Cycle Activated",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "Evaluations",
    timestamp: "10 minutes ago",
    timestampKey: "portal.tenMinAgo",
    descKey: "portal.notif1Desc",
    defaultDesc: "The Q3 review cycle is now active for all company employees. Managers can begin submitting evaluations.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.viewCycle",
    defaultAction: "View Cycle",
    initiatorKey: "portal.hrOps",
    defaultInitiator: "HR & Admin Operations",
    scopeKey: "portal.allBranches",
    defaultScope: "All Branches (Cairo & Alexandria)",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
  {
    id: "notif-ahmed-2",
    role: "admin",
    userId: "user-ahmed",
    titleKey: "portal.notif2Title",
    defaultTitle: "New Branch Geofence Configured",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "Security",
    timestamp: "Yesterday at 3:45 PM",
    timestampKey: "portal.yesterdayTime",
    descKey: "portal.notif2Desc",
    defaultDesc: "Alexandria Hub geofence settings were updated and GPS enforcement is now active for the branch.",
    isRead: false,
    actionType: "log",
    actionKey: "portal.inspectLog",
    defaultAction: "Inspect Log",
    initiatorKey: "portal.securityOps",
    defaultInitiator: "Mostafa Khalil (Security Ops)",
    scopeKey: "portal.alexandriaHub",
    defaultScope: "Alexandria Hub",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },
  {
    id: "notif-ahmed-3",
    role: "admin",
    userId: "user-ahmed",
    titleKey: "portal.notif3Title",
    defaultTitle: "AI Policy Gateway Sync Completed",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "System",
    timestamp: "Sep 12, 2026 at 11:20 AM",
    timestampKey: "portal.sep12Time",
    descKey: "portal.notif3Desc",
    defaultDesc: "The latest workplace policy rules were synchronized successfully across the WiseWork platform.",
    isRead: false,
    actionType: "system",
    actionKey: null,
    defaultAction: null,
    initiatorKey: "portal.automatedEngine",
    defaultInitiator: "Automated Policy Engine",
    scopeKey: "portal.globalNetwork",
    defaultScope: "WiseWork Global Network",
    priorityKey: "portal.priorityLow",
    defaultPriority: "Normal",
  },
  {
    id: "notif-ahmed-4",
    role: "admin",
    userId: "user-ahmed",
    titleKey: "portal.notif4Title",
    defaultTitle: "Role permissions updated",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "Security",
    timestamp: "Sep 11, 2026 at 9:42 AM",
    timestampKey: "portal.sep11Time",
    descKey: "portal.notif4Desc",
    defaultDesc: "Sara Ahmed updated administrative permissions for the People & Culture workspace.",
    isRead: true,
    actionType: "log",
    actionKey: "portal.inspectLog",
    defaultAction: "Inspect Log",
    initiatorKey: "portal.sarahAdmin",
    defaultInitiator: "Sara Ahmed (Admin)",
    scopeKey: "portal.users",
    defaultScope: "Users",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },

  // ── Sara Ahmed (admin) ────────────────────────────────────
  {
    id: "notif-sara-1",
    role: "admin",
    userId: "user-sara",
    titleKey: "portal.notifSara1Title",
    defaultTitle: "New Admin Access Request",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "Security",
    timestamp: "2 hours ago",
    timestampKey: "portal.twoHoursAgo",
    descKey: "portal.notifSara1Desc",
    defaultDesc: "Ahmed Nasser has requested elevated admin privileges for the Finance module. Awaiting your approval.",
    isRead: false,
    actionType: "log",
    actionKey: "portal.reviewRequest",
    defaultAction: "Review Request",
    initiatorKey: "portal.ahmedAdmin",
    defaultInitiator: "Ahmed Nasser (Admin)",
    scopeKey: "portal.financeModule",
    defaultScope: "Finance Module",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
  {
    id: "notif-sara-2",
    role: "admin",
    userId: "user-sara",
    titleKey: "portal.notifSara2Title",
    defaultTitle: "Monthly HR Report Ready",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "Evaluations",
    timestamp: "Today at 8:00 AM",
    timestampKey: "portal.todayMorning",
    descKey: "portal.notifSara2Desc",
    defaultDesc: "The September 2026 HR performance report has been generated and is ready for your review.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.viewReport",
    defaultAction: "View Report",
    initiatorKey: "portal.automatedEngine",
    defaultInitiator: "Automated Report Engine",
    scopeKey: "portal.allBranches",
    defaultScope: "All Branches",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },
  {
    id: "notif-sara-3",
    role: "admin",
    userId: "user-sara",
    titleKey: "portal.notifSara3Title",
    defaultTitle: "System Maintenance Scheduled",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "System",
    timestamp: "Sep 18, 2026",
    timestampKey: "portal.sep18",
    descKey: "portal.notifSara3Desc",
    defaultDesc: "WiseWork platform will undergo scheduled maintenance on Sep 20, 2026 from 2:00 AM – 4:00 AM.",
    isRead: true,
    actionType: "system",
    actionKey: null,
    defaultAction: null,
    initiatorKey: "portal.devOps",
    defaultInitiator: "DevOps Team",
    scopeKey: "portal.globalNetwork",
    defaultScope: "WiseWork Global Network",
    priorityKey: "portal.priorityLow",
    defaultPriority: "Normal",
  },

  // ── Mostafa Khalil (hr) ───────────────────────────────────
  {
    id: "notif-mostafa-1",
    role: "hr",
    userId: "user-mostafa",
    titleKey: "portal.notifMostafa1Title",
    defaultTitle: "5 Leave Requests Pending Approval",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "HR",
    timestamp: "30 minutes ago",
    timestampKey: "portal.thirtyMinAgo",
    descKey: "portal.notifMostafa1Desc",
    defaultDesc: "5 employee leave requests are awaiting your approval. Please review them before end of day.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.reviewLeaves",
    defaultAction: "Review Leaves",
    initiatorKey: "portal.hrSystem",
    defaultInitiator: "HR System",
    scopeKey: "portal.cairoBranch",
    defaultScope: "Cairo Branch",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
  {
    id: "notif-mostafa-2",
    role: "hr",
    userId: "user-mostafa",
    titleKey: "portal.notifMostafa2Title",
    defaultTitle: "New Employee Onboarding",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "System",
    timestamp: "Yesterday at 10:00 AM",
    timestampKey: "portal.yesterdayMorning",
    descKey: "portal.notifMostafa2Desc",
    defaultDesc: "3 new employees have been added to the system and are awaiting onboarding assignment.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.startOnboarding",
    defaultAction: "Start Onboarding",
    initiatorKey: "portal.adminOps",
    defaultInitiator: "Admin Operations",
    scopeKey: "portal.allBranches",
    defaultScope: "All Branches",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },
  {
    id: "notif-mostafa-3",
    role: "hr",
    userId: "user-mostafa",
    titleKey: "portal.notifMostafa3Title",
    defaultTitle: "Payroll Deadline Reminder",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "Finance",
    timestamp: "Sep 17, 2026",
    timestampKey: "portal.sep17",
    descKey: "portal.notifMostafa3Desc",
    defaultDesc: "Monthly payroll processing deadline is in 3 days. Please finalize all attendance records.",
    isRead: true,
    actionType: "log",
    actionKey: "portal.viewPayroll",
    defaultAction: "View Payroll",
    initiatorKey: "portal.financeTeam",
    defaultInitiator: "Finance Team",
    scopeKey: "portal.allBranches",
    defaultScope: "All Branches",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
  {
    id: "notif-mostafa-4",
    role: "hr",
    userId: "user-mostafa",
    titleKey: "portal.notifMostafa4Title",
    defaultTitle: "Department Attendance Report Ready",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "Attendance",
    timestamp: "Sep 16, 2026",
    timestampKey: "portal.sep16",
    descKey: "portal.notifMostafa4Desc",
    defaultDesc: "Monthly attendance anomalies report for Cairo HQ is compiled and ready for HR review.",
    isRead: false,
    actionType: "log",
    actionKey: "portal.viewReport",
    defaultAction: "View Report",
    initiatorKey: "portal.automatedEngine",
    defaultInitiator: "Attendance Engine",
    scopeKey: "portal.cairoBranch",
    defaultScope: "Cairo HQ",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },

  // ── Manager (Layla Hassan / Manager) ──────────────────────
  {
    id: "notif-manager-1",
    role: "manager",
    userId: "user-manager",
    titleKey: "portal.notifMgr1Title",
    defaultTitle: "New Leave Request Pending Approval",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "Leaves",
    timestamp: "25 minutes ago",
    timestampKey: "portal.twentyFiveMinAgo",
    descKey: "portal.notifMgr1Desc",
    defaultDesc: "Salma Nabil submitted an annual leave request for Oct 2–5. Requires your review.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.reviewRequest",
    defaultAction: "Review Request",
    initiatorKey: "portal.salmaNabil",
    defaultInitiator: "Salma Nabil (Frontend Engineer)",
    scopeKey: "portal.engineeringTeam",
    defaultScope: "Engineering Team",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
  {
    id: "notif-manager-2",
    role: "manager",
    userId: "user-manager",
    titleKey: "portal.notifMgr2Title",
    defaultTitle: "Task Submission Awaiting Review",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "Tasks",
    timestamp: "2 hours ago",
    timestampKey: "portal.twoHoursAgo",
    descKey: "portal.notifMgr2Desc",
    defaultDesc: "Youssef Lotfy submitted 'OAuth2 Flow Implementation' for your review.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.reviewSubmission",
    defaultAction: "Review Submission",
    initiatorKey: "portal.youssefLotfy",
    defaultInitiator: "Youssef Lotfy (Backend Engineer)",
    scopeKey: "portal.engineeringTeam",
    defaultScope: "Engineering Team",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },
  {
    id: "notif-manager-3",
    role: "manager",
    userId: "user-manager",
    titleKey: "portal.notifMgr3Title",
    defaultTitle: "Q3 Team Evaluations Reminder",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "Evaluations",
    timestamp: "Yesterday at 4:15 PM",
    timestampKey: "portal.yesterdayTime",
    descKey: "portal.notifMgr3Desc",
    defaultDesc: "3 team members have completed self-evaluations. Please complete manager reviews before Oct 15.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.startReviews",
    defaultAction: "Start Reviews",
    initiatorKey: "portal.hrOps",
    defaultInitiator: "HR Operations",
    scopeKey: "portal.engineeringTeam",
    defaultScope: "Engineering Team",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
  {
    id: "notif-manager-4",
    role: "manager",
    userId: "user-manager",
    titleKey: "portal.notifMgr4Title",
    defaultTitle: "Workload Imbalance Alert",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "AI Insights",
    timestamp: "Sep 19, 2026",
    timestampKey: "portal.sep19",
    descKey: "portal.notifMgr4Desc",
    defaultDesc: "AI Team Insights detected high sprint workload on 2 engineers. Consider rebalancing tasks.",
    isRead: true,
    actionType: "log",
    actionKey: "portal.inspectLog",
    defaultAction: "Inspect Alert",
    initiatorKey: "portal.automatedEngine",
    defaultInitiator: "WiseWork AI Copilot",
    scopeKey: "portal.engineeringTeam",
    defaultScope: "Engineering Team",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },

  // ── Employee (Omar Haddad / Layla Hassan) ─────────────────
  {
    id: "notif-layla-1",
    role: "employee",
    userId: "user-layla",
    titleKey: "portal.notifLayla1Title",
    defaultTitle: "Your Leave Request Was Approved",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "Leaves",
    timestamp: "1 hour ago",
    timestampKey: "portal.oneHourAgo",
    descKey: "portal.notifLayla1Desc",
    defaultDesc: "Your annual leave request for Sep 22–25, 2026 has been approved by your manager.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.viewLeave",
    defaultAction: "View Leave",
    initiatorKey: "portal.managerApproval",
    defaultInitiator: "Omar Farouk (Manager)",
    scopeKey: "portal.myProfile",
    defaultScope: "My Profile",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
  {
    id: "notif-layla-2",
    role: "employee",
    userId: "user-layla",
    titleKey: "portal.notifLayla2Title",
    defaultTitle: "September Payslip Available",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "Payroll",
    timestamp: "Sep 18, 2026",
    timestampKey: "portal.sep18",
    descKey: "portal.notifLayla2Desc",
    defaultDesc: "Your September 2026 payslip is now available. You can download it from the payroll section.",
    isRead: false,
    actionType: "log",
    actionKey: "portal.viewPayslip",
    defaultAction: "View Payslip",
    initiatorKey: "portal.financeTeam",
    defaultInitiator: "Finance Team",
    scopeKey: "portal.myProfile",
    defaultScope: "My Profile",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },
  {
    id: "notif-layla-3",
    role: "employee",
    userId: "user-layla",
    titleKey: "portal.notifLayla3Title",
    defaultTitle: "Q3 Self-Evaluation Reminder",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "Evaluations",
    timestamp: "Sep 15, 2026",
    timestampKey: "portal.sep15",
    descKey: "portal.notifLayla3Desc",
    defaultDesc: "Please complete your Q3 self-evaluation form by Sep 25, 2026. It takes about 10 minutes.",
    isRead: true,
    actionType: "cycle",
    actionKey: "portal.startEvaluation",
    defaultAction: "Start Evaluation",
    initiatorKey: "portal.hrOps",
    defaultInitiator: "HR & Admin Operations",
    scopeKey: "portal.myProfile",
    defaultScope: "My Profile",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },
  {
    id: "notif-employee-4",
    role: "employee",
    userId: "user-layla",
    titleKey: "portal.notifEmp4Title",
    defaultTitle: "New Task Assigned",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "Tasks",
    timestamp: "3 hours ago",
    timestampKey: "portal.threeHoursAgo",
    descKey: "portal.notifEmp4Desc",
    defaultDesc: "You have been assigned to 'Design System Updates' with high priority due this Thursday.",
    isRead: false,
    actionType: "cycle",
    actionKey: "portal.viewTask",
    defaultAction: "View Task",
    initiatorKey: "portal.managerApproval",
    defaultInitiator: "Layla Hassan (Manager)",
    scopeKey: "portal.myProfile",
    defaultScope: "My Tasks",
    priorityKey: "portal.priorityHigh",
    defaultPriority: "High",
  },
];

// ============================================================
// PROVIDER
// ============================================================

export const NotificationProvider = ({ children, currentRole, currentUserId }) => {
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);

  // الإشعارات الخاصة بالـ role الحالي أو الـ user الحالي
  const roleNotifications = useMemo(() => {
    if (currentRole) {
      return notifications.filter((n) => n.role === currentRole);
    }
    if (currentUserId) {
      return notifications.filter((n) => n.userId === currentUserId);
    }
    return notifications;
  }, [notifications, currentRole, currentUserId]);

  const unreadCount = useMemo(() => {
    return roleNotifications.filter((n) => !n.isRead).length;
  }, [roleNotifications]);

  const toggleNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (currentRole && n.role === currentRole) {
          return { ...n, isRead: true };
        }
        if (!currentRole && currentUserId && n.userId === currentUserId) {
          return { ...n, isRead: true };
        }
        return n;
      })
    );
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) =>
      prev.filter((n) => {
        if (currentRole) return n.role !== currentRole;
        if (currentUserId) return n.userId !== currentUserId;
        return false;
      })
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: roleNotifications,
        allNotifications: notifications,
        setNotifications,
        unreadCount,
        toggleNotificationRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
        currentRole,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    return {
      notifications: [],
      allNotifications: [],
      unreadCount: 0,
      toggleNotificationRead: () => {},
      markAllAsRead: () => {},
      clearNotification: () => {},
      clearAllNotifications: () => {},
      setNotifications: () => {},
      currentRole: "admin",
    };
  }
  return ctx;
};
