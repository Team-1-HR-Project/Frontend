import { useTranslation } from "react-i18next";

import {
  FiAlertTriangle,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiInfo,
  FiUsers,
} from "react-icons/fi";

import { LuSparkles } from "react-icons/lu";

const PerformanceMetrics = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const attentionSignals = [
    {
      name: t("hrCommandCenter.youssefLotfy"),
      description: t("hrCommandCenter.youssefDescription"),
      level: "high",
    },
    {
      name: t("hrCommandCenter.karimAshraf"),
      description: t("hrCommandCenter.karimDescription"),
      level: "medium",
    },
    {
      name: t("hrCommandCenter.alexandriaHub"),
      description: t("hrCommandCenter.alexandriaDescription"),
      level: "low",
    },
  ];

  const readinessItems = [
    {
      label: t("hrCommandCenter.attendanceVerification"),
      value: 90,
      type: "green",
    },
    {
      label: t("hrCommandCenter.leaveApprovals"),
      value: 76,
      type: "orange",
    },
    {
      label: t("hrCommandCenter.q3Evaluations"),
      value: 68,
      type: "blue",
    },
    {
      label: t("hrCommandCenter.payrollReconciliation"),
      value: 94,
      type: "green",
    },
  ];

  const getLevelStyles = (level) => {
    switch (level) {
      case "high":
        return {
          dot: "bg-red-500",
          badge: "border-red-200 bg-red-50 text-red-600",
        };

      case "medium":
        return {
          dot: "bg-amber-500",
          badge: "border-amber-200 bg-amber-50 text-amber-600",
        };

      default:
        return {
          dot: "bg-emerald-500",
          badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
        };
    }
  };

  const getProgressColor = (type) => {
    switch (type) {
      case "orange":
        return "bg-[#c58a2b]";

      case "blue":
        return "bg-[#486581]";

      default:
        return "bg-[#5B8C6A]";
    }
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f5f7f8] text-[#243b53]"
    >
      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="px-5 py-6 lg:px-8">
        <div className="mx-auto max-w-[1220px]">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              {/* Breadcrumb */}
              <div className="mb-2 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#6b7785]">
                <span>{t("hrCommandCenter.title")}</span>
              </div>

              {/* Title */}
              <h1 className="text-[30px] font-medium leading-tight tracking-[-0.02em] text-[#243b53]">
                {t("hrCommandCenter.title")}
              </h1>

              {/* Subtitle */}
              <p className="mt-2 max-w-[680px] text-[14px] leading-6 text-[#6b7785]">
                {t("hrCommandCenter.subtitle")}
              </p>
            </div>

            {/* Explain Today */}
            <button
              type="button"
              className="
    group flex h-[46px] items-center justify-center gap-2
    rounded-[7px]
    bg-[#243b53]
    px-5
    text-[13px] font-semibold text-white
    shadow-sm
    transition-all duration-300 ease-out
    hover:-translate-y-[2px]
    hover:bg-[#1f4d48]
    hover:shadow-[0_8px_20px_rgba(36,59,83,0.20)]
    active:translate-y-0
    active:scale-[0.98]
  "
            >
              <LuSparkles
                size={17}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              />

              <span className="transition-transform duration-300 group-hover:translate-x-[1px]">
                {t("hrCommandCenter.explainToday")}
              </span>
            </button>
          </div>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Employees */}
            <div className="min-h-[152px] rounded-[10px] border border-[#d9e2ec] bg-white p-5 shadow-[0_1px_2px_rgba(36,59,83,0.03)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7785]">
                  {t("hrCommandCenter.totalEmployees")}
                </p>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f7f8] text-[#486581]">
                  <FiUsers size={16} />
                </div>
              </div>

              <div className="text-[26px] font-semibold leading-none text-[#243b53]">
                142
              </div>

              <div className="mt-5 flex items-center gap-1 text-[11px] text-[#486581]">
                <span>+6%</span>
                <span>{t("hrCommandCenter.monthOverMonth")}</span>
              </div>
            </div>

            {/* Present Today */}
            <div className="min-h-[152px] rounded-[10px] border border-[#d9e2ec] bg-white p-5 shadow-[0_1px_2px_rgba(36,59,83,0.03)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7785]">
                  {t("hrCommandCenter.presentToday")}
                </p>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f7f8] text-[#5B8C6A]">
                  <FiCheckCircle size={16} />
                </div>
              </div>

              <div className="text-[26px] font-semibold leading-none text-[#243b53]">
                128
              </div>

              <div className="mt-5 text-[11px] text-[#486581]">
                90.1% {t("hrCommandCenter.workforcePresent")}
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="min-h-[152px] rounded-[10px] border border-[#d9e2ec] bg-white p-5 shadow-[0_1px_2px_rgba(36,59,83,0.03)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7785]">
                  {t("hrCommandCenter.pendingReviews")}
                </p>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f7f8] text-[#486581]">
                  <FiClock size={16} />
                </div>
              </div>

              <div className="text-[26px] font-semibold leading-none text-[#243b53]">
                7
              </div>

              <div className="mt-5 flex items-center gap-1 text-[11px] text-[#486581]">
                <span>4 {t("hrCommandCenter.leaves")}</span>
                <span>·</span>
                <span>3 {t("hrCommandCenter.advances")}</span>
              </div>
            </div>

            {/* Projected Payroll */}
            <div className="min-h-[152px] rounded-[10px] border border-[#d9e2ec] bg-white p-5 shadow-[0_1px_2px_rgba(36,59,83,0.03)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7785]">
                  {t("hrCommandCenter.projectedPayroll")}
                </p>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f7f8] text-[#486581]">
                  <FiDollarSign size={16} />
                </div>
              </div>

              <div className="text-[26px] font-semibold leading-none text-[#243b53]">
                $184,500
              </div>

              <div className="mt-5 text-[11px] text-[#486581]">
                {t("hrCommandCenter.septemberExecution")}
              </div>
            </div>
          </div>

          {/* =================================================
              LOWER SECTION
          ================================================= */}

          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]">
            {/* =================================================
                EMPLOYEE ATTENTION SIGNALS
            ================================================= */}

            <section className="overflow-hidden rounded-[10px] border border-[#d9e2ec] bg-white">
              {/* Card Header */}
              <div className="flex min-h-[59px] items-center justify-between border-b border-[#e6edf2] px-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-semibold text-[#243b53]">
                    {t("hrCommandCenter.employeeAttentionSignals")}
                  </h2>

                  <span className="rounded-full border border-[#cde5d5] bg-[#f1f8f3] px-2 py-1 text-[9px] font-medium text-[#5B8C6A]">
                    {t("hrCommandCenter.groundedMetrics")}
                  </span>
                </div>

                <FiInfo size={16} className="text-[#6b7785]" />
              </div>

              {/* Signals */}
              <div>
                {attentionSignals.map((item, index) => {
                  const styles = getLevelStyles(item.level);

                  return (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex min-h-[76px] items-center gap-4 border-b border-[#e6edf2] px-5 last:border-b-0"
                    >
                      {/* Alert Icon */}
                      <div className="flex w-5 shrink-0 justify-center">
                        <FiAlertTriangle size={16} className="text-[#a7b6c5]" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="text-[13px] font-semibold text-[#243b53]">
                            {item.name}
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium ${styles.badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                            />

                            {t(`hrCommandCenter.${item.level}`)}
                          </span>
                        </div>

                        <p className="text-[11px] leading-5 text-[#6b7785]">
                          {item.description}
                        </p>
                      </div>

                      {/* Review Button */}
                      <button
                        type="button"
                        className="flex shrink-0 items-center gap-1.5 rounded-[7px] border border-[#d9e2ec] bg-white px-3 py-2 text-[11px] font-medium text-[#486581] transition hover:border-[#a9b8c7] hover:bg-[#f8fafb]"
                      >
                        {t("hrCommandCenter.review")}

                        <FiArrowUpRight size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                OPERATIONAL READINESS
            ================================================= */}

            <section className="overflow-hidden rounded-[10px] border border-[#d9e2ec] bg-white">
              {/* Header */}
              <div className="flex min-h-[59px] items-center justify-between border-b border-[#e6edf2] px-5">
                <h2 className="text-[15px] font-semibold text-[#243b53]">
                  {t("hrCommandCenter.operationalReadiness")}
                </h2>

                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#d9e2ec] text-[#486581]">
                  <FiInfo size={13} />
                </div>
              </div>

              {/* Progress Items */}
              <div className="space-y-5 px-5 py-5">
                {readinessItems.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-medium text-[#486581]">
                        {item.label}
                      </span>

                      <span className="text-[11px] font-medium text-[#486581]">
                        {item.value}%
                      </span>
                    </div>

                    <div className="h-[7px] overflow-hidden rounded-full bg-[#e5ebf0]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                          item.type,
                        )}`}
                        style={{
                          width: `${item.value}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerformanceMetrics;
