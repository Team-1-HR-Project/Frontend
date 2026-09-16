import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiCalendar, FiCheckCircle } from "react-icons/fi";

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headlines & CTA */}
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              <span>{t("home.hero.badge")}</span>
            </div>

            <h1>
              {t("home.hero.titleMain")}{" "}
              <span>{t("home.hero.titleAccent")}</span>
            </h1>

            <p className="hero-text">
              {t("home.hero.description")}
            </p>

            <div className="hero-cta">
              <Link to="/register" className="button button-primary">
                <span>{t("home.hero.ctaPrimary")}</span>
                <FiArrowRight style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
              </Link>
              <button onClick={scrollToFeatures} className="button button-secondary">
                {t("home.hero.ctaSecondary")}
              </button>
            </div>

            <div className="hero-proof">
              <div className="proof-avatars">
                <span>HR</span>
                <span>WW</span>
                <span>AI</span>
              </div>
              <p>
                <strong>10,000+</strong> {t("home.hero.trustedBy")}
              </p>
            </div>
          </div>

          {/* Right Column: Visual HR Dashboard Mockup with Floating Badges */}
          <div className="hero-visual">
            <div className="visual-glow"></div>

            {/* Floating Top Badge */}
            <div className="floating-card floating-top">
              <div className="floating-icon">
                <FiCalendar />
              </div>
              <div>
                <strong>Shift Scheduled</strong>
                <small>Today, 09:00 AM • Main Branch</small>
              </div>
            </div>

            {/* Shell Card */}
            <div className="preview-shell">
              <div className="preview-bar">
                <div className="preview-dots">
                  <span className="preview-dot"></span>
                  <span className="preview-dot"></span>
                  <span className="preview-dot"></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span className="preview-dot green"></span>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#3F7D5A" }}>
                    {t("home.hero.preview.liveStatus")}
                  </span>
                </div>
              </div>

              <div className="preview-content">
                {/* User Row */}
                <div className="preview-user-row">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="avatar">WW</div>
                    <div>
                      <strong style={{ fontSize: "13px", color: "#243B53", display: "block" }}>WorkWise Portal</strong>
                      <span style={{ fontSize: "10px", color: "#6B7785" }}>Enterprise Operations</span>
                    </div>
                  </div>
                  <span className="preview-badge-status">Active Q3</span>
                </div>

                {/* 3 Stats Grid */}
                <div className="preview-stats-row">
                  <div className="mini-stat">
                    <span>{t("home.hero.preview.attendanceRate")}</span>
                    <strong style={{ color: "#3F7D5A" }}>{t("home.hero.preview.attendanceRateVal")}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>{t("home.hero.preview.activeEmployees")}</span>
                    <strong>{t("home.hero.preview.activeEmployeesVal")}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>{t("home.hero.preview.pendingRequests")}</span>
                    <strong style={{ color: "#C58B2A" }}>{t("home.hero.preview.pendingRequestsVal")}</strong>
                  </div>
                </div>

                {/* Chart Card */}
                <div className="chart-card">
                  <div className="chart-header">
                    <span>Weekly Workforce Presence</span>
                    <span style={{ color: "#5B8C6A" }}>+4.2% this week</span>
                  </div>
                  <div className="chart-lines">
                    <span style={{ height: "45%" }}></span>
                    <span style={{ height: "65%" }}></span>
                    <span style={{ height: "85%" }}></span>
                    <span style={{ height: "60%" }}></span>
                    <span style={{ height: "95%" }}></span>
                    <span style={{ height: "70%" }}></span>
                    <span style={{ height: "90%" }}></span>
                  </div>
                </div>

                {/* Insight Mini */}
                <div className="insight-mini">
                  <strong>Insight: </strong>
                  {t("home.hero.preview.aiInsightText")}
                </div>
              </div>
            </div>

            {/* Floating Bottom Badge */}
            <div className="floating-card floating-bottom">
              <div className="floating-icon green">
                <FiCheckCircle />
              </div>
              <div>
                <strong>Leave Request Approved</strong>
                <small>Sarah Jenkins • Annual Leave</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
