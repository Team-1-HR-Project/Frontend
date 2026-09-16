import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
  FiSearch, 
  FiArrowUpRight, 
  FiChevronRight,
  FiFileText,
  FiDownload
} from "react-icons/fi";
import toast from "react-hot-toast";

const ActivityLog = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Initial audit log items from the design
  const auditLogs = useMemo(() => [
    {
      id: "log-1",
      actionEn: "Role permissions updated",
      actionAr: "تم تحديث صلاحيات الأدوار",
      actor: "Sarah Ahmed",
      timestampEn: "Today, 09:42",
      timestampAr: "اليوم، 09:42",
      severity: "Success",
    },
    {
      id: "log-2",
      actionEn: "GPS enforcement disabled for Alexandria",
      actionAr: "تم تعطيل تتبع GPS لفرع الإسكندرية",
      actor: "Mostafa Khalil",
      timestampEn: "Yesterday, 16:18",
      timestampAr: "أمس، 16:18",
      severity: "Warning",
    },
    {
      id: "log-3",
      actionEn: "Q3 2026 review cycle created",
      actionAr: "تم إنشاء دورة مراجعة الربع الثالث 2026",
      actor: "Sarah Ahmed",
      timestampEn: "Sep 12, 14:07",
      timestampAr: "12 سبتمبر، 14:07",
      severity: "Info",
    },
    {
      id: "log-4",
      actionEn: "New user account invited",
      actionAr: "تمت دعوة حساب مستخدم جديد",
      actor: "Omar Nabil",
      timestampEn: "Sep 11, 11:23",
      timestampAr: "11 سبتمبر، 11:23",
      severity: "Success",
    },
  ], []);

  // Filter logs based on search query and active severity filter
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesFilter = 
        activeFilter === "All" || log.severity.toLowerCase() === activeFilter.toLowerCase();
      
      const currentAction = isRtl ? log.actionAr : log.actionEn;
      const matchesSearch = 
        currentAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.timestampEn.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [auditLogs, activeFilter, searchQuery, isRtl]);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "Success":
        return {
          bg: "bg-[#ecfdf5]",
          text: "text-[#10b981]",
          dot: "bg-[#10b981]",
          label: t("auditLogs.filterSuccess", "Success"),
        };
      case "Warning":
        return {
          bg: "bg-[#fffbeb]",
          text: "text-[#d97706]",
          dot: "bg-[#d97706]",
          label: t("auditLogs.filterWarning", "Warning"),
        };
      case "Info":
      default:
        return {
          bg: "bg-[#f1f5f9]",
          text: "text-[#64748b]",
          dot: "bg-[#64748b]",
          label: t("auditLogs.filterInfo", "Info"),
        };
    }
  };

  const handleExport = () => {
    toast.success(t("auditLogs.exportSuccess", "Audit configuration exported successfully"));
  };

  const filterOptions = [
    { key: "All", labelKey: "auditLogs.filterAll", defaultLabel: "All" },
    { key: "Success", labelKey: "auditLogs.filterSuccess", defaultLabel: "Success" },
    { key: "Warning", labelKey: "auditLogs.filterWarning", defaultLabel: "Warning" },
    { key: "Info", labelKey: "auditLogs.filterInfo", defaultLabel: "Info" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#64748b]">
        <span>{t("auditLogs.breadcrumbAdmin", "Administration")}</span>
        <FiChevronRight className={`w-3.5 h-3.5 text-[#94a3b8] ${isRtl ? "rotate-180" : ""}`} />
        <span className="text-[#334e68] font-semibold">{t("auditLogs.breadcrumbApp", "WiseWork")}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-[#1e293b] tracking-tight">
            {t("auditLogs.title", "Audit Logs")}
          </h1>
          <p className="text-sm text-[#64748b] mt-1 font-normal">
            {t("auditLogs.subtitle", "Configure and manage your WiseWork audit logs.")}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-xs sm:text-sm font-semibold text-[#1e293b] hover:bg-[#f8fafc] hover:border-[#cbd5e1] shadow-2xs transition"
        >
          <FiArrowUpRight className="w-4 h-4 text-[#475569]" />
          <span>{t("auditLogs.exportConfig", "Export configuration")}</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-6">
        {/* Card Header & Subtitle */}
        <div>
          <h2 className="text-base md:text-lg font-bold text-[#1e293b]">
            {t("auditLogs.cardTitle", "Audit logs")}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] mt-0.5 font-normal">
            {t("auditLogs.cardSubtitle", "A searchable record of administrative actions and system events.")}
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <FiSearch className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]` } />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("auditLogs.searchPlaceholder", "Search audit logs...")}
              className={`w-full ${isRtl ? "pr-10 pl-4" : "pl-10 pr-4"} py-2 border border-[#e2e8f0] rounded-xl text-xs sm:text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#3f7d5a] focus:ring-1 focus:ring-[#3f7d5a]/20 transition bg-white`}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#243b53] text-white shadow-2xs"
                      : "bg-white border border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]"
                  }`}
                >
                  {t(filter.labelKey, filter.defaultLabel)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="border-b border-[#f1f5f9] text-[11px] font-bold text-[#94a3b8] tracking-wider uppercase">
                <th className="pb-3.5 px-2">{t("auditLogs.colAction", "ACTION")}</th>
                <th className="pb-3.5 px-4">{t("auditLogs.colActor", "ACTOR")}</th>
                <th className="pb-3.5 px-4">{t("auditLogs.colTimestamp", "TIMESTAMP")}</th>
                <th className="pb-3.5 px-2">{t("auditLogs.colSeverity", "SEVERITY")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const badge = getSeverityBadge(log.severity);
                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-[#f8fafc]/80 transition group"
                    >
                      {/* ACTION */}
                      <td className="py-4 px-2 text-sm font-semibold text-[#1e293b] group-hover:text-[#0f172a]">
                        {isRtl ? log.actionAr : log.actionEn}
                      </td>

                      {/* ACTOR */}
                      <td className="py-4 px-4 text-sm text-[#475569] font-normal">
                        {log.actor}
                      </td>

                      {/* TIMESTAMP */}
                      <td className="py-4 px-4 text-sm text-[#64748b] font-normal whitespace-nowrap">
                        {isRtl ? log.timestampAr : log.timestampEn}
                      </td>

                      {/* SEVERITY */}
                      <td className="py-4 px-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                          <span>{badge.label}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-xs text-[#94a3b8]">
                    <FiFileText className="w-8 h-8 mx-auto mb-2 text-[#cbd5e1]" />
                    <p>{t("auditLogs.noLogsFound", "No audit logs found matching your criteria")}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
