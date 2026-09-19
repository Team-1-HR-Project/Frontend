import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { NotificationProvider } from "../context/NotificationContext";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  // ==================== Determine Current User Role ====================

  let currentUserRole = "admin";

  if (location.pathname.startsWith("/employee")) {
    currentUserRole = "employee";
  } else if (location.pathname.startsWith("/hr")) {
    currentUserRole = "hr";
  } else if (location.pathname.startsWith("/manager")) {
    currentUserRole = "manager";
  } else if (location.pathname.startsWith("/admin")) {
    currentUserRole = "admin";
  }

  return (
    <NotificationProvider>
      <div className="portal-shell">
        {/* ==================== Sidebar ==================== */}

        <Sidebar
          role={currentUserRole}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* ==================== Main Area ==================== */}

        <div className="main-area">
          {/* ==================== Header ==================== */}

          <Header
            role={currentUserRole}
            onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          {/* ==================== Page Content ==================== */}

          <main className="content-outlet">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;
