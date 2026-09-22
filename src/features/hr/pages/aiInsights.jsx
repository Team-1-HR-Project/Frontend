import { useTranslation } from "react-i18next";
import { Sparkles, ShieldCheck } from "lucide-react";

// =====================================================
// SMART HR BRAND TOKENS
// -----------------------------------------------------
// Primary   Deep Navy    #243B53
// Secondary Steel Blue   #486581
// Accent    Muted Green  #5B8C6A
// Background Warm Gray   #F5F7F8
// Surface   White        #FFFFFF
// Text      Charcoal     #202B33
// Muted     Gray         #6B7785
// Border    Light Gray   #D9E2EC
// Success   Green        #3F7D5A
// Warning   Ochre        #C58B2A
// Error     Brick Red    #B44A4A
//
// Headings: Manrope · Body/UI: Inter
// =====================================================

// =====================================================
// STYLES
// =====================================================

const levelStyles = {
  high: "bg-[#B44A4A]/10 text-[#B44A4A]",
  medium: "bg-[#C58B2A]/10 text-[#C58B2A]",
  low: "bg-[#3F7D5A]/10 text-[#3F7D5A]",
};

// =====================================================
// ATTENTION CARD
// =====================================================

function AttentionCard({ item, isLast }) {
  return (
    <div className={`px-6 py-5 ${!isLast ? "border-b border-[#D9E2EC]" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[15px] font-semibold text-[#202B33]">
          {item.name}
        </h3>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            levelStyles[item.level]
          }`}
        >
          {item.levelLabel}
        </span>
      </div>

      <p className="mt-1 text-sm text-[#486581]">{item.note}</p>

      <button
        type="button"
        className="
          mt-3
          rounded-md
          border
          border-[#D9E2EC]
          px-3
          py-1.5
          text-sm
          font-medium
          text-[#202B33]
          transition-all
          duration-300
          hover:-translate-y-[1px]
          hover:bg-[#F5F7F8]
          hover:shadow-sm
          active:translate-y-0
        "
      >
        {item.checkInLabel}
      </button>
    </div>
  );
}

// =====================================================
// SKILL GAP ROW
// =====================================================

function SkillGapRow({ item, isLast }) {
  return (
    <div className={`px-6 py-5 ${!isLast ? "border-b border-[#D9E2EC]" : ""}`}>
      <h3 className="text-[15px] font-semibold text-[#202B33]">{item.title}</h3>

      <p className="mt-1 text-sm text-[#6B7785]">
        {item.count} · {item.suggested} {item.suggestion}
      </p>
    </div>
  );
}

// =====================================================
// AI INSIGHTS PAGE
// =====================================================

export default function AIInsights() {
  const { t } = useTranslation();

  // ===================================================
  // DATA — TRANSLATED
  // ===================================================

  const attentionSignals = [
    {
      name: t("aiInsights.youssefLotfy"),
      note: t("aiInsights.youssefNote"),
      level: "high",
      levelLabel: t("aiInsights.highAttention"),
      checkInLabel: t("aiInsights.scheduleHrCheckIn"),
    },
    {
      name: t("aiInsights.karimAshraf"),
      note: t("aiInsights.karimNote"),
      level: "medium",
      levelLabel: t("aiInsights.mediumAttention"),
      checkInLabel: t("aiInsights.scheduleHrCheckIn"),
    },
    {
      name: t("aiInsights.nourAdel"),
      note: t("aiInsights.nourNote"),
      level: "low",
      levelLabel: t("aiInsights.lowAttention"),
      checkInLabel: t("aiInsights.scheduleHrCheckIn"),
    },
  ];

  const skillGaps = [
    {
      title: t("aiInsights.frontendArchitecture"),
      count: t("aiInsights.frontendArchitectureCount"),
      suggestion: t("aiInsights.frontendArchitectureSuggestion"),
    },
    {
      title: t("aiInsights.leadership"),
      count: t("aiInsights.leadershipCount"),
      suggestion: t("aiInsights.leadershipSuggestion"),
    },
    {
      title: t("aiInsights.dataLiteracy"),
      count: t("aiInsights.dataLiteracyCount"),
      suggestion: t("aiInsights.dataLiteracySuggestion"),
    },
  ];

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <div className="w-full min-w-0">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1
            className="
              font-['Manrope']
              text-2xl
              font-bold
              text-[#202B33]
            "
          >
            {t("aiInsights.title")}
          </h1>

          <p className="mt-1 text-sm text-[#6B7785]">
            {t("aiInsights.subtitle")}
          </p>
        </div>

        {/* REFRESH ANALYSIS BUTTON */}

        <button
          type="button"
          className="
            group
            flex
            items-center
            gap-2
            rounded-lg
            bg-[#243B53]
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            shadow-sm
            transition-all
            duration-300
            ease-out
            hover:-translate-y-[2px]
            hover:bg-[#1c2f43]
            hover:shadow-[0_8px_20px_rgba(36,59,83,0.20)]
            active:translate-y-0
            active:scale-[0.98]
          "
        >
          <Sparkles
            className="
              h-4
              w-4
              transition-all
              duration-500
              ease-out
              group-hover:rotate-12
              group-hover:scale-110
            "
          />

          <span
            className="
              transition-transform
              duration-300
              group-hover:translate-x-[1px]
            "
          >
            {t("aiInsights.refreshAnalysis")}
          </span>
        </button>
      </div>

      {/* =================================================
          GROUNDED AI BANNER
      ================================================= */}

      <div
        className="
          mb-6
          flex
          items-center
          gap-3
          rounded-lg
          border
          border-[#5B8C6A]/25
          bg-[#5B8C6A]/10
          px-5
          py-4
        "
      >
        <ShieldCheck
          className="
            h-5
            w-5
            shrink-0
            text-[#5B8C6A]
          "
        />

        <p className="text-sm text-[#202B33]/90">
          <span className="font-semibold text-[#202B33]">
            {t("aiInsights.groundedAiPanel")}
          </span>{" "}
          {t("aiInsights.groundedAiDescription")}
        </p>
      </div>

      {/* =================================================
          TWO COLUMN PANELS
      ================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* =================================================
            EMPLOYEE ATTENTION SIGNALS
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-[#D9E2EC]
            bg-white
          "
        >
          <div
            className="
              border-b
              border-[#D9E2EC]
              px-6
              py-4
            "
          >
            <h2
              className="
                font-['Manrope']
                text-[15px]
                font-semibold
                text-[#202B33]
              "
            >
              {t("aiInsights.employeeAttentionSignals")}
            </h2>
          </div>

          <div>
            {attentionSignals.map((item, index) => (
              <AttentionCard
                key={item.name}
                item={item}
                isLast={index === attentionSignals.length - 1}
              />
            ))}
          </div>
        </div>

        {/* =================================================
            WORKFORCE SKILL GAPS
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-[#D9E2EC]
            bg-white
          "
        >
          <div
            className="
              border-b
              border-[#D9E2EC]
              px-6
              py-4
            "
          >
            <h2
              className="
                font-['Manrope']
                text-[15px]
                font-semibold
                text-[#202B33]
              "
            >
              {t("aiInsights.workforceSkillGaps")}
            </h2>
          </div>

          <div>
            {skillGaps.map((item, index) => (
              <SkillGapRow
                key={item.title}
                item={item}
                isLast={index === skillGaps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
