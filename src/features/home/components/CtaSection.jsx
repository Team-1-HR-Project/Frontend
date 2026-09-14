import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";

export default function CtaSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div className="cta-box">
          <div>
            <div className="section-kicker">
              <span className="eyebrow-dot" style={{ background: '#FFFFFF' }}></span>
              <span>{t("home.cta.badge")}</span>
            </div>
            <h2>
              {t("home.cta.title")}
            </h2>
            <p>{t("home.cta.subtitle")}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            <Link to="/register" className="button button-light">
              <span>{t("home.cta.btnPrimary")}</span>
              <FiArrowRight style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
            </Link>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
              {t("home.cta.noCreditCard")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
