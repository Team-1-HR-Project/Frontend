import { createContext, useContext, useMemo, useState } from "react";

const NotificationContext = createContext(null);

const initialNotifications = [
  {
    id: "notif-1",
    titleKey: "portal.notif1Title",
    defaultTitle: "Q3 2026 Evaluation Cycle Activated",
    category: "evaluations",
    badgeKey: "portal.evaluations",
    defaultBadge: "Evaluations",
    timestamp: "10 minutes ago",
    timestampKey: "portal.tenMinAgo",
    descKey: "portal.notif1Desc",
    defaultDesc:
      "The Q3 review cycle is now active for all company employees. Managers can begin submitting evaluations.",
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
    id: "notif-2",
    titleKey: "portal.notif2Title",
    defaultTitle: "New Branch Geofence Configured",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "Security",
    timestamp: "Yesterday at 3:45 PM",
    timestampKey: "portal.yesterdayTime",
    descKey: "portal.notif2Desc",
    defaultDesc:
      "Alexandria Hub geofence settings were updated and GPS enforcement is now active for the branch.",
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
    id: "notif-3",
    titleKey: "portal.notif3Title",
    defaultTitle: "AI Policy Gateway Sync Completed",
    category: "system",
    badgeKey: "portal.system",
    defaultBadge: "System",
    timestamp: "Sep 12, 2026 at 11:20 AM",
    timestampKey: "portal.sep12Time",
    descKey: "portal.notif3Desc",
    defaultDesc:
      "The latest workplace policy rules were synchronized successfully across the WiseWork platform.",
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
    id: "notif-4",
    titleKey: "portal.notif4Title",
    defaultTitle: "Role permissions updated",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "Security",
    timestamp: "Sep 11, 2026 at 9:42 AM",
    timestampKey: "portal.sep11Time",
    descKey: "portal.notif4Desc",
    defaultDesc:
      "Sarah Ahmed updated administrative permissions for the People & Culture workspace.",
    isRead: true,
    actionType: "log",
    actionKey: "portal.inspectLog",
    defaultAction: "Inspect Log",
    initiatorKey: "portal.sarahAdmin",
    defaultInitiator: "Sarah Ahmed (Admin)",
    scopeKey: "portal.users",
    defaultScope: "Users",
    priorityKey: "portal.priorityMedium",
    defaultPriority: "Medium",
  },
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(() => {
    return notifications.filter((notification) => !notification.isRead).length;
  }, [notifications]);

  const toggleNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const clearNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        toggleNotificationRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};