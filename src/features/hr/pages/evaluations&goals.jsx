import { useState } from "react";
import {
  FiPlus,
  FiX,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const EvaluationsGoals = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const departments = [
    {
      departmentKey: "engineering",
      managerKey: "mariamHassan",
      completed: 18,
      total: 24,
      overdue: 2,
    },
    {
      departmentKey: "peopleCulture",
      managerKey: "sarahAhmed",
      completed: 11,
      total: 14,
      overdue: 0,
    },
    {
      departmentKey: "sales",
      managerKey: "omarKhaled",
      completed: 15,
      total: 22,
      overdue: 4,
    },
    {
      departmentKey: "logistics",
      managerKey: "karimAshraf",
      completed: 13,
      total: 18,
      overdue: 1,
    },
  ];

  const handleSendReminder = (managerName) => {
    toast.success(
      t("hrEvaluationsGoals.reminderSent", {
        manager: managerName,
      }),
    );
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full min-w-0 text-[#243b53]"
    >
      <div className="w-full min-w-0">
        {/* Header */}
        <div className="mb-[26px] flex items-start justify-between">
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <p className="mb-[7px] text-[11px] font-semibold uppercase tracking-[1.4px] text-[#6b7785]">
              {t("hrEvaluationsGoals.eyebrow")}
            </p>

            <h1 className="text-[26px] font-semibold tracking-[-0.4px] text-[#243b53]">
              {t("hrEvaluationsGoals.title")}
            </h1>

            <p className="mt-[7px] text-[14px] text-[#6b7785]">
              {t("hrEvaluationsGoals.subtitle")}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-[46px] items-center gap-[8px] rounded-[7px] bg-[#243b53] px-[18px] text-[13px] font-medium text-white transition-all duration-200 hover:bg-[#486581] hover:-translate-y-[1px]"
          >
            <FiPlus size={17} />
            {t("hrEvaluationsGoals.launchReviewCycle")}
          </button>
        </div>

        {/* Active Review Cycle */}
        <div className="mb-[22px] animate-[fadeInUp_0.45s_ease-out] rounded-[11px] border border-[#d9e2ec] bg-white p-[22px]">
          <div className="mb-[20px] flex items-start justify-between">
            <div>
              <div className="mb-[7px] flex items-center gap-[7px]">
                <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#3f7d5a]" />

                <span className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#3f7d5a]">
                  {t("hrEvaluationsGoals.activeCycle")}
                </span>
              </div>

              <h2 className="text-[17px] font-semibold text-[#243b53]">
                {t("hrEvaluationsGoals.activeCycleTitle")}
              </h2>

              <p className="mt-[5px] text-[13px] text-[#6b7785]">
                {t("hrEvaluationsGoals.activeCycleDate")}
              </p>
            </div>

            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-[#f5f7f8] text-[#486581] transition-transform duration-300 hover:scale-105">
              <FiTrendingUp size={19} />
            </div>
          </div>

          {/* Progress */}
          <div className="mb-[20px]">
            <div className="mb-[8px] flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#6b7785]">
                {t("hrEvaluationsGoals.completion")}
              </span>

              <span
                className={`text-[13px] font-semibold text-[#243b53] ${
                  isArabic ? "text-left" : "text-right"
                }`}
              >
                68%
              </span>
            </div>

            <div className="h-[8px] overflow-hidden rounded-full bg-[#d9e2ec]">
              <div className="h-full w-[68%] origin-left animate-[progress_1s_ease-out] rounded-full bg-[#3f7d5a]" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-[14px]">
            <div className="rounded-[8px] border border-[#d9e2ec] bg-[#f5f7f8] p-[14px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-sm">
              <div className="mb-[8px] flex items-center gap-[8px] text-[#3f7d5a]">
                <FiCheckCircle size={16} />

                <span className="text-[12px] font-medium">
                  {t("hrEvaluationsGoals.completed")}
                </span>
              </div>

              <p className="text-[13px] font-semibold text-[#243b53]">57</p>
            </div>

            <div className="rounded-[8px] border border-[#d9e2ec] bg-[#f5f7f8] p-[14px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-sm">
              <div className="mb-[8px] flex items-center gap-[8px] text-[#c58b2a]">
                <FiClock size={16} />

                <span className="text-[12px] font-medium">
                  {t("hrEvaluationsGoals.pending")}
                </span>
              </div>

              <p className="text-[13px] font-semibold text-[#243b53]">26</p>
            </div>

            <div className="rounded-[8px] border border-[#d9e2ec] bg-[#f5f7f8] p-[14px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-sm">
              <div className="mb-[8px] flex items-center gap-[8px] text-[#486581]">
                <FiUsers size={16} />

                <span className="text-[12px] font-medium">
                  {t("hrEvaluationsGoals.employees")}
                </span>
              </div>

              <p className="text-[13px] font-semibold text-[#243b53]">4</p>
            </div>
          </div>
        </div>

        {/* Department Manager Review Completion */}
        <div className="animate-[fadeInUp_0.55s_ease-out] rounded-[11px] border border-[#d9e2ec] bg-white p-[22px]">
          <div className="mb-[20px]">
            <h2 className="text-[15px] font-bold text-[#243b53]">
              {t("hrEvaluationsGoals.departmentManagerReviewCompletion")}
            </h2>

            <p className="mt-[5px] text-[13px] text-[#6b7785]">
              {t("hrEvaluationsGoals.departmentManagerReviewSubtitle")}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#d9e2ec]">
                  <th
                    className={`pb-[12px] text-[11px] font-semibold uppercase tracking-[0.7px] text-[#6b7785] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t("hrEvaluationsGoals.department")}
                  </th>

                  <th
                    className={`pb-[12px] text-[11px] font-semibold uppercase tracking-[0.7px] text-[#6b7785] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t("hrEvaluationsGoals.manager")}
                  </th>

                  <th className="pb-[12px] text-center text-[11px] font-semibold uppercase tracking-[0.7px] text-[#6b7785]">
                    {t("hrEvaluationsGoals.progress")}
                  </th>

                  <th className="pb-[12px] text-center text-[11px] font-semibold uppercase tracking-[0.7px] text-[#6b7785]">
                    {t("hrEvaluationsGoals.status")}
                  </th>

                  <th
                    className={`pb-[12px] text-[11px] font-semibold uppercase tracking-[0.7px] text-[#6b7785] ${
                      isArabic ? "text-left" : "text-right"
                    }`}
                  >
                    {t("hrEvaluationsGoals.sendReminder")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {departments.map((item, index) => {
                  const completion = Math.round(
                    (item.completed / item.total) * 100,
                  );

                  const departmentName = t(
                    `hrEvaluationsGoals.${item.departmentKey}`,
                  );

                  const managerName = t(
                    `hrEvaluationsGoals.${item.managerKey}`,
                  );

                  return (
                    <tr
                      key={item.departmentKey}
                      className="border-b border-[#d9e2ec] last:border-b-0 animate-[fadeInUp_0.4s_ease-out]"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        animationFillMode: "both",
                      }}
                    >
                      <td
                        className={`py-[16px] text-[13px] font-medium text-[#243b53] ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        {departmentName}
                      </td>

                      <td
                        className={`py-[16px] text-[13px] text-[#6b7785] ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        {managerName}
                      </td>

                      <td className="py-[16px] text-center">
                        <span className="text-[13px] font-semibold text-[#243b53]">
                          {completion}%
                        </span>
                      </td>

                      <td className="py-[16px] text-center">
                        {item.overdue > 0 ? (
                          <span className="inline-flex items-center justify-center gap-[6px] text-[12px] font-semibold text-[#b44a4a]">
                            <span className="h-[7px] w-[7px] rounded-full bg-[#b44a4a]" />
                            {item.overdue} {t("hrEvaluationsGoals.overdue")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-[6px] text-[12px] font-semibold text-[#3f7d5a]">
                            <span className="h-[7px] w-[7px] rounded-full bg-[#3f7d5a]" />
                            {t("hrEvaluationsGoals.onTrack")}
                          </span>
                        )}
                      </td>

                      <td
                        className={`py-[16px] ${
                          isArabic ? "text-left" : "text-right"
                        }`}
                      >
                        <button
                          onClick={() => handleSendReminder(managerName)}
                          className="rounded-[6px] border border-[#d9e2ec] px-[11px] py-[7px] text-[11px] font-medium text-[#486581] transition-all duration-200 hover:border-[#486581] hover:bg-[#f5f7f8] hover:text-[#243b53]"
                        >
                          {t("hrEvaluationsGoals.sendReminder")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#243b53]/30 px-[20px]">
          <div className="w-full max-w-[500px] animate-[scaleIn_0.2s_ease-out] rounded-[11px] border border-[#d9e2ec] bg-white p-[24px] shadow-lg">
            <div className="mb-[22px] flex items-start justify-between">
              <div>
                <h2 className="text-[17px] font-semibold text-[#243b53]">
                  {t("hrEvaluationsGoals.createWorkflowRecord")}
                </h2>

                <p className="mt-[5px] text-[13px] text-[#6b7785]">
                  {t("hrEvaluationsGoals.departmentManagerReviewSubtitle")}
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="flex h-[32px] w-[32px] items-center justify-center rounded-[6px] text-[#6b7785] transition hover:bg-[#f5f7f8] hover:text-[#243b53]"
              >
                <FiX size={17} />
              </button>
            </div>

            <div className="space-y-[16px]">
              <div>
                <label className="mb-[7px] block text-[12px] font-medium text-[#243b53]">
                  {t("hrEvaluationsGoals.details")}
                </label>

                <input
                  type="text"
                  className="h-[44px] w-full rounded-[7px] border border-[#d9e2ec] px-[12px] text-[13px] text-[#243b53] outline-none transition placeholder:text-[#9aa5b1] focus:border-[#486581]"
                />
              </div>

              <div>
                <label className="mb-[7px] block text-[12px] font-medium text-[#243b53]">
                  {t("hrEvaluationsGoals.owner")}
                </label>

                <input
                  type="text"
                  className="h-[44px] w-full rounded-[7px] border border-[#d9e2ec] px-[12px] text-[13px] text-[#243b53] outline-none transition placeholder:text-[#9aa5b1] focus:border-[#486581]"
                />
              </div>
            </div>

            <div className="mt-[24px] flex justify-end gap-[10px]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[42px] rounded-[7px] border border-[#d9e2ec] px-[16px] text-[12px] font-medium text-[#6b7785] transition hover:bg-[#f5f7f8]"
              >
                {t("hrEvaluationsGoals.cancel")}
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  toast.success(t("hrEvaluationsGoals.saveChanges"));
                }}
                className="h-[42px] rounded-[7px] bg-[#243b53] px-[16px] text-[12px] font-medium text-white transition hover:bg-[#486581]"
              >
                {t("hrEvaluationsGoals.saveChanges")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes progress {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.96);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default EvaluationsGoals;
