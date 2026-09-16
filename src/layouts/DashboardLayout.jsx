import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // للتجربة: نقوم بتغيير هذا الدور لنجرب شكل السايد بار والهيدر
  const currentUserRole = "employee"; 

  return (
    <div className="portal-shell">
      {/* السايد بار الثابت */}
      <Sidebar 
        role={currentUserRole} 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      {/* القسم الرئيسي */}
      <div className="main-area">
        <Header 
          role={currentUserRole} 
          onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        
        {/* محتوى الصفحة المتغير */}
        <main className="content-outlet">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
