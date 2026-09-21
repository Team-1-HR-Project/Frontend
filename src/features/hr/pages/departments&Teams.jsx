import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiCheck,
  FiUsers,
  FiBriefcase,
  FiActivity,
  FiLayers,
} from "react-icons/fi";

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.18 },
  },
};

export default function DepartmentsAndTeams() {
  const { i18n } = useTranslation();

  const isArabic = i18n.language?.startsWith("ar");

  const content = {
    en: {
      title: "Departments & Teams",
      subtitle: "Manage organizational structure, leaders, and workstreams.",
      createBtn: "Create Department",
      searchPlaceholder: "Search departments",

      headPrefix: "Head: ",
      headcountLabel: "Headcount",
      activeProjectsLabel: "Active projects",

      manageMembersBtn: "Manage Members",
      transferEmployeeBtn: "Transfer Employee",

      totalDepartments: "Total Departments",
      totalEmployees: "Total Employees",
      totalProjects: "Active Projects",
      avgAttendance: "Avg. Attendance",

      modalTitle: "Create workflow record",
      detailsLabel: "Details",
      detailsPlaceholder: "Department name",
      ownerLabel: "Owner",
      ownerPlaceholder: "Department owner",

      cancelBtn: "Cancel",
      saveBtn: "Save changes",

      successTitle: "Saved successfully",
      successSubtitle: "The new department has been added successfully.",
      doneBtn: "Done",

      engineeringName: "Engineering",
      mariamHead: "Mariam Hassan",

      peopleName: "People & Culture",
      sarahHead: "Sarah Ahmed",

      salesName: "Sales",
      omarHead: "Omar Khaled",

      logisticsName: "Logistics",
      karimHead: "Karim Ashraf",

      att94: "94% attendance",
      att97: "97% attendance",
      att91: "91% attendance",
      att89: "89% attendance",

      noResults: "No departments found",
      results: "results",

      membersTitle: "Manage Members",
      membersSubtitle: "Manage department members and employees.",
      closeBtn: "Close",

      transferTitle: "Transfer Employee",
      transferSubtitle:
        "Select an employee and transfer them to this department.",
      employeePlaceholder: "Select employee",
      transferBtn: "Transfer",
    },

    ar: {
      title: "الأقسام والفرق",
      subtitle: "إدارة الهيكل التنظيمي، القادة، ومسارات العمل.",
      createBtn: "إنشاء قسم",
      searchPlaceholder: "بحث عن الأقسام",

      headPrefix: "رئيس القسم: ",
      headcountLabel: "عدد الموظفين",
      activeProjectsLabel: "المشاريع النشطة",

      manageMembersBtn: "إدارة الأعضاء",
      transferEmployeeBtn: "نقل موظف",

      totalDepartments: "إجمالي الأقسام",
      totalEmployees: "إجمالي الموظفين",
      totalProjects: "المشاريع النشطة",
      avgAttendance: "متوسط الحضور",

      modalTitle: "إنشاء سجل عمل",
      detailsLabel: "التفاصيل",
      detailsPlaceholder: "اسم القسم",
      ownerLabel: "المسؤول",
      ownerPlaceholder: "مسؤول القسم",

      cancelBtn: "إلغاء",
      saveBtn: "حفظ التغييرات",

      successTitle: "تم الحفظ بنجاح",
      successSubtitle: "تمت إضافة القسم الجديد بنجاح.",
      doneBtn: "تم",

      engineeringName: "الهندسة",
      mariamHead: "مريم حسن",

      peopleName: "الأفراد والثقافة",
      sarahHead: "سارة أحمد",

      salesName: "المبيعات",
      omarHead: "عمر خالد",

      logisticsName: "اللوجستيات",
      karimHead: "كريم أشرف",

      att94: "نسبة الحضور 94%",
      att97: "نسبة الحضور 97%",
      att91: "نسبة الحضور 91%",
      att89: "نسبة الحضور 89%",

      noResults: "لم يتم العثور على أقسام",
      results: "نتائج",

      membersTitle: "إدارة الأعضاء",
      membersSubtitle: "إدارة أعضاء وموظفي القسم.",
      closeBtn: "إغلاق",

      transferTitle: "نقل موظف",
      transferSubtitle: "اختر موظفًا لنقله إلى هذا القسم.",
      employeePlaceholder: "اختر الموظف",
      transferBtn: "نقل الموظف",
    },
  };

  const t = content[isArabic ? "ar" : "en"];

  const [departments, setDepartments] = useState([
    {
      id: 1,
      nameKey: "engineeringName",
      headKey: "mariamHead",
      attendanceKey: "att94",
      headcount: 38,
      activeProjects: 12,
    },
    {
      id: 2,
      nameKey: "peopleName",
      headKey: "sarahHead",
      attendanceKey: "att97",
      headcount: 14,
      activeProjects: 5,
    },
    {
      id: 3,
      nameKey: "salesName",
      headKey: "omarHead",
      attendanceKey: "att91",
      headcount: 38,
      activeProjects: 9,
    },
    {
      id: 4,
      nameKey: "logisticsName",
      headKey: "karimHead",
      attendanceKey: "att89",
      headcount: 52,
      activeProjects: 18,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [details, setDetails] = useState("");
  const [owner, setOwner] = useState("");

  const [membersModal, setMembersModal] = useState(null);
  const [transferModal, setTransferModal] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const filteredDepartments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return departments;

    return departments.filter((dept) => {
      const name = dept.nameKey ? t[dept.nameKey] : dept.customName || "";

      const head = dept.headKey ? t[dept.headKey] : dept.customHead || "";

      return (
        name.toLowerCase().includes(query) || head.toLowerCase().includes(query)
      );
    });
  }, [departments, searchTerm, isArabic]);

  const totalEmployees = departments.reduce(
    (sum, dept) => sum + dept.headcount,
    0,
  );

  const totalProjects = departments.reduce(
    (sum, dept) => sum + dept.activeProjects,
    0,
  );

  const averageAttendance =
    departments.length > 0
      ? Math.round(
          departments.reduce((sum, dept) => {
            const attendanceText = dept.attendanceKey
              ? t[dept.attendanceKey]
              : dept.customAttendance || "";

            const match = attendanceText.match(/\d+/);

            return sum + (match ? Number(match[0]) : 0);
          }, 0) / departments.length,
        )
      : 0;

  const handleCreateDepartment = () => {
    setDetails("");
    setOwner("");
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const handleSaveDepartment = (e) => {
    e.preventDefault();

    if (!details.trim()) return;

    const newDept = {
      id: Date.now(),
      nameKey: null,
      customName: details.trim(),

      headKey: null,
      customHead: owner.trim() || (isArabic ? "غير محدد" : "Unassigned"),

      attendanceKey: null,
      customAttendance: isArabic ? "نسبة الحضور 90%" : "90% attendance",

      headcount: 10,
      activeProjects: 3,
    };

    setDepartments((prev) => [newDept, ...prev]);
    setIsSuccess(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setDetails("");
    setOwner("");
  };

  const openMembersModal = (department) => {
    setMembersModal(department);
  };

  const openTransferModal = (department) => {
    setSelectedEmployee("");
    setTransferModal(department);
  };

  const closeMembersModal = () => {
    setMembersModal(null);
  };

  const closeTransferModal = () => {
    setTransferModal(null);
    setSelectedEmployee("");
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    if (!selectedEmployee) return;

    closeTransferModal();
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1b2a47]">
                {t.title}
              </h1>

              <p className="mt-2 text-sm sm:text-base text-slate-500">
                {t.subtitle}
              </p>
            </div>

            {/* Search + Create */}
            <div
              id="pxd88a"
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
            >
              <div className="relative w-full sm:w-64">
                <div
                  className={`absolute inset-y-0 flex items-center pointer-events-none ${
                    isArabic ? "right-0 pr-3.5" : "left-0 pl-3.5"
                  }`}
                >
                  <FiSearch size={17} className="text-slate-400" />
                </div>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none transition-all focus:border-violet-400 focus:ring-4 focus:ring-violet-100 ${
                    isArabic ? "pr-10 pl-4" : "pl-10 pr-4"
                  }`}
                />
              </div>

              <motion.button
                type="button"
                id="29d17n"
                onClick={handleCreateDepartment}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-[#1b2a47] hover:bg-[#152138] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all whitespace-nowrap"
              >
                <FiPlus size={17} />
                {t.createBtn}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  {t.totalDepartments}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1b2a47]">
                  {departments.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FiLayers size={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  {t.totalEmployees}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1b2a47]">
                  {totalEmployees}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiUsers size={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  {t.totalProjects}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1b2a47]">
                  {totalProjects}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <FiBriefcase size={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  {t.avgAttendance}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1b2a47]">
                  {averageAttendance}%
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FiActivity size={20} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Results Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-600">
            {filteredDepartments.length} {t.results}
          </p>
        </div>

        {/* Departments */}
        {filteredDepartments.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
          >
            {filteredDepartments.map((department) => {
              const departmentName = department.nameKey
                ? t[department.nameKey]
                : department.customName;

              const departmentHead = department.headKey
                ? t[department.headKey]
                : department.customHead;

              const attendance = department.attendanceKey
                ? t[department.attendanceKey]
                : department.customAttendance;

              return (
                <motion.div
                  key={department.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  {/* Card Top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <FiBriefcase size={20} />
                      </div>

                      <h3 className="truncate text-lg font-bold text-[#1b2a47]">
                        {departmentName}
                      </h3>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {t.headPrefix}
                        {departmentHead}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                      {attendance}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] font-medium text-slate-400">
                        {t.headcountLabel}
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#1b2a47]">
                        {department.headcount}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] font-medium text-slate-400">
                        {t.activeProjectsLabel}
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#1b2a47]">
                        {department.activeProjects}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 mt-5">
                    <motion.button
                      type="button"
                      onClick={() => openMembersModal(department)}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1b2a47] text-white hover:bg-[#152138] text-xs font-bold transition-colors shadow-sm"
                    >
                      <FiUsers size={15} />
                      {t.manageMembersBtn}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => openTransferModal(department)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-xs"
                    >
                      {t.transferEmployeeBtn}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FiSearch size={20} />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-600">
              {t.noResults}
            </p>
          </div>
        )}
      </motion.div>

      {/* Create Department Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCreateModal}
              className="absolute inset-0 bg-[#0f172a]/50 backdrop-blur-sm"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {!isSuccess ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                      <h2 className="text-lg font-bold text-[#1b2a47]">
                        {t.modalTitle}
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        {t.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeCreateModal}
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveDepartment} className="p-6">
                    <div className="space-y-5">
                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-600">
                          {t.detailsLabel}
                        </label>

                        <input
                          type="text"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder={t.detailsPlaceholder}
                          autoFocus
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold text-slate-600">
                          {t.ownerLabel}
                        </label>

                        <input
                          type="text"
                          value={owner}
                          onChange={(e) => setOwner(e.target.value)}
                          placeholder={t.ownerPlaceholder}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                      </div>
                    </div>

                    <div className="mt-7 flex gap-3">
                      <button
                        type="button"
                        onClick={closeCreateModal}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        {t.cancelBtn}
                      </button>

                      <button
                        type="submit"
                        disabled={!details.trim()}
                        className="flex-1 rounded-xl bg-[#1b2a47] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#152138] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {t.saveBtn}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="px-6 py-10 text-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                  >
                    <FiCheck size={30} />
                  </motion.div>

                  <h2 className="mt-5 text-xl font-bold text-[#1b2a47]">
                    {t.successTitle}
                  </h2>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    {t.successSubtitle}
                  </p>

                  <button
                    type="button"
                    onClick={closeCreateModal}
                    className="mt-7 w-full rounded-xl bg-[#1b2a47] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#152138]"
                  >
                    {t.doneBtn}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manage Members Modal */}
      <AnimatePresence>
        {membersModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMembersModal}
              className="absolute inset-0 bg-[#0f172a]/50 backdrop-blur-sm"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <FiUsers size={20} />
                  </div>

                  <h2 className="text-lg font-bold text-[#1b2a47]">
                    {t.membersTitle}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {membersModal.nameKey
                      ? t[membersModal.nameKey]
                      : membersModal.customName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMembersModal}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {t.headcountLabel}
                  </span>

                  <span className="font-bold text-[#1b2a47]">
                    {membersModal.headcount}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{
                      width: `${Math.min(membersModal.headcount * 2, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {t.membersSubtitle}
              </p>

              <button
                type="button"
                onClick={closeMembersModal}
                className="mt-6 w-full rounded-xl bg-[#1b2a47] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#152138]"
              >
                {t.closeBtn}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Transfer Employee Modal */}
      <AnimatePresence>
        {transferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTransferModal}
              className="absolute inset-0 bg-[#0f172a]/50 backdrop-blur-sm"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiUsers size={20} />
                  </div>

                  <h2 className="text-lg font-bold text-[#1b2a47]">
                    {t.transferTitle}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {transferModal.nameKey
                      ? t[transferModal.nameKey]
                      : transferModal.customName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeTransferModal}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={handleTransfer} className="p-6">
                <p className="mb-5 text-sm leading-6 text-slate-500">
                  {t.transferSubtitle}
                </p>

                <label className="mb-2 block text-xs font-bold text-slate-600">
                  {t.employeePlaceholder}
                </label>

                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                >
                  <option value="">{t.employeePlaceholder}</option>

                  <option value="employee-1">
                    {isArabic ? "أحمد محمد" : "Ahmed Mohamed"}
                  </option>

                  <option value="employee-2">
                    {isArabic ? "سلمى علي" : "Salma Ali"}
                  </option>

                  <option value="employee-3">
                    {isArabic ? "يوسف خالد" : "Youssef Khaled"}
                  </option>
                </select>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={closeTransferModal}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    {t.cancelBtn}
                  </button>

                  <button
                    type="submit"
                    disabled={!selectedEmployee}
                    className="flex-1 rounded-xl bg-[#1b2a47] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#152138] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.transferBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
