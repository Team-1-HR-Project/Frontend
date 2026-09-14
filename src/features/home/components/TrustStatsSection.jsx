import { useTranslation } from "react-i18next";

export default function TrustStatsSection() {
  const { t } = useTranslation();

  const stats = [
    { number: t("home.stats.uptime"), label: t("home.stats.uptimeLabel") },
    { number: t("home.stats.speed"), label: t("home.stats.speedLabel") },
    { number: t("home.stats.employeesCount"), label: t("home.stats.employeesLabel") },
    { number: t("home.stats.security"), label: t("home.stats.securityLabel") }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat">
              <strong>{stat.number}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
