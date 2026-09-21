import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiCalendar,
  FiChevronDown,
  FiDownload,
  FiFileText,
  FiSearch,
  FiBarChart2,
  FiDollarSign,
  FiClipboard,
  FiCpu,
} from "react-icons/fi";

const Reports = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language?.startsWith("ar");

  const [fromMonth, setFromMonth] = useState("2026-09");
  const [toMonth, setToMonth] = useState("2026-09");
  const [department, setDepartment] = useState("all");
  const [branch, setBranch] = useState("all");

  const months = useMemo(
    () => [
      {
        value: "2026-09",
        label: t("reports.september2026"),
      },
      {
        value: "2026-08",
        label: t("reports.august2026"),
      },
      {
        value: "2026-07",
        label: t("reports.july2026"),
      },
      {
        value: "2026-06",
        label: t("reports.june2026"),
      },
    ],
    [t]
  );

  const departments = [
    {
      value: "all",
      label: t("reports.allDepartments"),
    },
    {
      value: "engineering",
      label: t("reports.engineering"),
    },
    {
      value: "sales",
      label: t("reports.sales"),
    },
  ];

  const branches = [
    {
      value: "all",
      label: t("reports.allBranches"),
    },
    {
      value: "cairo",
      label: t("reports.cairoHq"),
    },
    {
      value: "alexandria",
      label: t("reports.alexandriaHub"),
    },
  ];

  const reports = [
    {
      id: "attendance",
      formats: ["PDF", "CSV"],
      title: t("reports.attendance.title"),
      description: t("reports.attendance.description"),
      icon: FiBarChart2,
      iconWrapper: "bg-[#eef4ff] text-[#315b9b]",
    },
    {
      id: "payroll",
      formats: ["Excel", "PDF"],
      title: t("reports.payroll.title"),
      description: t("reports.payroll.description"),
      icon: FiDollarSign,
      iconWrapper: "bg-[#edf8f2] text-[#26845c]",
    },
    {
      id: "leave",
      formats: ["CSV"],
      title: t("reports.leave.title"),
      description: t("reports.leave.description"),
      icon: FiClipboard,
      iconWrapper: "bg-[#fff5e8] text-[#b66a13]",
    },
    {
      id: "skills",
      formats: ["PDF"],
      title: t("reports.skills.title"),
      description: t("reports.skills.description"),
      icon: FiCpu,
      iconWrapper: "bg-[#f3efff] text-[#7655b7]",
    },
  ];

  const handleExport = (report) => {
    // Placeholder for the real export API.
    // Later this can call the Laravel endpoint using:
    // fromMonth, toMonth, department, branch and report.id.
    console.log("Export report:", {
      report: report.id,
      fromMonth,
      toMonth,
      department,
      branch,
    });
  };

  return (
    <section
      className={`w-full ${isArabic ? "text-right" : "text-left"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Page Header */}
      <div className="mb-[28px]">
        <div className="flex items-start justify-between gap-5 max-[760px]:flex-col">
          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.5px] text-[#1c364f] max-[760px]:text-[24px]">
              {t("reports.title")}
            </h1>

            <p className="mt-[7px] text-[14px] leading-[22px] text-[#718096]">
              {t("reports.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Export Cockpit */}
      <div className="mb-[28px] rounded-[14px] border border-[#e4e9ee] bg-white p-[24px] shadow-[0_2px_8px_rgba(28,54,79,0.03)]">
        <div className="mb-[22px] flex items-center gap-[10px]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#edf3f8] text-[#1c587e]">
            <FiFileText size={18} />
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-[#1c364f]">
              {t("reports.exportCockpit")}
            </h2>

            <p className="mt-[2px] text-[12px] text-[#8793a0]">
              {t("reports.exportDescription")}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-[14px] max-[1050px]:grid-cols-2 max-[600px]:grid-cols-1">
          {/* From */}
          <div>
            <label className="mb-[7px] block text-[12px] font-semibold text-[#536273]">
              {t("reports.from")}
            </label>

            <div className="relative">
              <FiCalendar
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#8b98a7] ${
                  isArabic ? "right-[13px]" : "left-[13px]"
                }`}
                size={16}
              />

              <select
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                className={`h-[44px] w-full appearance-none rounded-[9px] border border-[#dce3e9] bg-white text-[13px] font-medium text-[#334155] outline-none transition focus:border-[#39749c] ${
                  isArabic
                    ? "pr-[38px] pl-[34px]"
                    : "pl-[38px] pr-[34px]"
                }`}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              <FiChevronDown
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#8b98a7] ${
                  isArabic ? "left-[12px]" : "right-[12px]"
                }`}
                size={15}
              />
            </div>
          </div>

          {/* To */}
          <div>
            <label className="mb-[7px] block text-[12px] font-semibold text-[#536273]">
              {t("reports.to")}
            </label>

            <div className="relative">
              <FiCalendar
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#8b98a7] ${
                  isArabic ? "right-[13px]" : "left-[13px]"
                }`}
                size={16}
              />

              <select
                value={toMonth}
                onChange={(e) => setToMonth(e.target.value)}
                className={`h-[44px] w-full appearance-none rounded-[9px] border border-[#dce3e9] bg-white text-[13px] font-medium text-[#334155] outline-none transition focus:border-[#39749c] ${
                  isArabic
                    ? "pr-[38px] pl-[34px]"
                    : "pl-[38px] pr-[34px]"
                }`}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              <FiChevronDown
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#8b98a7] ${
                  isArabic ? "left-[12px]" : "right-[12px]"
                }`}
                size={15}
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="mb-[7px] block text-[12px] font-semibold text-[#536273]">
              {t("reports.department")}
            </label>

            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`h-[44px] w-full appearance-none rounded-[9px] border border-[#dce3e9] bg-white text-[13px] font-medium text-[#334155] outline-none transition focus:border-[#39749c] ${
                  isArabic ? "pr-[13px] pl-[34px]" : "pl-[13px] pr-[34px]"
                }`}
              >
                {departments.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <FiChevronDown
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#8b98a7] ${
                  isArabic ? "left-[12px]" : "right-[12px]"
                }`}
                size={15}
              />
            </div>
          </div>

          {/* Branch */}
          <div>
            <label className="mb-[7px] block text-[12px] font-semibold text-[#536273]">
              {t("reports.branch")}
            </label>

            <div className="relative">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className={`h-[44px] w-full appearance-none rounded-[9px] border border-[#dce3e9] bg-white text-[13px] font-medium text-[#334155] outline-none transition focus:border-[#39749c] ${
                  isArabic ? "pr-[13px] pl-[34px]" : "pl-[13px] pr-[34px]"
                }`}
              >
                {branches.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <FiChevronDown
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[#8b98a7] ${
                  isArabic ? "left-[12px]" : "right-[12px]"
                }`}
                size={15}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div>
        <div className="mb-[14px] flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-[#1c364f]">
            {t("reports.availableReports")}
          </h2>

          <span className="text-[12px] text-[#8995a3]">
            {reports.length} {t("reports.reportCount")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-[16px] max-[900px]:grid-cols-1">
          {reports.map((report) => {
            const Icon = report.icon;

            return (
              <article
                key={report.id}
                className="group flex min-h-[190px] flex-col rounded-[14px] border border-[#e3e8ed] bg-white p-[21px] shadow-[0_2px_8px_rgba(28,54,79,0.025)] transition hover:-translate-y-[1px] hover:border-[#ced9e2] hover:shadow-[0_6px_18px_rgba(28,54,79,0.06)]"
              >
                <div className="flex items-start justify-between gap-[15px]">
                  <div
                    className={`flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-[11px] ${report.iconWrapper}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="flex flex-wrap justify-end gap-[6px]">
                    {report.formats.map((format) => (
                      <span
                        key={format}
                        className="rounded-[6px] bg-[#f3f6f8] px-[8px] py-[4px] text-[10px] font-bold uppercase tracking-[0.3px] text-[#647383]"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-[18px] flex-1">
                  <h3 className="text-[15px] font-bold leading-[21px] text-[#253b50]">
                    {report.title}
                  </h3>

                  <p className="mt-[7px] max-w-[540px] text-[12px] leading-[20px] text-[#7a8795]">
                    {report.description}
                  </p>
                </div>

                <div className="mt-[17px] border-t border-[#eef1f4] pt-[14px]">
                  <button
                    type="button"
                    onClick={() => handleExport(report)}
                    className="inline-flex h-[36px] items-center gap-[8px] rounded-[8px] border border-[#d6e0e7] bg-white px-[13px] text-[12px] font-semibold text-[#315d79] transition hover:border-[#b8cbd8] hover:bg-[#f7fafb] active:scale-[0.98]"
                  >
                    <FiDownload size={14} />
                    {t("reports.exportReport")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reports;