import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { NotificationProvider } from "../context/NotificationContext";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // الدور حاليًا بيتحدد من مسار الـ URL مؤقتًا لحد ما يتوصل بالـ Backend/Auth الحقيقي
  const roleFromPath = location.pathname.split("/")[1];
  const knownRoles = ["admin", "hr", "manager", "employee"];
  const currentUserRole = knownRoles.includes(roleFromPath)
    ? roleFromPath
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