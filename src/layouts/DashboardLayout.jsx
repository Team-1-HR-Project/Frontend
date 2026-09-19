import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { NotificationProvider } from "../context/NotificationContext";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // تحديد الدور تلقائياً من المسار الحالي ليعرض السايد بار الخاص بـ employee أو hr أو manager أو admin
  const currentUserRole = location.pathname.startsWith("/employee")
    ? "employee"
    : location.pathname.startsWith("/hr")
    ? "hr"
    : location.pathname.startsWith("/manager")
    ? "manager"
    : "admin";

  return (
    <NotificationProvider>
      <div className="portal-shell">

        <Sidebar
          role={currentUserRole}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <div className="main-area">

          <Header
            role={currentUserRole}
            onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <main className="content-outlet">
            <Outlet />
          </main>

        </div>
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;