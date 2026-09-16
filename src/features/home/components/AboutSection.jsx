import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiCheckCircle, FiZap, FiLayers } from "react-icons/fi";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <>
      {/* =========================
          TRUST STRIP
      ========================= */}

      <motion.div
        className="trust-strip"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
        }}
      >
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
      </motion.div>

      {/* =========================
          ABOUT SECTION
      ========================= */}

      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">
            {/* LEFT SIDE */}
            <motion.div
              initial={{
                opacity: 0,
                x: -60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <div className="section-kicker">
                <span className="eyebrow-dot"></span>

                <span>{t("home.about.badge")}</span>
              </div>

              <h2>{t("home.about.title")}</h2>

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
            </motion.div>

            {/* RIGHT SIDE CARD */}
            <motion.div
              className="about-card-right"
              initial={{
                opacity: 0,
                x: 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: "easeOut",
              }}
            >
              {/* Solution */}
              <div className="about-card-item">
                <div className="about-item-icon green">
                  <FiCheckCircle />
                </div>

                <div>
                  <div className="about-item-title">
                    {t("home.about.solutionTitle")}
                  </div>

                  <div className="about-item-desc">
                    {t("home.about.solutionDesc")}
                  </div>
                </div>
              </div>

              {/* Problem */}
              <div className="about-card-item">
                <div className="about-item-icon">
                  <FiLayers />
                </div>

                <div>
                  <div className="about-item-title">
                    {t("home.about.problemTitle")}
                  </div>

                  <div className="about-item-desc">
                    {t("home.about.problemDesc")}
                  </div>
                </div>
              </div>

              {/* Real-Time Clarity */}
              <div className="about-card-item">
                <div className="about-item-icon">
                  <FiZap />
                </div>

                <div>
                  <div className="about-item-title">
                    Real-Time Operational Clarity
                  </div>

                  <div className="about-item-desc">
                    Everything from attendance punches to leave balances update
                    live across all departments.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
