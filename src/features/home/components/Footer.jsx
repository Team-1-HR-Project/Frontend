import { useTranslation } from "react-i18next";
import logoImg from "../../../assets/logo.jpeg";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="brand">
              <img src={logoImg} alt="WorkWise" className="brand-logo-img" />
              <span>WorkWise</span>
            </div>
            <p className="footer-copy">{t("home.footer.tagline")}</p>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div>
              <strong>{t("home.footer.platformTitle")}</strong>
              <a href="#features">{t("home.footer.links.directory")}</a>
              <a href="#features">{t("home.footer.links.attendance")}</a>
              <a href="#features">{t("home.footer.links.leaves")}</a>
              <a href="#features">{t("home.footer.links.performance")}</a>
            </div>

            <div>
              <strong>{t("home.footer.resourcesTitle")}</strong>
              <a href="#about">{t("home.footer.links.docs")}</a>
              <a href="#about">{t("home.footer.links.security")}</a>
              <a href="#contact">{t("home.footer.links.help")}</a>
            </div>

            <div>
              <strong>{t("home.footer.companyTitle")}</strong>
              <a href="#about">{t("home.footer.links.about")}</a>
              <a href="#roles">{t("home.footer.links.careers")}</a>
              <a href="#contact">{t("home.footer.links.privacy")}</a>
            </div>

            <div>
              <strong>{t("home.footer.contactTitle")}</strong>
              <a href="mailto:support@workwise.io">{t("home.footer.contactInfo.email")}</a>
              <span>{t("home.footer.contactInfo.phone")}</span>
              <span>{t("home.footer.contactInfo.location")}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t("home.footer.copyright")}</span>
          <span>Enterprise Grade People Operations Platform</span>
        </div>
      </div>
    </footer>
  );
}
