import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";

const POLICY_CARDS = [
    {
        id: "handbook",
        titleKey: "companyPolicies.handbookTitle",
        titleDefault: "Employee Handbook",
        descKey: "companyPolicies.handbookDesc",
        descDefault: "The essentials for your WiseWork journey.",
    },
    {
        id: "leaveAttendance",
        titleKey: "companyPolicies.leaveAttendanceTitle",
        titleDefault: "Leave & attendance",
        descKey: "companyPolicies.leaveAttendanceDesc",
        descDefault: "Time off, working hours, and attendance guidance.",
    },
    {
        id: "benefits",
        titleKey: "companyPolicies.benefitsTitle",
        titleDefault: "Benefits & wellbeing",
        descKey: "companyPolicies.benefitsDesc",
        descDefault: "Explore the benefits available to you.",
    },
    {
        id: "security",
        titleKey: "companyPolicies.securityTitle",
        titleDefault: "Security & privacy",
        descKey: "companyPolicies.securityDesc",
        descDefault: "Keep our people and information safe.",
    },
];

const CompanyPolicies = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleAskAboutPolicy = (card) => {
        navigate("/employee/ai-assistant", {
            state: {
                openPolicyAssistant: true,
                policyTitleKey: card.titleKey,
                policyDefaultTitle: card.titleDefault,
            },
        });
    };

    return (
        <div className="w-full space-y-6">
            {/* Page Header */}
            <div>
                <p className="text-xs font-bold tracking-wider text-[#3f7d5a] uppercase mb-1">
                    {t("companyPolicies.eyebrow", "Resources")}
                </p>
                <h1 className="text-2xl md:text-[28px] font-bold text-[#1e293b] tracking-tight">
                    {t("companyPolicies.title", "Company policies")}
                </h1>
                <p className="text-sm text-[#64748b] mt-1 font-normal">
                    {t(
                        "companyPolicies.subtitle",
                        "Everything you need to work with confidence.",
                    )}
                </p>
            </div>

            {/* Policy Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {POLICY_CARDS.map((card) => (
                    <div
                        key={card.id}
                        className="flex items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-[#e2e8f0]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4f0] text-[#3f7d5a]">
                                <FiBookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1e293b]">
                                    {t(card.titleKey, card.titleDefault)}
                                </h3>
                                <p className="text-xs text-[#64748b] mt-0.5">
                                    {t(card.descKey, card.descDefault)}
                                </p>
                            </div>
                        </div>
                                                <button
                            type="button"
                            onClick={() => handleAskAboutPolicy(card)}
                            aria-label={t("companyPolicies.askAboutPolicy", "Ask about this policy")}
                            className="shrink-0 text-[#94a3b8] hover:text-[#3f7d5a] transition-colors cursor-pointer"
                        >
                            <FiArrowRight className="w-4 h-4 rtl:rotate-180" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyPolicies;