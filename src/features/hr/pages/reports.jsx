import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiChevronDown,
  FiDownload,
  FiFileText,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const Reports = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language?.startsWith("ar");

  const [selectedMonth, setSelectedMonth] = useState("2026-09");
  const [department, setDepartment] = useState("all");
  const [branch, setBranch] = useState("all");

  const [toast, setToast] = useState(null);

  // ==================== Date Range ====================

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
    [t],
  );

  // ==================== Departments ====================

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

  // ==================== Branches ====================

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

  // ==================== Reports ====================

  const reports = [
    {
      id: "attendance",
      formats: ["PDF", "CSV"],
      title: t("reports.attendance.title"),
      description: t("reports.attendance.description"),
    },
    {
      id: "payroll",
      formats: ["Excel", "PDF"],
      title: t("reports.payroll.title"),
      description: t("reports.payroll.description"),
    },
    {
      id: "leave",
      formats: ["CSV"],
      title: t("reports.leave.title"),
      description: t("reports.leave.description"),
    },
    {
      id: "skills",
      formats: ["PDF"],
      title: t("reports.skills.title"),
      description: t("reports.skills.description"),
    },
  ];

  // =====================================================
  // Get Selected Filters
  // =====================================================

  const getSelectedMonthLabel = () => {
    const selected = months.find((month) => month.value === selectedMonth);

    return selected?.label || selectedMonth;
  };

  const getSelectedDepartmentLabel = () => {
    const selected = departments.find((item) => item.value === department);

    return selected?.label || department;
  };

  const getSelectedBranchLabel = () => {
    const selected = branches.find((item) => item.value === branch);

    return selected?.label || branch;
  };

  // =====================================================
  // Toast
  // =====================================================

  const showSuccessToast = (report) => {
    setToast({
      type: "success",
      message: isArabic
        ? `تم تصدير "${report.title}" بنجاح`
        : `"${report.title}" exported successfully`,
    });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // =====================================================
  // CSV Export
  // =====================================================

  const exportCSV = (report) => {
    const rows = [
      ["Report", report.title],
      ["Description", report.description],
      ["Date Range", getSelectedMonthLabel()],
      ["Department", getSelectedDepartmentLabel()],
      ["Branch", getSelectedBranchLabel()],
      ["Status", "Exported successfully"],
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => {
            const safeValue = String(value ?? "").replace(/"/g, '""');

            return `"${safeValue}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.id}-report.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // Excel Export
  // =====================================================

  const exportExcel = (report) => {
    const data = [
      {
        Report: report.title,
        Description: report.description,
        "Date Range": getSelectedMonthLabel(),
        Department: getSelectedDepartmentLabel(),
        Branch: getSelectedBranchLabel(),
        Status: "Exported successfully",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
      { wch: 35 },
      { wch: 65 },
      { wch: 30 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, `${report.id}-report.xlsx`);
  };

  // =====================================================
  // PDF Export
  // =====================================================

  const exportPDF = (report) => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(28, 54, 79);

    doc.text(report.title, 20, 25);

    // Description
    doc.setFontSize(11);
    doc.setTextColor(90, 110, 130);

    const descriptionLines = doc.splitTextToSize(
      report.description,
      pageWidth - 40,
    );

    doc.text(descriptionLines, 20, 38);

    // Divider
    doc.setDrawColor(220, 229, 236);

    doc.line(20, 55, pageWidth - 20, 55);

    // Report information
    doc.setFontSize(11);
    doc.setTextColor(28, 54, 79);

    doc.text("Report Information", 20, 72);

    doc.setFontSize(10);
    doc.setTextColor(80, 95, 110);

    doc.text(`Date Range: ${getSelectedMonthLabel()}`, 20, 87);

    doc.text(`Department: ${getSelectedDepartmentLabel()}`, 20, 101);

    doc.text(`Branch: ${getSelectedBranchLabel()}`, 20, 115);

    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 129);

    // Status
    doc.setFontSize(11);
    doc.setTextColor(38, 132, 92);

    doc.text("Status: Exported successfully", 20, 150);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(130, 145, 160);

    doc.text("Workforce Reports", 20, 280);

    doc.text("Generated by Smart HR", pageWidth - 20, 280, {
      align: "right",
    });

    doc.save(`${report.id}-report.pdf`);
  };

  // =====================================================
  // Export Report
  // =====================================================

  const handleExport = (report) => {
    try {
      // Export every format listed on the card.
      report.formats.forEach((format) => {
        if (format === "CSV") {
          exportCSV(report);
        }

        if (format === "Excel") {
          exportExcel(report);
        }

        if (format === "PDF") {
          exportPDF(report);
        }
      });

      showSuccessToast(report);
    } catch (error) {
      console.error("Report export failed:", error);

      setToast({
        type: "error",
        message: isArabic
          ? "حدث خطأ أثناء تصدير التقرير"
          : "Something went wrong while exporting the report",
      });

      setTimeout(() => {
        setToast(null);
      }, 3500);
    }
  };

  // =====================================================
  // Render
  // =====================================================

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`w-full min-w-0 ${isArabic ? "text-right" : "text-left"}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* ===================================================== */}
        {/* PAGE HEADER */}
        {/* ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="mb-[28px]"
        >
          <h1 className="text-[28px] font-bold leading-[34px] tracking-[-0.5px] text-[#1c364f] max-[760px]:text-[24px]">
            {t("reports.title")}
          </h1>

          <p className="mt-[6px] text-[14px] leading-[22px] text-[#6f8ca8]">
            {t("reports.subtitle")}
          </p>
        </motion.div>

        {/* ===================================================== */}
        {/* EXPORT COCKPIT */}
        {/* ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.05,
          }}
          className="mb-[28px] rounded-[14px] border border-[#dbe5ed] bg-white px-[22px] py-[20px] shadow-[0_1px_3px_rgba(28,54,79,0.02)]"
        >
          {/* Cockpit Header */}

          <div className="mb-[20px] flex items-center gap-[10px]">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#edf3f8] text-[#315d79]">
              <FiFileText size={18} strokeWidth={2} />
            </div>

            <h2 className="text-[17px] font-bold leading-[21px] text-[#1c364f]">
              {t("reports.exportCockpit")}
            </h2>
          </div>

          {/* ================================================= */}
          {/* FILTERS */}
          {/* ================================================= */}

          <div className="grid grid-cols-3 gap-[13px] max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {/* ================= DATE RANGE ================= */}

            <div>
              <label className="mb-[7px] block text-[12px] font-semibold leading-[16px] text-[#536273]">
                {t("reports.dateRange")}
              </label>

              <div className="relative h-[42px]">
                {/* Calendar Icon */}

                <div
                  className={`pointer-events-none absolute top-0 z-[10] flex h-[42px] w-[42px] items-center justify-center text-[#7290aa] ${
                    isArabic ? "right-0" : "left-0"
                  }`}
                >
                  <FiCalendar size={15} strokeWidth={2} />
                </div>

                {/* Select */}

                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className={`h-[42px] w-full appearance-none rounded-[9px] border border-[#d8e2ea] bg-white text-[13px] font-medium text-[#6283a2] outline-none transition focus:border-[#39749c] ${
                    isArabic ? "pr-[42px] pl-[35px]" : "pl-[42px] pr-[35px]"
                  }`}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>

                {/* Chevron */}

                <div
                  className={`pointer-events-none absolute top-0 z-[10] flex h-[42px] w-[36px] items-center justify-center text-[#64809a] ${
                    isArabic ? "left-0" : "right-0"
                  }`}
                >
                  <FiChevronDown size={15} strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* ================= DEPARTMENT ================= */}

            <div>
              <label className="mb-[7px] block text-[12px] font-semibold leading-[16px] text-[#536273]">
                {t("reports.department")}
              </label>

              <div className="relative h-[42px]">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={`h-[42px] w-full appearance-none rounded-[9px] border border-[#d8e2ea] bg-white text-[13px] font-medium text-[#6283a2] outline-none transition focus:border-[#39749c] ${
                    isArabic ? "pr-[13px] pl-[35px]" : "pl-[13px] pr-[35px]"
                  }`}
                >
                  {departments.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <div
                  className={`pointer-events-none absolute top-0 z-[10] flex h-[42px] w-[36px] items-center justify-center text-[#64809a] ${
                    isArabic ? "left-0" : "right-0"
                  }`}
                >
                  <FiChevronDown size={15} strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* ================= BRANCH ================= */}

            <div>
              <label className="mb-[7px] block text-[12px] font-semibold leading-[16px] text-[#536273]">
                {t("reports.branch")}
              </label>

              <div className="relative h-[42px]">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className={`h-[42px] w-full appearance-none rounded-[9px] border border-[#d8e2ea] bg-white text-[13px] font-medium text-[#6283a2] outline-none transition focus:border-[#39749c] ${
                    isArabic ? "pr-[13px] pl-[35px]" : "pl-[13px] pr-[35px]"
                  }`}
                >
                  {branches.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <div
                  className={`pointer-events-none absolute top-0 z-[10] flex h-[42px] w-[36px] items-center justify-center text-[#64809a] ${
                    isArabic ? "left-0" : "right-0"
                  }`}
                >
                  <FiChevronDown size={15} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================== */}
        {/* REPORT CARDS */}
        {/* ===================================================== */}

        <div className="grid grid-cols-2 gap-[16px] max-[900px]:grid-cols-1">
          {reports.map((report, index) => (
            <motion.article
              key={report.id}
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                delay: 0.12 + index * 0.07,
              }}
              whileHover={{
                y: -1,
              }}
              className="flex min-h-[194px] flex-col rounded-[14px] border border-[#dce5ec] bg-white px-[21px] py-[21px] shadow-[0_1px_4px_rgba(28,54,79,0.018)]"
            >
              {/* CARD TOP */}

              <div className="flex items-start justify-between gap-[12px]">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#edf4f8] text-[#47718f]">
                  <FiFileText size={18} strokeWidth={2} />
                </div>

                <div className="flex items-center gap-[5px]">
                  {report.formats.map((format) => (
                    <span
                      key={format}
                      className="rounded-full bg-[#eaf2f7] px-[10px] py-[5px] text-[10px] font-bold leading-[12px] text-[#315d79]"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              {/* CARD CONTENT */}

              <div className="mt-[19px] flex-1">
                <h3 className="text-[16px] font-bold leading-[21px] text-[#1d3b58]">
                  {report.title}
                </h3>

                <p className="mt-[7px] max-w-[570px] text-[12px] leading-[20px] text-[#6685a2]">
                  {report.description}
                </p>
              </div>

              {/* CARD BUTTON */}

              <div className="mt-[14px]">
                <motion.button
                  type="button"
                  onClick={() => handleExport(report)}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="inline-flex h-[36px] items-center gap-[7px] rounded-[8px] border border-[#d6e1e8] bg-white px-[12px] text-[12px] font-semibold text-[#315d79] transition-all duration-200 hover:border-[#bfd0dc] hover:bg-[#f8fafb]"
                >
                  <FiDownload size={14} />

                  {t("reports.exportReport")}
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* ===================================================== */}
      {/* SUCCESS / ERROR TOAST */}
      {/* ===================================================== */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
            className={`fixed bottom-[28px] z-[9999] flex min-h-[52px] max-w-[380px] items-center gap-[10px] rounded-[10px] border bg-white px-[15px] py-[11px] shadow-[0_8px_30px_rgba(28,54,79,0.12)] ${
              isArabic ? "left-[28px]" : "right-[28px]"
            } ${
              toast.type === "success" ? "border-[#cfe8dc]" : "border-[#f0d2d2]"
            }`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div
              className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${
                toast.type === "success"
                  ? "bg-[#e9f7ef] text-[#26845c]"
                  : "bg-[#fff0f0] text-[#c94b4b]"
              }`}
            >
              {toast.type === "success" ? (
                <FiCheckCircle size={17} strokeWidth={2} />
              ) : (
                <FiX size={17} strokeWidth={2} />
              )}
            </div>

            <span
              className={`flex-1 text-[12px] font-semibold leading-[18px] ${
                toast.type === "success" ? "text-[#276d50]" : "text-[#a33d3d]"
              }`}
            >
              {toast.message}
            </span>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[6px] text-[#8ba0b1] transition hover:bg-[#f5f7f9] hover:text-[#536273]"
            >
              <FiX size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Reports;
