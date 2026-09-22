import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiCheckCircle, FiZap, FiLayers } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const trustFeatures = [
  "Centralized Data",
  "Automated Shifts",
  "Leave Workflows",
  "Performance KPIs",
  "Audit Ready",
  "GPS Geofencing",
  "AI Career Coach",
  "Real-Time Payroll",
  "Skill-Gap Insights",
  "Role Governance",
];

export default function AboutSection() {
  const { t } = useTranslation();
  const swiperRef = useRef(null);

  const rawTicker = t("home.ticker", { returnObjects: true });
  const baseItems =
    Array.isArray(rawTicker) && rawTicker.length > 0
      ? rawTicker
      : trustFeatures;

  // Duplicate items so Swiper has plenty of slides for an uninterrupted continuous loop
  const repeatedItems = [...baseItems, ...baseItems, ...baseItems];

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay?.start();
  };

  return (
    <>
      <motion.div
        className="trust-strip"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="trust-inner">
            <div
              className="trust-items-wrapper"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Autoplay, FreeMode]}
                loop={true}
                freeMode={{ enabled: true, momentum: false }}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                speed={5000}
                slidesPerView="auto"
                spaceBetween={36}
                allowTouchMove={false}
                simulateTouch={false}
                touchStartPreventDefault={false}
                className="trust-items-swiper"
              >
                {repeatedItems.map((item, idx) => (
                  <SwiperSlide key={idx} className="trust-slide select-none">
                    <span className="trust-slide-text">{item}</span>
                    <span className="trust-slide-dot" aria-hidden="true">
                      •
                    </span>
                  </SwiperSlide>
                ))}
              </Swiper>
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
