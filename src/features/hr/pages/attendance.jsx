import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiCalendar,
  FiShield,
  FiMapPin,
  FiSmartphone,
  FiActivity,
  FiDownload,
  FiChevronDown,
  FiSearch,
  FiMoreHorizontal,
  FiUsers,
  FiArrowUpRight,
  FiX,
  FiSave,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const attendanceData = [
  {
    employeeKey: "hrAttendance.emp1Name",
    employeeDefault: "Youssef Lotfy",
    id: "WW-00142",
    branchKey: "hrAttendance.branchCairo",
    branchDefault: "Cairo HQ",
    shiftKey: "hrAttendance.shiftMorning",
    shiftDefault: "Morning 9–5",
    checkIn: "09:02",
    checkOut: "17:04",
    duration: "8h 02m",
    delay: "—",
    mode: "gps",
    status: "present",
  },
  {
    employeeKey: "hrAttendance.emp2Name",
    employeeDefault: "Mariam Hassan",
    id: "WW-00118",
    branchKey: "hrAttendance.branchCairo",
    branchDefault: "Cairo HQ",
    shiftKey: "hrAttendance.shiftMorning",
    shiftDefault: "Morning 9–5",
    checkIn: "09:27",
    checkOut: "17:10",
    duration: "8h 02m",
    delay: "27 min",
    mode: "biometric",
    status: "late",
  },
  {
    employeeKey: "hrAttendance.emp3Name",
    employeeDefault: "Ahmed Samir",
    id: "WW-00153",
    branchKey: "hrAttendance.branchAlex",
    branchDefault: "Alexandria",
    shiftKey: "hrAttendance.shiftMorning",
    shiftDefault: "Morning 9–5",
    checkIn: "08:58",
    checkOut: "17:01",
    duration: "8h 03m",
    delay: "—",
    mode: "gps",
    status: "present",
  },
  {
    employeeKey: "hrAttendance.emp4Name",
    employeeDefault: "Nour Adel",
    id: "WW-00174",
    branchKey: "hrAttendance.branchCairo",
    branchDefault: "Cairo HQ",
    shiftKey: "hrAttendance.shiftMorning",
    shiftDefault: "Morning 9–5",
    checkIn: "—",
    checkOut: "—",
    duration: "—",
    delay: "—",
    mode: "none",
    status: "absent",
  },
];

