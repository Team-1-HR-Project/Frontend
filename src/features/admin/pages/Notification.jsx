import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiChevronRight, 
  FiArrowUpRight, 
  FiCheck, 
  FiX, 
  FiSearch, 
  FiBellOff, 
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiAward,
  FiLayers
} from "react-icons/fi";
import "./Notification.css";

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
    id: "notif-2",
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
    id: "notif-3",
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
    id: "notif-4",
    titleKey: "portal.notif4Title",
    defaultTitle: "Role permissions updated",
    category: "security",
    badgeKey: "portal.security",
    defaultBadge: "Security",
    timestamp: "Sep 11, 2026 at 9:42 AM",
    timestampKey: "portal.sep11Time",
    descKey: "portal.notif4Desc",
    defaultDesc: "Sarah Ahmed updated administrative permissions for the People & Culture workspace.",
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

export default function Notification() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Category / read filter
      if (filter === "unread" && item.isRead) return false;
      if (filter === "seen" && !item.isRead) return false;
      if (filter !== "all" && filter !== "unread" && filter !== "seen" && item.category !== filter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const title = (t(item.titleKey, item.defaultTitle) || "").toLowerCase();
        const desc = (t(item.descKey, item.defaultDesc) || "").toLowerCase();
        return title.includes(query) || desc.includes(query);
      }

      return true;
    });
  }, [notifications, filter, searchQuery, t]);

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    toast.success(t("portal.markedAllSuccess", "All notifications marked as read"), { id: "toast-mark-all" });
  };

  // Clear all notifications
  const handleClearAll = () => {
    if (notifications.length === 0) return;
    setNotifications([]);
    setSelectedNotification(null);
    toast.success(t("portal.clearedAllSuccess", "All notifications cleared successfully"), { id: "toast-clear-all" });
  };

  // Toggle Seen/Unread for a specific notification
  const handleToggleRead = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const targetItem = notifications.find((item) => item.id === id);
    if (!targetItem) return;

    const nextStatus = !targetItem.isRead;

    // Toast triggered once outside state updater with deduplication ID
    if (nextStatus) {
      toast.success(t("portal.markedSeenSuccess", "Notification marked as seen"), { id: `toast-seen-${id}` });
    } else {
      toast.success(t("portal.markedUnreadSuccess", "Notification marked as unread"), { id: `toast-unread-${id}` });
    }

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: nextStatus } : item
      )
    );

    // If modal is open for this item, keep it in sync
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification((prev) => ({ ...prev, isRead: nextStatus }));
    }
  };

  // Clear a single notification
  const handleClear = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification(null);
    }
    toast.success(t("portal.clearedSuccess", "Notification cleared successfully"), { id: `toast-clear-${id}` });
  };

  // Export configuration
  const handleExportConfig = () => {
    const configData = {
      system: "WiseWork Admin Portal",
      exportDate: new Date().toISOString(),
      notificationSettings: {
        evaluations: true,
        securityAlerts: true,
        systemAudit: true,
        emailDigest: "daily",
        activeChannels: ["in-app", "email"]
      },
      currentNotificationsCount: notifications.length,
      unreadCount
    };
    
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wisework-notifications-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(t("portal.exportSuccess", "Configuration exported successfully"));
  };

  return (
    <div className="admin-notifications-page">
      {/* Top Breadcrumb & Title */}
      <div className="page-header-row">
        <div className="page-title-group">
          <div className="admin-breadcrumbs">
            {t("portal.administration", "Administration")}
            <FiChevronRight />
            <span>{t("portal.wiseWork", "WiseWork")}</span>
          </div>
          <h1>{t("portal.notificationsTitle", "Notifications")}</h1>
          <p>{t("portal.notificationsSubtitle", "Configure and manage your WiseWork notifications.")}</p>
        </div>

        {/* Export Configuration Button */}
        <button 
          type="button" 
          className="btn-export-config" 
          onClick={handleExportConfig}
          id="btn-export-configuration"
        >
          <FiArrowUpRight />
          <span>{t("portal.exportConfig", "Export configuration")}</span>
        </button>
      </div>

      {/* Section Subheading & Action Controls */}
      <div className="section-subheading-row">
        <div>
          <h2>{t("portal.systemAlertsTitle", "System Notifications & Alerts")}</h2>
          <p>{t("portal.systemAlertsSubtitle", "Review system events, policy updates, and operational reminders")}</p>
        </div>

        <div className="section-controls">
          {/* Mark All As Read */}
          <button
            type="button"
            className="btn-mark-all"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            id="btn-mark-all-as-read"
            title={t("portal.markAllAsRead", "Mark all as read")}
          >
            <FiCheck />
            <span>{t("portal.markAllAsRead", "Mark all as read")}</span>
          </button>

          {/* Clear All */}
          <button
            type="button"
            className="btn-clear-all"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            id="btn-clear-all-notifications"
            title={t("portal.clearAll", "Clear All")}
          >
            <FiTrash2 />
            <span>{t("portal.clearAll", "Clear All")}</span>
          </button>

          {/* Filter Select */}
          <select
            className="select-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            id="select-notifications-filter"
            aria-label="Filter notifications"
          >
            <option value="all">{t("portal.all", "All")}</option>
            <option value="unread">{t("portal.unread", "Unread")}</option>
            <option value="seen">{t("portal.seen", "Seen")}</option>
            <option value="evaluations">{t("portal.evaluations", "Evaluations")}</option>
            <option value="security">{t("portal.security", "Security")}</option>
            <option value="system">{t("portal.system", "System")}</option>
          </select>
        </div>
      </div>

      {/* Main Notification Center Card */}
      <div className="notification-card">
        <div className="card-header-block">
          <div>
            <h3>{t("portal.notificationCenter", "Notification center")}</h3>
            <p>
              {unreadCount > 0
                ? t("portal.unreadCountMsg", { count: unreadCount, defaultValue: `${unreadCount} unread notifications requiring your attention.` })
                : t("portal.allReviewedMsg", "All notifications have been reviewed.")}
            </p>
          </div>

          {/* Quick Search */}
          <div className="search-box-wrap">
            <FiSearch />
            <input
              type="text"
              placeholder={t("portal.searchNotifications", "Search notifications...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="input-search-notifications"
            />
          </div>
        </div>

        {/* Notifications List */}
        <div className="notification-list">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => {
                const title = t(item.titleKey, item.defaultTitle);
                const desc = t(item.descKey, item.defaultDesc);
                const badge = t(item.badgeKey, item.defaultBadge);
                const time = t(item.timestampKey, item.timestamp);
                const actionLabel = item.actionKey ? t(item.actionKey, item.defaultAction) : item.defaultAction;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`notification-item ${item.isRead ? "item-read" : ""}`}
                    onClick={() => setSelectedNotification(item)}
                  >
                    {/* Status Dot */}
                    <span 
                      className={`status-dot ${item.isRead ? "read" : "unread"}`} 
                      title={item.isRead ? t("portal.seen", "Seen") : t("portal.unread", "Unread")}
                      onClick={(e) => handleToggleRead(item.id, e)}
                    />

                    {/* Main Content */}
                    <div className="item-main-content">
                      <div className="item-header-line">
                        <div className="item-title-badge">
                          <span className="item-title">{title}</span>

                          <span className={`item-badge ${item.category}`}>
                            <span className="badge-bullet">•</span> {badge}
                          </span>
                        </div>

                        <span className="item-timestamp">{time}</span>
                      </div>

                      <p className="item-description">{desc}</p>

                      {/* Row Actions */}
                      <div className="item-actions-row">
                        <div className="item-left-actions">
                          {/* Contextual Action (View Cycle / Inspect Log) */}
                          {item.actionType && item.actionType !== "system" && (
                            <button
                              type="button"
                              className="btn-item-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedNotification(item);
                              }}
                            >
                              {actionLabel}
                            </button>
                          )}

                          {/* Quick Mark as Seen/Unseen */}
                          <button
                            type="button"
                            className={`btn-quick-seen ${item.isRead ? "is-seen" : ""}`}
                            onClick={(e) => handleToggleRead(item.id, e)}
                            title={item.isRead ? t("portal.markAsUnread", "Mark as Unread") : t("portal.markAsSeen", "Mark as Seen")}
                          >
                            {item.isRead ? <FiCheckCircle /> : <FiEye />}
                            <span>{item.isRead ? t("portal.seen", "Seen") : t("portal.markAsSeen", "Mark as Seen")}</span>
                          </button>
                        </div>

                        {/* Quick Clear / Delete */}
                        <button
                          type="button"
                          className="btn-quick-clear"
                          onClick={(e) => handleClear(item.id, e)}
                          title={t("portal.clearNotification", "Clear Notification")}
                          aria-label={t("portal.clearNotification", "Clear Notification")}
                        >
                          <FiTrash2 />
                          <span>{t("portal.clearNotification", "Clear")}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                className="empty-notifications"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="empty-icon-wrap">
                  <FiBellOff />
                </div>
                <h4>{t("portal.noNotificationsTitle", "No notifications found")}</h4>
                <p>{t("portal.noNotificationsDesc", "There are no notifications matching your current filter.")}</p>
                {(filter !== "all" || searchQuery) && (
                  <button 
                    type="button" 
                    className="btn-reset-filter"
                    onClick={() => {
                      setFilter("all");
                      setSearchQuery("");
                    }}
                  >
                    {t("portal.resetFilter", "Reset Filter")}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Selected Notification Full Details Modal */}
      {selectedNotification && (
        <div className="modal-overlay" onClick={() => setSelectedNotification(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <span className={`item-badge ${selectedNotification.category}`}>
                  <span className="badge-bullet">•</span> {t(selectedNotification.badgeKey, selectedNotification.defaultBadge)}
                </span>
                <span className="item-timestamp">
                  {t(selectedNotification.timestampKey, selectedNotification.timestamp)}
                </span>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setSelectedNotification(null)}
                title={t("portal.closeModal", "Close")}
              >
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <h3 className="modal-main-title">
                {t(selectedNotification.titleKey, selectedNotification.defaultTitle)}
              </h3>
              <p className="modal-main-desc">
                {t(selectedNotification.descKey, selectedNotification.defaultDesc)}
              </p>

              {/* Specific info table based on notification type */}
              {selectedNotification.actionType === "cycle" ? (
                <div className="modal-info-table">
                  <div className="info-row">
                    <span className="info-label">{t("portal.cycleNameLabel", "Cycle Name:")}</span>
                    <span className="info-val">{t("portal.cycleNameVal", "Q3 2026 Performance Review")}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.cycleDurationLabel", "Duration:")}</span>
                    <span className="info-val">{t("portal.cycleDurationVal", "Sep 15, 2026 - Oct 15, 2026")}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.targetAudienceLabel", "Target Audience:")}</span>
                    <span className="info-val">{t("portal.targetAudienceVal", "All Employees (1,248 Users)")}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.branchesLabel", "Branches:")}</span>
                    <span className="info-val">{t("portal.branchesVal", "Cairo & Alexandria")}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.currentStatusLabel", "Current Status:")}</span>
                    <span className="info-val" style={{ color: "#3f7d5a" }}>
                      {t("portal.cycleStatusVal", "Active • 64% completed")}
                    </span>
                  </div>
                </div>
              ) : selectedNotification.actionType === "log" ? (
                <div className="modal-info-table">
                  <div className="info-row">
                    <span className="info-label">{t("portal.eventIdLabel", "Event ID:")}</span>
                    <span className="info-val">LOG-2026-94812</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.initiatorLabel", "Initiator:")}</span>
                    <span className="info-val">
                      {t(selectedNotification.initiatorKey, selectedNotification.defaultInitiator)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.actionLabel", "Action:")}</span>
                    <span className="info-val">{t("portal.actionVal", "Geofence / Security Policy Update")}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.ipAddressLabel", "IP Address:")}</span>
                    <span className="info-val">{t("portal.ipAddressVal", "197.38.112.44 (Alexandria)")}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.statusLabel", "Status:")}</span>
                    <span className="info-val" style={{ color: "#3f7d5a" }}>
                      {t("portal.logStatusVal", "Verified & Applied")}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="modal-info-table">
                  <div className="info-row">
                    <span className="info-label">{t("portal.initiator", "Initiator:")}</span>
                    <span className="info-val">
                      {t(selectedNotification.initiatorKey, selectedNotification.defaultInitiator)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.scope", "Scope:")}</span>
                    <span className="info-val">
                      {t(selectedNotification.scopeKey, selectedNotification.defaultScope)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.priority", "Priority:")}</span>
                    <span className="info-val">
                      {t(selectedNotification.priorityKey, selectedNotification.defaultPriority)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">{t("portal.status", "Status:")}</span>
                    <span className="info-val" style={{ color: selectedNotification.isRead ? "#627d98" : "#3f7d5a" }}>
                      {selectedNotification.isRead ? t("portal.seen", "Seen") : t("portal.unseen", "Unread")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Bar (Seen, Clear, Close) */}
            <div className="modal-actions-bar">
              <div className="modal-left-actions">
                {/* Toggle Seen / Unread */}
                <button
                  type="button"
                  className={`btn-modal-seen ${selectedNotification.isRead ? "is-seen" : ""}`}
                  onClick={() => handleToggleRead(selectedNotification.id)}
                >
                  {selectedNotification.isRead ? <FiEyeOff /> : <FiCheck />}
                  <span>
                    {selectedNotification.isRead 
                      ? t("portal.markAsUnread", "Mark as Unread") 
                      : t("portal.markAsSeen", "Mark as Seen")}
                  </span>
                </button>

                {/* Clear Notification */}
                <button
                  type="button"
                  className="btn-modal-clear"
                  onClick={() => handleClear(selectedNotification.id)}
                >
                  <FiTrash2 />
                  <span>{t("portal.clearNotification", "Clear Notification")}</span>
                </button>
              </div>

              {/* Close Modal */}
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => setSelectedNotification(null)}
              >
                {t("portal.closeModal", "Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
