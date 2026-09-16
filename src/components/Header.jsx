import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Header.css";

const Header = ({ role = "admin", onToggleMenu }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const avatarLetter = role ? role.charAt(0).toUpperCase() : "E";
  const displayName = t(`portal.${role}Account`, `${role.charAt(0).toUpperCase() + role.slice(1)} Account`);
  const displayRole = t("portal.staffMember", "Staff Member");

  return (
    <header className="topbar">
      {/* Mobile Menu Button */}
      <button className="menu-button" onClick={onToggleMenu} aria-label="Toggle Menu">
        <FiMenu />
      </button>

      {/* Searchbox */}
      <div className="searchbox">
        <FiSearch />
        <input placeholder={t("portal.searchPlaceholder", "Search tasks, policies, calendar...")} />
        <kbd>⌘ K</kbd>
      </div>

      {/* Right Side Actions */}
      <div className="top-actions">
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Notifications */}
        <button 
          className="icon-button" 
          aria-label="Notifications"
          onClick={() => {
            if (role === "admin") {
              navigate("/admin/notifications");
            }
          }}
          title={t("portal.notifications", "Notifications")}
        >
          <FiBell />
          <i />
        </button>

        {/* User Profile */}
        <div className="top-profile">
          <div className="avatar">{avatarLetter}</div>
          <div>
            <strong>{displayName}</strong>
            <span>{displayRole}</span>
          </div>
          <FiChevronDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
