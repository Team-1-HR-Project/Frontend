import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiCheck,
  FiUserPlus,
  FiUsers,
  FiBriefcase,
  FiMapPin,
  FiChevronRight,
} from "react-icons/fi";

const initialEmployees = [
  {
    id: 1,
    name: "Youssef Lotfy",
    code: "WW-00142",
    role: "Senior Product Designer",
    department: "Design",
    branch: "Cairo HQ",
    status: "Present",
    statusType: "success",
  },
  {
    id: 2,
    name: "Mariam Hassan",
    code: "WW-00118",
    role: "Engineering Manager",
    department: "Engineering",
    branch: "Cairo HQ",
    status: "Late",
    statusType: "warning",
  },
  {
    id: 3,
    name: "Omar Khaled",
    code: "WW-00087",
    role: "Sales Executive",
    department: "Sales",
    branch: "Alexandria Hub",
    status: "Present",
    statusType: "success",
  },
  {
    id: 4,
    name: "Nour Adel",
    code: "WW-00131",
    role: "People Operations Specialist",
    department: "People & Culture",
    branch: "Cairo HQ",
    status: "On leave",
    statusType: "info",
  },
  {
    id: 5,
    name: "Karim Ashraf",
    code: "WW-00054",
    role: "Operations Lead",
    department: "Operations",
    branch: "Alexandria Hub",
    status: "Absent",
    statusType: "danger",
  },
];

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

