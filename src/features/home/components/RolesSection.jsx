import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";

export default function RolesSection() {
  const { t } = useTranslation();

  const roleCards = [
    {
      num: "01",
      label: "HR Leaders",
      className: "role-1",
      title: "Full Control & Compliance",
      desc: "Manage employee files, automate onboarding, oversee company policies, and export payroll-ready data with zero stress.",
      points: [
        "Automated onboarding workflows",
        "Direct policy enforcement",
        "Comprehensive audit logs"
      ]
    },
    {
      num: "02",
      label: "Employees",
      className: "role-2",
      title: "Transparent Self-Service",
      desc: "Check in seamlessly, request time off in seconds, review personal goals, and view workplace benefits anywhere.",
      points: [
        "1-click leave requests",
        "Live balance tracking",
        "Personal goal transparency"
      ]
    },
    {
      num: "03",
      label: "Managers & C-Level",
      className: "role-3",
      title: "Strategic Decision Making",
      desc: "Approve team requests, evaluate quarterly performance, track department productivity, and optimize workforce planning.",
      points: [
        "Single approval dashboard",
        "Live department headcount",
        "Objective performance scoring"
      ]
    }
  ];

  return (
    <section id="roles" className="section">
      <div className="container">
        <div className="center-heading">
          <div className="section-kicker">
            <span className="eyebrow-dot"></span>
            <span>{t("home.roles.badge")}</span>
          </div>
          <h2>{t("home.roles.title")}</h2>
          <p>{t("home.roles.subtitle")}</p>
        </div>

        <div className="roles-grid">
          {roleCards.map((card, idx) => (
            <div key={idx} className={`role-card ${card.className}`}>
              <div>
                <span className="role-number">{card.num}</span>
                <span className="role-label">{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>

              <ul>
                {card.points.map((pt, pIdx) => (
                  <li key={pIdx}>
                    <FiCheck />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
