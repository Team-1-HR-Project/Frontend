import "../../../Styles/auth/Login.css";

const MainAuthForm = ({ children }) => {
  return (
    <div className="login-page-container">
      <div className="login-wrapper">
        {/* LEFT SIDE: BRANDING */}
        {/* الجزء ده ثابت في كل صفحات الـ Auth */}

        <div className="hero-side">
          <div className="brand">
            <div className="brand-logo">HR</div>

            <div>
              <div className="brand-name">SMART HR</div>

              <div className="brand-subtitle">Employee Companion Portal</div>
            </div>
          </div>

          <div className="hero-body">
            <h2>Streamline Your Workspace & People Operations</h2>

            <p>
              Access your portal securely to manage your daily workspace,
              benefits, and workplace tools.
            </p>
          </div>

          <div className="security-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
              <path d="M9.5 12l1.7 1.7 3.4-3.4" />
            </svg>

            <span>Enterprise v2026 — Secure Workspace</span>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        {/* هنا هيظهر محتوى Login أو Register أو غيره */}

        <main className="form-side">{children}</main>
      </div>
    </div>
  );
};

export default MainAuthForm;