function EmployeesPage() {
  const { t: translate, i18n } = useTranslation();

  const currentLang = i18n.language || "en";
  const isArabic = currentLang.toLowerCase().startsWith("ar");

  const t = {
    title: isArabic ? "الموظفون" : "Employees",
    subtitle: isArabic
      ? "إدارة سجلات الموظفين وبيانات القوى العاملة"
      : "Manage employee records and workforce information",

    recordsCount: isArabic ? "سجلات الموظفين" : "employee records",

    addBtn: isArabic ? "إضافة موظف" : "Add Employee",

    searchPlaceholder: isArabic ? "البحث عن موظف..." : "Search employees...",

    employee: isArabic ? "الموظف" : "EMPLOYEE",
    role: isArabic ? "المسمى الوظيفي" : "ROLE",
    department: isArabic ? "القسم" : "DEPARTMENT",
    branch: isArabic ? "الفرع" : "BRANCH",
    status: isArabic ? "الحالة" : "STATUS",
    action: isArabic ? "الإجراء" : "ACTION",

    viewProfileBtn: isArabic ? "عرض الملف" : "View profile",

    modalTitle: isArabic ? "إنشاء سجل موظف" : "Create employee record",

    detailsLabel: isArabic ? "اسم الموظف" : "Employee Name",

    ownerLabel: isArabic ? "المسمى الوظيفي" : "Job Role",

    detailsPlaceholder: isArabic ? "اكتب اسم الموظف" : "Enter employee name",

    ownerPlaceholder: isArabic ? "اكتب المسمى الوظيفي" : "Enter job role",

    cancel: isArabic ? "إلغاء" : "Cancel",
    save: isArabic ? "حفظ الموظف" : "Save Employee",

    successTitle: isArabic ? "تمت إضافة الموظف" : "Employee added",

    successText: isArabic
      ? "تم إنشاء سجل الموظف بنجاح."
      : "The employee record has been created successfully.",

    done: isArabic ? "تم" : "Done",

    profileTitle: isArabic ? "ملف الموظف" : "Employee Profile",

    employeeId: isArabic ? "رقم الموظف" : "Employee ID",

    departmentLabel: isArabic ? "القسم" : "Department",

    branchLabel: isArabic ? "الفرع" : "Branch",

    statusLabel: isArabic ? "الحالة" : "Status",

    closeBtn: isArabic ? "إغلاق" : "Close",

    noResults: isArabic ? "لا توجد نتائج" : "No results found",

    noResultsText: isArabic
      ? "لم نتمكن من العثور على موظفين مطابقين لبحثك."
      : "We couldn't find any employees matching your search.",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [details, setDetails] = useState("");
  const [owner, setOwner] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [employees, setEmployees] = useState(initialEmployees);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const translatedEmployees = useMemo(() => {
    return employees;
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return translatedEmployees;
    }

    return translatedEmployees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(value) ||
        employee.code.toLowerCase().includes(value) ||
        employee.role.toLowerCase().includes(value) ||
        employee.department.toLowerCase().includes(value) ||
        employee.branch.toLowerCase().includes(value)
      );
    });
  }, [searchTerm, translatedEmployees]);

  const getStatusLabel = (status) => {
    if (!isArabic) return status;

    const statusMap = {
      Present: "حاضر",
      Late: "متأخر",
      "On leave": "في إجازة",
      Absent: "غائب",
    };

    return statusMap[status] || status;
  };

  const getStatusClasses = (type) => {
    const styles = {
      success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      warning: "bg-amber-50 text-amber-700 border border-amber-100",
      info: "bg-blue-50 text-blue-700 border border-blue-100",
      danger: "bg-red-50 text-red-700 border border-red-100",
    };

    return styles[type] || styles.info;
  };

  const handleSave = () => {
    if (!details.trim() || !owner.trim()) return;

    const newEmployee = {
      id: Date.now(),
      name: details.trim(),
      code: `WW-${String(Math.floor(Math.random() * 90000) + 10000).slice(-5)}`,
      role: owner.trim(),
      department: isArabic ? "عام" : "General",
      branch: "Cairo HQ",
      status: "Present",
      statusType: "success",
    };

    setEmployees((prev) => [newEmployee, ...prev]);

    setDetails("");
    setOwner("");
    setIsSuccess(true);
  };

  const openAddModal = () => {
    setDetails("");
    setOwner("");
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setDetails("");
    setOwner("");
  };

  const openProfile = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeProfile = () => {
    setSelectedEmployee(null);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className={`w-full min-w-0 ${isArabic ? "text-right" : "text-left"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-start gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0f5] text-[#355d80]">
              <FiUsers size={20} />
            </div>

            <div>
              <h1 className="text-[24px] font-bold tracking-tight text-[#203b55] sm:text-[28px]">
                {t.title}
              </h1>

              <p className="mt-1 text-[13px] text-[#7b91a4] sm:text-[14px]">
                {t.subtitle}
              </p>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="button"
            onClick={openAddModal}
            whileHover={{
              y: -1,
              boxShadow: "0 8px 20px rgba(27,42,71,0.12)",
            }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1b2a47] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#152138]"
          >
            <FiUserPlus size={16} />
            {t.addBtn}
          </motion.button>
        </motion.div>
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: 0.08,
          }}
          className="overflow-hidden rounded-2xl border border-[#e2e9ee] bg-white shadow-[0_4px_20px_rgba(31,55,75,0.04)]"
        >
          {/* Card Header */}
          <div className="flex flex-col gap-4 border-b border-[#edf1f4] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf3f7] text-[#5e7890]">
                <FiUsers size={15} />
              </div>

              <div className="text-[13px] font-semibold text-[#45627a]">
                <span className="text-[#203b55]">
                  {filteredEmployees.length}
                </span>{" "}
                {t.recordsCount}
              </div>
            </div>

            {/* Search */}
            <motion.div
              animate={{
                boxShadow: searchTerm
                  ? "0 0 0 3px rgba(71,121,156,0.08)"
                  : "0 0 0 0 rgba(71,121,156,0)",
              }}
              className="relative w-full md:max-w-md"
            >
              {/* Search Icon - vertically centered */}
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${
                  isArabic ? "right-0 pr-3.5" : "left-0 pl-3.5"
                }`}
              >
                <FiSearch size={17} className="text-[#8aa1b3]" />
              </div>

              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`h-11 w-full rounded-xl border border-[#d9e3ea] bg-white text-[13px] text-[#355d80] outline-none transition-all placeholder:text-[#9aabba] focus:border-[#7195b0] focus:ring-2 focus:ring-[#e3edf4] ${
                  isArabic ? "pl-10 pr-10 text-right" : "pl-10 pr-10 text-left"
                }`}
              />

              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className={`absolute top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-[#edf3f7] text-[#6d879d] transition hover:bg-[#e2ebf1] hover:text-[#315d80] ${
                      isArabic ? "left-2" : "right-2"
                    }`}
                  >
                    <FiX size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#edf1f4] bg-[#fbfcfd]">
                  <th
                    className={`px-5 py-4 text-[11px] font-bold tracking-wider text-[#8297a8] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t.employee}
                  </th>

                  <th
                    className={`px-5 py-4 text-[11px] font-bold tracking-wider text-[#8297a8] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t.role}
                  </th>

                  <th
                    className={`px-5 py-4 text-[11px] font-bold tracking-wider text-[#8297a8] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t.department}
                  </th>

                  <th
                    className={`px-5 py-4 text-[11px] font-bold tracking-wider text-[#8297a8] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t.branch}
                  </th>

                  <th
                    className={`px-5 py-4 text-[11px] font-bold tracking-wider text-[#8297a8] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t.status}
                  </th>

                  <th
                    className={`px-5 py-4 text-[11px] font-bold tracking-wider text-[#8297a8] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t.action}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((employee) => (
                  <motion.tr
                    key={employee.id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="border-b border-[#f0f3f5] transition-colors last:border-b-0 hover:bg-[#fbfcfd]"
                  >
                    {/* Employee */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf3f7] text-[#52728c]">
                          <FiUsers size={17} />
                        </div>

                        <div>
                          <div className="text-[13px] font-bold text-[#29465f]">
                            {employee.name}
                          </div>

                          <div className="mt-0.5 text-[11px] text-[#91a2af]">
                            {employee.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-[12px] font-medium text-[#526d82]">
                        <FiBriefcase size={14} className="text-[#91a5b4]" />
                        {employee.role}
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-[#f2f5f7] px-2.5 py-1.5 text-[11px] font-semibold text-[#5c7387]">
                        {employee.department}
                      </span>
                    </td>

                    {/* Branch */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-[12px] text-[#60788c]">
                        <FiMapPin size={14} className="text-[#8fa3b2]" />
                        {employee.branch}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${getStatusClasses(
                          employee.statusType,
                        )}`}
                      >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                        {getStatusLabel(employee.status)}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      <motion.button
                        type="button"
                        onClick={() => openProfile(employee)}
                        whileHover={{
                          x: isArabic ? -2 : 2,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#dce5eb] bg-white px-3 py-2 text-[11px] font-bold text-[#47677f] transition-colors hover:border-[#c9d7e0] hover:bg-[#f7fafc]"
                      >
                        {t.viewProfileBtn}

                        <FiChevronRight
                          size={13}
                          className={isArabic ? "rotate-180" : ""}
                        />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="grid gap-3 p-4 lg:hidden">
            <AnimatePresence mode="popLayout">
              {filteredEmployees.map((employee) => (
                <motion.div
                  key={employee.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="rounded-2xl border border-[#e5ebef] bg-white p-4 shadow-[0_2px_10px_rgba(31,55,75,0.03)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf3f7] text-[#52728c]">
                        <FiUsers size={17} />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-bold text-[#29465f]">
                          {employee.name}
                        </div>

                        <div className="mt-0.5 text-[11px] text-[#91a2af]">
                          {employee.code}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                        employee.statusType,
                      )}`}
                    >
                      {getStatusLabel(employee.status)}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <InfoBox
                      icon={<FiBriefcase size={14} />}
                      label={t.role}
                      value={employee.role}
                    />

                    <InfoBox
                      icon={<FiUsers size={14} />}
                      label={t.department}
                      value={employee.department}
                    />

                    <InfoBox
                      icon={<FiMapPin size={14} />}
                      label={t.branch}
                      value={employee.branch}
                    />
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => openProfile(employee)}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce5eb] bg-white py-2.5 text-[11px] font-bold text-[#47677f] transition-colors hover:bg-[#f7fafc]"
                  >
                    {t.viewProfileBtn}

                    <FiChevronRight
                      size={14}
                      className={isArabic ? "rotate-180" : ""}
                    />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredEmployees.length === 0 && (
            <EmptyState
              title={t.noResults}
              text={t.noResultsText}
              isArabic={isArabic}
            />
          )}
        </motion.div>
      </div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#162638]/35 p-4 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {!isSuccess ? (
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-[#edf1f4] px-5 py-4">
                    <div>
                      <h2 className="text-[17px] font-bold text-[#203b55]">
                        {t.modalTitle}
                      </h2>

                      <p className="mt-1 text-[11px] text-[#8ca0af]">
                        {isArabic
                          ? "أدخل بيانات الموظف الجديدة"
                          : "Enter the new employee information"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f6f8] text-[#70879a] transition hover:bg-[#eaf0f4] hover:text-[#355d80]"
                    >
                      <FiX size={16} />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="space-y-5 p-5">
                    <div>
                      <label className="mb-2 block text-[12px] font-bold text-[#49657a]">
                        {t.detailsLabel}
                      </label>

                      <input
                        type="text"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder={t.detailsPlaceholder}
                        className={`h-11 w-full rounded-xl border border-[#d9e3ea] bg-white px-3.5 text-[13px] text-[#355d80] outline-none transition focus:border-[#7195b0] focus:ring-2 focus:ring-[#e3edf4] ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[12px] font-bold text-[#49657a]">
                        {t.ownerLabel}
                      </label>

                      <input
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder={t.ownerPlaceholder}
                        className={`h-11 w-full rounded-xl border border-[#d9e3ea] bg-white px-3.5 text-[13px] text-[#355d80] outline-none transition focus:border-[#7195b0] focus:ring-2 focus:ring-[#e3edf4] ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end gap-2 border-t border-[#edf1f4] bg-[#fbfcfd] px-5 py-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-[#dce5eb] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#62798b] transition hover:bg-[#f5f8fa]"
                    >
                      {t.cancel}
                    </button>

                    <motion.button
                      type="button"
                      onClick={handleSave}
                      whileTap={{ scale: 0.98 }}
                      disabled={!details.trim() || !owner.trim()}
                      className="rounded-xl bg-[#1b2a47] px-5 py-2.5 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#152138] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {t.save}
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Success */
                <div className="px-6 py-8 text-center">
                  <motion.div
                    initial={{
                      scale: 0.7,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                  >
                    <FiCheck size={26} />
                  </motion.div>

                  <h2 className="mt-4 text-[18px] font-bold text-[#203b55]">
                    {t.successTitle}
                  </h2>

                  <p className="mx-auto mt-2 max-w-xs text-[12px] leading-6 text-[#8397a6]">
                    {t.successText}
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 rounded-xl bg-[#1b2a47] px-7 py-2.5 text-[12px] font-bold text-white transition hover:bg-[#152138]"
                  >
                    {t.done}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#162638]/35 p-4 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeProfile();
              }
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
              dir={isArabic ? "rtl" : "ltr"}
            >
              {/* Profile Header */}
              <div className="relative border-b border-[#edf1f4] px-5 pb-5 pt-6">
                <button
                  type="button"
                  onClick={closeProfile}
                  className={`absolute top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f6f8] text-[#70879a] transition hover:bg-[#eaf0f4] hover:text-[#355d80] ${
                    isArabic ? "left-4" : "right-4"
                  }`}
                >
                  <FiX size={16} />
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3f7] text-[#52728c]">
                    <FiUsers size={21} />
                  </div>

                  <div>
                    <h2 className="text-[18px] font-bold text-[#203b55]">
                      {selectedEmployee.name}
                    </h2>

                    <p className="mt-1 text-[11px] text-[#91a2af]">
                      {selectedEmployee.code}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Body */}
              <div className="space-y-2 p-5">
                <ProfileRow
                  icon={<FiBriefcase size={15} />}
                  label={t.role}
                  value={selectedEmployee.role}
                />

                <ProfileRow
                  icon={<FiUsers size={15} />}
                  label={t.departmentLabel}
                  value={selectedEmployee.department}
                />

                <ProfileRow
                  icon={<FiMapPin size={15} />}
                  label={t.branchLabel}
                  value={selectedEmployee.branch}
                />

                <ProfileRow
                  icon={<FiCheck size={15} />}
                  label={t.statusLabel}
                  value={getStatusLabel(selectedEmployee.status)}
                  valueClass={getStatusClasses(selectedEmployee.statusType)}
                />
              </div>

              {/* Profile Footer */}
              <div className="border-t border-[#edf1f4] bg-[#fbfcfd] px-5 py-4">
                <button
                  type="button"
                  onClick={closeProfile}
                  className="w-full rounded-xl bg-[#1b2a47] py-2.5 text-[12px] font-bold text-white transition hover:bg-[#152138]"
                >
                  {t.closeBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#f8fafb] p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-[#8ca0af]">
        {icon}
        {label}
      </div>

      <div className="text-[11px] font-semibold text-[#526d82]">{value}</div>
    </div>
  );
}

function ProfileRow({ icon, label, value, valueClass = "" }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fafb] px-3.5 py-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#8498a7]">
        {icon}
        {label}
      </div>

      <div
        className={`text-[11px] font-bold ${valueClass || "text-[#45627a]"}`}
      >
        {value}
      </div>
    </div>
  );
}

function EmptyState({ title, text, isArabic }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf3f7] text-[#7f97a9]">
        <FiSearch size={22} />
      </div>

      <h3 className="mt-4 text-[15px] font-bold text-[#45627a]">{title}</h3>

      <p className="mt-1.5 max-w-sm text-[12px] leading-6 text-[#91a2af]">
        {text}
      </p>
    </motion.div>
  );
}

export default EmployeesPage;
