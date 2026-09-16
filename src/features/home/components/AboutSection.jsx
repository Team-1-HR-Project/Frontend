import { useTranslation } from "react-i18next";
import { FiCheckCircle, FiZap, FiLayers } from "react-icons/fi";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <>
      {/* Trust Strip */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-inner">
            <p>Unified Enterprise HR Engine</p>
            <div className="trust-items">
              <span>Centralized Data</span>
              <span>Automated Shifts</span>
              <span>Leave Workflows</span>
              <span>Performance KPIs</span>
              <span>Audit Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="section-kicker">
                <span className="eyebrow-dot"></span>
                <span>{t("home.about.badge")}</span>
              </div>

              <h2>
                {t("home.about.title")}
              </h2>

              <p className="section-lead" style={{ marginTop: "18px" }}>
                {t("home.about.subtitle")}
              </p>

              <div className="highlight-row">
                <div>
                  <strong>0 Silos</strong>
                  <span>Unified workforce records</span>
                </div>
                <div>
                  <strong>45% Faster</strong>
                  <span>Daily approval workflows</span>
                </div>
                <div>
                  <strong>100% Audit-Ready</strong>
                  <span>Compliance & policy tracking</span>
                </div>
              </div>
            </div>

            {/* Right side card */}
            <div className="about-card-right">
              <div className="about-card-item">
                <div className="about-item-icon green">
                  <FiCheckCircle />
                </div>
                <div>
                  <div className="about-item-title">{t("home.about.solutionTitle")}</div>
                  <div className="about-item-desc">{t("home.about.solutionDesc")}</div>
                </div>
              </div>

              <div className="about-card-item">
                <div className="about-item-icon">
                  <FiLayers />
                </div>
                <div>
                  <div className="about-item-title">{t("home.about.problemTitle")}</div>
                  <div className="about-item-desc">{t("home.about.problemDesc")}</div>
                </div>
              </div>

              <div className="about-card-item">
                <div className="about-item-icon">
                  <FiZap />
                </div>
                <div>
                  <div className="about-item-title">Real-Time Operational Clarity</div>
                  <div className="about-item-desc">Everything from attendance punches to leave balances update live across all departments.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
