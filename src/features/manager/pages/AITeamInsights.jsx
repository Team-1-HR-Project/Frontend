import { useTranslation } from "react-i18next";

const AITeamInsights = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "40px 24px", textAlign: "center", color: "#64748b", fontSize: "16px" }}>
      {t("portal.aiTeamInsights", "AI Team Insights")}
    </div>
  );
};

export default AITeamInsights;