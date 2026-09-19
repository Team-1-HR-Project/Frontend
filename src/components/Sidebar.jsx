import { NavLink } from "react-router-dom";
import { FiArrowRight, FiMoreHorizontal, FiHelpCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { navConfig } from "../navigation/navConfig";
import { useNotifications } from "../context/NotificationContext";
import logoImg from "../assets/Logos.svg";
import "./Sidebar.css";

const Sidebar = ({ role = "admin", isOpen = false, onClose }) => {
  const { t } = useTranslation();
  const { unreadCount } = useNotifications();

  const links = navConfig[role] || [];

  // Initials for avatar
  const avatarLetter = role ? role.charAt(0).toUpperCase() : "E";
  const portalLabel = t(`portal.${role}Portal`, `${role.toUpperCase()} PORTAL`);
  const displayName = t(
    `portal.${role}Account`,
    `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
  );
  const displayTitle = t(`portal.staffMember`, "Workwise Workspace");

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(16, 42, 67, 0.5)",
            zIndex: 35,
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Brand */}
        <div className="logotitle">
          <img
            src={logoImg}
            alt="Workwise Logo"
            className="logotitle-logo-img"
          />
          <span>Workwise</span>
        </div>

        {/* Workspace Label */}
        <div className="workspace-label">{portalLabel}</div>

        {/* Navigation Links based on role */}
        <nav className="side-nav">
          {links.map((link) => {
            const Icon = link.icon;
            const title = link.titleKey
              ? t(link.titleKey, link.title)
              : link.title;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                {Icon && <Icon />}
                <span>{title}</span>
                {link.path.includes("notifications") && unreadCount > 0 && (
                  <b>{unreadCount}</b>
                )}

                {link.badge && <b>{link.badge}</b>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Area */}
        <div className="sidebar-bottom">
          {/* Need a hand card */}
          <div className="help-card">
            <FiHelpCircle />
            <div>
              <strong>{t("portal.needAHand", "Need a hand?")}</strong>
              <span>{t("portal.askAi", "Ask the AI Assistant")}</span>
            </div>
            <FiArrowRight className="card-arrow" />
          </div>

          {/* User Profile Mini */}
          <div className="user-mini">
            <div className="avatar">{avatarLetter}</div>
            <div>
              <strong>{displayName}</strong>
              <span>{displayTitle}</span>
            </div>
            <FiMoreHorizontal />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
