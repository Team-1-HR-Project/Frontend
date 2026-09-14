import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";
import logoImg from "../../../assets/logo.jpeg";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = [
        "home",
        "about",
        "features",
        "roles",
        "plans",
        "contact",
      ];
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "home", label: t("home.nav.home") },
    { id: "about", label: t("home.nav.about") },
    { id: "features", label: t("home.nav.features") },
    { id: "roles", label: t("home.nav.roles") },
    { id: "plans", label: t("home.nav.plans") },
  ];

  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 999999,
      }}
    >
      <div className="container">
        <nav className="nav">
          {/* Brand */}
          <a
            href="#home"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <img src={logoImg} alt="WorkWise" className="brand-logo-img" />
            <span>WorkWise</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <LanguageSwitcher />
            <Link to="/login" className="button button-primary">
              {t("home.nav.signIn")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={activeSection === link.id ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
        <div className="mobile-nav-bottom">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="button button-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("home.nav.signIn")}
          </Link>
        </div>
      </div>
    </header>
  );
}
