import { useTranslation } from "react-i18next";
import { FiUsers, FiClock, FiCalendar, FiTrendingUp, FiBarChart2, FiCpu } from "react-icons/fi";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const featureItems = [
    {
      key: "employees",
      icon: <FiUsers />,
      title: t("home.features.items.employees.title"),
      desc: t("home.features.items.employees.desc"),
      highlight: false
    },
    {
      key: "attendance",
      icon: <FiClock />,
      title: t("home.features.items.attendance.title"),
      desc: t("home.features.items.attendance.desc"),
      highlight: false
    },
    {
      key: "leaves",
      icon: <FiCalendar />,
      title: t("home.features.items.leaves.title"),
      desc: t("home.features.items.leaves.desc"),
      highlight: false
    },
    {
      key: "performance",
      icon: <FiTrendingUp />,
      title: t("home.features.items.performance.title"),
      desc: t("home.features.items.performance.desc"),
      highlight: false
    },
    {
      key: "reports",
      icon: <FiBarChart2 />,
      title: t("home.features.items.reports.title"),
      desc: t("home.features.items.reports.desc"),
      highlight: false
    },
    {
      key: "aiInsights",
      icon: <FiCpu />,
      title: t("home.features.items.aiInsights.title"),
      desc: t("home.features.items.aiInsights.desc"),
      highlight: true
    }
  ];

  return (
    <section id="features" className="section section-tint">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <span className="eyebrow-dot"></span>
              <span>{t("home.features.badge")}</span>
            </div>
            <h2>{t("home.features.title")}</h2>
          </div>
          <p>{t("home.features.subtitle")}</p>
        </div>

        <div className="feature-grid">
          {featureItems.map((item) => (
            <div key={item.key} className={`feature-card ${item.highlight ? "highlight" : ""}`}>
              <div className="feature-icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
