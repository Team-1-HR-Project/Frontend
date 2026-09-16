import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { NotificationProvider } from "../context/NotificationContext";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // الدور حاليًا للتجربة
  // بعدين هييجي من الـ Backend
  const currentUserRole = "admin";

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