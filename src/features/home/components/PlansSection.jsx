import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";

export default function PlansSection() {
  const { t } = useTranslation();

  const planTiers = [
    {
      key: "basic",
      name: t("home.plans.basic.name"),
      audience: "For teams getting started",
      price: t("home.plans.basic.price"),
      userPeriod: t("home.plans.basic.userPeriod"),
      desc: t("home.plans.basic.desc"),
      features: t("home.plans.basic.features", { returnObjects: true }) || [],
      featured: false,
      btnClass: "button-secondary",
      btnText: t("home.plans.getStarted")
    },
    {
      key: "pro",
      name: t("home.plans.pro.name"),
      audience: "For growing organizations",
      price: t("home.plans.pro.price"),
      userPeriod: t("home.plans.pro.userPeriod"),
      desc: t("home.plans.pro.desc"),
      features: t("home.plans.pro.features", { returnObjects: true }) || [],
      featured: true,
      btnClass: "button-primary",
      btnText: t("home.plans.getStarted")
    },
    {
      key: "enterprise",
      name: t("home.plans.enterprise.name"),
      audience: "For large enterprise teams",
      price: t("home.plans.enterprise.price"),
      userPeriod: t("home.plans.enterprise.userPeriod"),
      desc: t("home.plans.enterprise.desc"),
      features: t("home.plans.enterprise.features", { returnObjects: true }) || [],
      featured: false,
      btnClass: "button-secondary",
      btnText: t("home.plans.contactSales")
    }
  ];

  return (
    <section id="plans" className="plans-section section">
      <div className="container">
        <div className="center-heading">
          <div className="section-kicker">
            <span className="eyebrow-dot"></span>
            <span>{t("home.plans.badge")}</span>
          </div>
          <h2>{t("home.plans.title")}</h2>
          <p>{t("home.plans.subtitle")}</p>
        </div>

        <div className="plans-grid">
          {planTiers.map((plan) => (
            <div
              key={plan.key}
              className={`plan-card ${plan.featured ? "plan-featured" : ""}`}
            >
              {plan.featured && (
                <div className="recommended">{t("home.plans.recommendedBadge")}</div>
              )}

              <div className="plan-top">
                <div className="plan-name">{plan.name}</div>
                <div className="plan-audience">{plan.audience}</div>

                <div className="plan-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.userPeriod}</span>
                </div>

                <p className="plan-copy">{plan.desc}</p>
              </div>

              <ul>
                {Array.isArray(plan.features) &&
                  plan.features.map((feat, idx) => (
                    <li key={idx}>
                      <FiCheck />
                      <span>{feat}</span>
                    </li>
                  ))}
              </ul>

              <Link to="/register" className={`button plan-button ${plan.btnClass}`}>
                {plan.btnText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