const Attendance = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language?.toLowerCase().startsWith("ar");

  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedShift, setSelectedShift] = useState("all");
  const [search, setSearch] = useState("");

  const [adjustmentModal, setAdjustmentModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [adjustment, setAdjustment] = useState({
    type: "checkIn",
    time: "",
    reason: "",
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const stats = [
    {
      id: "present",
      title: t("hrAttendance.presentToday"),
      value: "128",
      description: t("hrAttendance.acrossAllBranches"),
      icon: FiCheckCircle,
      iconWrapper: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "border-emerald-100",
    },
    {
      id: "late",
      title: t("hrAttendance.lateArrivals"),
      value: "8",
      description: t("hrAttendance.gracePeriod"),
      icon: FiClock,
      iconWrapper: "bg-amber-50",
      iconColor: "text-amber-600",
      accent: "border-amber-100",
    },
    {
      id: "absent",
      title: t("hrAttendance.unexcusedAbsences"),
      value: "6",
      description: t("hrAttendance.requiresFollowUp"),
      icon: FiAlertTriangle,
      iconWrapper: "bg-red-50",
      iconColor: "text-red-600",
      accent: "border-red-100",
    },
    {
      id: "leave",
      title: t("hrAttendance.approvedLeave"),
      value: "4",
      description: t("hrAttendance.today"),
      icon: FiCalendar,
      iconWrapper: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "border-blue-100",
    },
  ];

  const filteredData = useMemo(() => {
    return attendanceData.filter((row) => {
      const searchValue = search.trim().toLowerCase();

      const employeeName = t(
        row.employeeKey,
        row.employeeDefault,
      ).toLowerCase();

      const matchesSearch =
        !searchValue ||
        employeeName.includes(searchValue) ||
        row.id.toLowerCase().includes(searchValue);

      const branch =
        row.branchDefault === "Cairo HQ"
          ? "cairo"
          : row.branchDefault === "Alexandria"
            ? "alexandria"
            : "giza";

      const shift = row.shiftDefault === "Morning 9–5" ? "morning" : "evening";

      return (
        matchesSearch &&
        (selectedBranch === "all" || selectedBranch === branch) &&
        (selectedShift === "all" || selectedShift === shift)
      );
    });
  }, [search, selectedBranch, selectedShift, t]);

  const statusStyles = {
    present: {
      wrapper:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100",
      dot: "bg-emerald-500",
      label: t("hrAttendance.statusPresent"),
    },

    late: {
      wrapper: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100",
      dot: "bg-amber-500",
      label: t("hrAttendance.statusLate"),
    },

    absent: {
      wrapper: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-100",
      dot: "bg-red-500",
      label: t("hrAttendance.statusAbsent"),
    },
  };

  const modeConfig = {
    gps: {
      icon: FiMapPin,
      title: t("hrAttendance.modeGPS"),
      subtitle: t("hrAttendance.modeGeofenced"),
    },

    biometric: {
      icon: FiSmartphone,
      title: t("hrAttendance.modeBiometric"),
      subtitle: t("hrAttendance.modeDevice"),
    },

    none: {
      icon: FiActivity,
      title: "—",
      subtitle: "",
    },
  };

  const openAdjustmentModal = (employee) => {
    setSelectedEmployee(employee);

    setAdjustment({
      type: "checkIn",
      time: employee.checkIn !== "—" ? employee.checkIn : "",
      reason: "",
    });

    setAdjustmentModal(true);
  };

  const closeAdjustmentModal = () => {
    setAdjustmentModal(false);
    setSelectedEmployee(null);

    setAdjustment({
      type: "checkIn",
      time: "",
      reason: "",
    });
  };

  const handleAdjustmentChange = (field, value) => {
    setAdjustment((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveAdjustment = (event) => {
    event.preventDefault();

    if (!adjustment.time || !adjustment.reason.trim()) {
      return;
    }

    setSavedMessage(true);

    window.setTimeout(() => {
      setSavedMessage(false);
    }, 2500);

    closeAdjustmentModal();
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full min-h-screen space-y-6 bg-[#f5f7fa] pb-10"
    >
      {/* =========================
          Success Message
      ========================== */}
      <AnimatePresence>
        {savedMessage && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.96,
            }}
            className={`fixed ${
              isArabic ? "left-5" : "right-5"
            } top-5 z-[200] flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-xl`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <FiCheckCircle size={17} />
            </div>

            <span className="text-sm font-semibold text-slate-700">
              {t(
                "hrAttendance.adjustmentSaved",
                "Attendance adjustment saved successfully",
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          Header
      ========================== */}
      <motion.section
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>{t("hrAttendance.breadcrumbHome")}</span>

            <span>/</span>

            <span className="text-slate-600">{t("hrAttendance.title")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[30px]">
              {t("hrAttendance.title")}
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              {t("hrAttendance.live")}
            </span>
          </div>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            {t("hrAttendance.subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <FiDownload className="h-4 w-4" />

            {t("hrAttendance.export")}
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#173f63] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123653]"
          >
            <FiActivity className="h-4 w-4" />

            {t("hrAttendance.viewLive")}
          </motion.button>
        </div>
      </motion.section>

      {/* =========================
          Filters
      ========================== */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch
              className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                isArabic ? "right-3.5" : "left-3.5"
              }`}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("hrAttendance.searchPlaceholder")}
              className={`h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#6b8cab] focus:bg-white focus:ring-2 focus:ring-[#173f63]/5 ${
                isArabic ? "pr-10 pl-3" : "pl-10 pr-3"
              }`}
            />
          </div>

          {/* Date */}
          <button
            type="button"
            className="flex h-10 items-center justify-between gap-5 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-600 transition hover:bg-slate-50"
          >
            <span className="flex items-center gap-2">
              <FiCalendar className="h-4 w-4 text-slate-400" />
              09/15/2026
            </span>

            <FiChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* Branch */}
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="h-10 min-w-[155px] appearance-none rounded-xl border border-slate-200 bg-white px-3 pe-9 text-sm text-slate-600 outline-none transition focus:border-[#6b8cab]"
            >
              <option value="all">{t("hrAttendance.allBranches")}</option>

              <option value="cairo">{t("hrAttendance.branchCairo")}</option>

              <option value="alexandria">{t("hrAttendance.branchAlex")}</option>

              <option value="giza">{t("hrAttendance.branchGiza")}</option>
            </select>

            <FiChevronDown
              className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                isArabic ? "left-3" : "right-3"
              }`}
            />
          </div>

          {/* Shift */}
          <div className="relative">
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="h-10 min-w-[145px] appearance-none rounded-xl border border-slate-200 bg-white px-3 pe-9 text-sm text-slate-600 outline-none transition focus:border-[#6b8cab]"
            >
              <option value="all">{t("hrAttendance.allShifts")}</option>

              <option value="morning">{t("hrAttendance.shiftMorning")}</option>

              <option value="evening">{t("hrAttendance.shiftEvening")}</option>
            </select>

            <FiChevronDown
              className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                isArabic ? "left-3" : "right-3"
              }`}
            />
          </div>
        </div>
      </motion.section>

      {/* =========================
          Stats
      ========================== */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.id}
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.07,
              }}
              whileHover={{
                y: -3,
              }}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition duration-200 hover:shadow-md ${stat.accent}`}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-slate-400">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-[30px] font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconWrapper} ${stat.iconColor}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* =========================
          Policy
      ========================== */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-white px-5 py-4 sm:flex-row sm:items-center"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
          <FiShield className="h-4 w-4" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-emerald-900">
            {t("hrAttendance.policyLabel")}
          </p>

          <p className="mt-0.5 text-xs leading-5 text-emerald-700/80">
            {t("hrAttendance.policyText")}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
        >
          {t("hrAttendance.viewPolicy")}

          <FiArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </motion.section>

      {/* =========================
          Table
      ========================== */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
      >
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                {t("hrAttendance.tableTitle")}
              </h2>

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                {filteredData.length}
              </span>
            </div>

            <p className="mt-0.5 text-xs text-slate-400">
              {t("hrAttendance.tableSubtitle")}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50"
          >
            <FiMoreHorizontal className="h-4 w-4" />

            {t("hrAttendance.more")}
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr className="bg-slate-50/70">
                {[
                  "colEmployee",
                  "colBranch",
                  "colShift",
                  "colCheckIn",
                  "colCheckOut",
                  "colDuration",
                  "colDelay",
                  "colMode",
                  "colStatus",
                  "colAction",
                ].map((key) => (
                  <th
                    key={key}
                    className="whitespace-nowrap border-b border-slate-100 px-5 py-3 text-start text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400"
                  >
                    {t(`hrAttendance.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row, index) => {
                const status = statusStyles[row.status];
                const mode = modeConfig[row.mode];
                const ModeIcon = mode.icon;

                return (
                  <motion.tr
                    key={row.id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                  >
                    {/* Employee */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf4f8] text-xs font-bold text-[#355d7e]">
                          {t(row.employeeKey, row.employeeDefault)
                            .split(" ")
                            .map((name) => name[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {t(row.employeeKey, row.employeeDefault)}
                          </p>

                          <p className="mt-0.5 text-[11px] text-slate-400">
                            {row.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Branch */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                        <FiMapPin className="h-3.5 w-3.5 text-slate-300" />

                        {t(row.branchKey, row.branchDefault)}
                      </span>
                    </td>

                    {/* Shift */}
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {t(row.shiftKey, row.shiftDefault)}
                    </td>

                    {/* Check In */}
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {row.checkIn}
                      </span>
                    </td>

                    {/* Check Out */}
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {row.checkOut}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-600">
                        {row.duration}
                      </span>
                    </td>

                    {/* Delay */}
                    <td className="px-5 py-4">
                      {row.delay !== "—" ? (
                        <span className="inline-flex rounded-lg bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                          +{row.delay}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-300">—</span>
                      )}
                    </td>

                    {/* Mode */}
                    <td className="px-5 py-4">
                      {mode.title === "—" ? (
                        <span className="text-sm text-slate-300">—</span>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <ModeIcon className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-600">
                              {mode.title}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {mode.subtitle}
                            </p>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold ${status.wrapper}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />

                        {status.label}
                      </span>
                    </td>

                    {/* Manual Adjustment */}
                    <td className="px-5 py-4">
                      <motion.button
                        type="button"
                        whileHover={{
                          y: -2,
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={() => openAdjustmentModal(row)}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#d7e0e8] bg-[#f8fafc] px-3.5 py-2 text-xs font-bold text-[#315d80] shadow-sm transition-all hover:border-[#9db5c9] hover:bg-[#edf4f8] hover:text-[#173f63]"
                      >
                        <FiClock className="h-3.5 w-3.5" />

                        {t("hrAttendance.manualAdjustment")}
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty */}
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FiUsers className="h-5 w-5" />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              {t("hrAttendance.noResults")}
            </h3>

            <p className="mt-1 max-w-sm text-xs text-slate-400">
              {t("hrAttendance.noResultsDescription")}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3">
          <p className="text-xs text-slate-400">
            {t("hrAttendance.showingResults", {
              count: filteredData.length,
            })}
          </p>

          <span className="text-xs font-medium text-slate-500">
            {t("hrAttendance.updatedJustNow")}
          </span>
        </div>
      </motion.section>

      {/* =====================================================
          Manual Adjustment Modal
      ====================================================== */}
      <AnimatePresence>
        {adjustmentModal && selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#0f172a]/40 px-4 backdrop-blur-[3px]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeAdjustmentModal();
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
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
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4f8] text-[#315d80]">
                      <FiClock className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {t(
                          "hrAttendance.manualAdjustment",
                          "Manual Adjustment",
                        )}
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {t(
                          selectedEmployee.employeeKey,
                          selectedEmployee.employeeDefault,
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeAdjustmentModal}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveAdjustment} className="space-y-5 p-6">
                {/* Type */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-600">
                    {t("hrAttendance.adjustmentType", "Adjustment type")}
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAdjustmentChange("type", "checkIn")}
                      className={`h-11 rounded-xl border text-sm font-semibold transition ${
                        adjustment.type === "checkIn"
                          ? "border-[#173f63] bg-[#edf4f8] text-[#173f63]"
                          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {t("hrAttendance.checkIn", "Check-in")}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAdjustmentChange("type", "checkOut")}
                      className={`h-11 rounded-xl border text-sm font-semibold transition ${
                        adjustment.type === "checkOut"
                          ? "border-[#173f63] bg-[#edf4f8] text-[#173f63]"
                          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {t("hrAttendance.checkOut", "Check-out")}
                    </button>
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="adjustment-time"
                    className="mb-2 block text-xs font-bold text-slate-600"
                  >
                    {t("hrAttendance.adjustmentTime", "New time")}
                  </label>

                  <input
                    id="adjustment-time"
                    type="time"
                    value={adjustment.time}
                    onChange={(e) =>
                      handleAdjustmentChange("time", e.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-[#6b8cab] focus:bg-white focus:ring-2 focus:ring-[#173f63]/5"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label
                    htmlFor="adjustment-reason"
                    className="mb-2 block text-xs font-bold text-slate-600"
                  >
                    {t("hrAttendance.adjustmentReason", "Reason")}
                  </label>

                  <textarea
                    id="adjustment-reason"
                    rows={4}
                    value={adjustment.reason}
                    onChange={(e) =>
                      handleAdjustmentChange("reason", e.target.value)
                    }
                    placeholder={t(
                      "hrAttendance.adjustmentReasonPlaceholder",
                      "Enter the reason for this adjustment...",
                    )}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#6b8cab] focus:bg-white focus:ring-2 focus:ring-[#173f63]/5"
                  />
                </div>

                {/* Buttons */}
                <div
                  className={`flex gap-2 pt-1 ${
                    isArabic ? "flex-row-reverse justify-start" : "justify-end"
                  }`}
                >
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={closeAdjustmentModal}
                    className="h-11 rounded-xl border-2 border-[#260166] bg-[#f5f3ff] px-5 text-sm font-bold !text-[#260166] transition hover:bg-[#260166] hover:!text-white"
                  >
                    {t("common.cancel", "Cancel")}
                  </motion.button>

                  <motion.button
                    whileHover={
                      adjustment.time && adjustment.reason.trim()
                        ? {
                            y: -2,
                            boxShadow: "0 8px 20px rgba(124,58,237,0.18)",
                          }
                        : {}
                    }
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={!adjustment.time || !adjustment.reason.trim()}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#260166] to-[#260166] px-5 text-sm font-bold !text-white shadow-md shadow-violet-200 transition disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
                  >
                    <FiSave className="h-4 w-4" />

                    {t("hrAttendance.saveAdjustment", "Save adjustment")}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Attendance;
