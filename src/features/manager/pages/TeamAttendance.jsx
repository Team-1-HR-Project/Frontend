import { useTranslation } from "react-i18next";

const TeamAttendance = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "40px 24px", textAlign: "center", color: "#64748b", fontSize: "16px" }}>
      {t("portal.teamAttendance", "Team Attendance")}
    </div>
  );
};

export default TeamAttendance;