import { useTranslation } from "react-i18next";

const TeamEvaluations = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "40px 24px", textAlign: "center", color: "#64748b", fontSize: "16px" }}>
      {t("portal.teamEvaluations", "Team Evaluations")}
    </div>
  );
};

export default TeamEvaluations;