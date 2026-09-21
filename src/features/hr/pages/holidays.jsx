import { useState } from "react";
import { Plus, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// =====================================================
// SMART HR BRAND TOKENS
// Primary #243B53 · Secondary #486581 · Accent #5B8C6A
// Background #F5F7F8 · Text #202B33 · Muted #6B7785
// Border #D9E2EC · Warning #C58B2A · Success #3F7D5A
// =====================================================

// =====================================================
// ANIMATION VARIANTS
// =====================================================

const pageContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const rowAnimation = {
  hidden: {
    opacity: 0,
    y: 12,
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

const modalBackdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const modalCard = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// =====================================================
// DATA
// =====================================================

const initialHolidays = [
  {
    id: "eid-al-fitr",
    nameKey: "eidAlFitr",
    dateRange: "Apr 10 – Apr 12, 2026",
    totalDaysKey: "threeDays",
    statusKey: "activeOfficialLeave",
  },
  {
    id: "revolution-day",
    nameKey: "revolutionDay",
    dateRange: "Jul 23, 2026",
    totalDaysKey: "oneDay",
    statusKey: "activeOfficialLeave",
  },
  {
    id: "new-years-day",
    nameKey: "newYearsDay",
    dateRange: "Jan 01, 2027",
    totalDaysKey: "oneDay",
    statusKey: "activeOfficialLeave",
  },
];

// =====================================================
// SCHEDULE HOLIDAY MODAL
// =====================================================

function ScheduleHolidayModal({ onClose, onSave }) {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [totalDays, setTotalDays] = useState("");

  // =====================================================
  // SAVE HOLIDAY
  // =====================================================

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      name,
      dateRange,
      totalDays,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#202B33]/40 px-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalCard}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* =================================================
              MODAL HEADER
          ================================================= */}

          <div className="flex items-center justify-between">
            <h2 className="font-['Manrope'] text-lg font-semibold text-[#202B33]">
              {t("holidays.modal.title")}
            </h2>

            <motion.button
              whileHover={{
                rotate: 90,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={onClose}
              className="text-[#6B7785] transition-colors hover:text-[#202B33]"
              aria-label={t("holidays.modal.close")}
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.12,
                duration: 0.3,
              },
            }}
            className="mt-5 grid grid-cols-2 gap-4"
          >
            {/* Holiday Name */}

            <div>
              <label className="text-sm font-medium text-[#202B33]">
                {t("holidays.modal.holidayName")}
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("holidays.modal.holidayNamePlaceholder")}
                className="mt-1.5 w-full rounded-md border border-[#D9E2EC] px-3 py-2 text-sm text-[#202B33] placeholder:text-[#6B7785]/70 transition-all duration-200 focus:border-[#486581] focus:outline-none focus:ring-1 focus:ring-[#486581]"
              />
            </div>

            {/* Date Range */}

            <div>
              <label className="text-sm font-medium text-[#202B33]">
                {t("holidays.modal.dateRange")}
              </label>

              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder={t("holidays.modal.dateRangePlaceholder")}
                className="mt-1.5 w-full rounded-md border border-[#D9E2EC] px-3 py-2 text-sm text-[#202B33] placeholder:text-[#6B7785]/70 transition-all duration-200 focus:border-[#486581] focus:outline-none focus:ring-1 focus:ring-[#486581]"
              />
            </div>

            {/* Total Days */}

            <div className="col-span-2">
              <label className="text-sm font-medium text-[#202B33]">
                {t("holidays.modal.totalDays")}
              </label>

              <input
                type="text"
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
                placeholder={t("holidays.modal.totalDaysPlaceholder")}
                className="mt-1.5 w-full rounded-md border border-[#D9E2EC] px-3 py-2 text-sm text-[#202B33] placeholder:text-[#6B7785]/70 transition-all duration-200 focus:border-[#486581] focus:outline-none focus:ring-1 focus:ring-[#486581]"
              />
            </div>
          </motion.div>

          {/* =================================================
              MODAL ACTIONS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.18,
                duration: 0.3,
              },
            }}
            className="mt-6 flex justify-end gap-3"
          >
            <motion.button
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={onClose}
              className="rounded-md border border-[#D9E2EC] px-4 py-2 text-sm font-medium text-[#202B33] transition-colors hover:bg-[#F5F7F8]"
            >
              {t("holidays.modal.cancel")}
            </motion.button>

            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleSave}
              className="rounded-md bg-[#243B53] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#1c2f43] hover:shadow-md"
            >
              {t("holidays.modal.save")}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// =====================================================
// HOLIDAYS & SEASONS PAGE
// =====================================================

export default function HolidaysSeasons() {
  const { t } = useTranslation();

  const [holidays, setHolidays] = useState(initialHolidays);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // =====================================================
  // SAVE NEW HOLIDAY
  // =====================================================

  const handleSaveHoliday = ({ name, dateRange, totalDays }) => {
    setHolidays((prev) => [
      ...prev,
      {
        id: `${name.toLowerCase().replace(/\s+/g, "-")}-${prev.length}`,
        customName: name,
        customDateRange: dateRange || "—",
        customTotalDays: totalDays || "—",
        statusKey: "activeOfficialLeave",
      },
    ]);

    setIsModalOpen(false);
  };

  return (
    <motion.div
      variants={pageContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#F5F7F8]"
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <motion.div
        variants={fadeUp}
        className="mb-6 flex items-start justify-between"
      >
        <div>
          <h1 className="font-['Manrope'] text-2xl font-bold text-[#202B33]">
            {t("holidays.title")}
          </h1>

          <p className="mt-1 text-sm text-[#6B7785]">
            {t("holidays.subtitle")}
          </p>
        </div>

        {/* Schedule Button */}

        <motion.button
          variants={fadeRight}
          whileHover={{
            y: -2,
            scale: 1.015,
            boxShadow: "0 8px 18px rgba(36, 59, 83, 0.14)",
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#243B53] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1c2f43]"
        >
          <motion.span
            whileHover={{
              rotate: 90,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Plus className="h-4 w-4" />
          </motion.span>

          {t("holidays.scheduleHoliday")}
        </motion.button>
      </motion.div>

      {/* =================================================
          PEAK ALERT BANNER
      ================================================= */}

      <motion.div
        variants={fadeUp}
        whileHover={{
          y: -1,
        }}
        className="mb-6 flex items-start gap-3 rounded-lg border border-[#C58B2A]/25 bg-[#C58B2A]/10 px-5 py-4"
      >
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#C58B2A]" />
        </motion.div>

        <div>
          <p className="text-sm font-semibold text-[#202B33]">
            {t("holidays.peakAlert.title")}
          </p>

          <p className="mt-0.5 text-sm text-[#6B7785]">
            {t("holidays.peakAlert.description")}
          </p>
        </div>
      </motion.div>

      {/* =================================================
          HOLIDAYS TABLE
      ================================================= */}

      <motion.div
        variants={fadeUp}
        className="overflow-hidden rounded-xl border border-[#D9E2EC] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        {/* Table Header */}

        <div className="border-b border-[#D9E2EC] px-6 py-4">
          <h2 className="font-['Manrope'] text-[15px] font-semibold text-[#202B33]">
            {t("holidays.calendarTitle")}
          </h2>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table dir="ltr" className="w-full table-fixed text-left">
            {/* =================================================
                TABLE HEAD
            ================================================= */}

            <thead>
              <tr className="border-b border-[#D9E2EC]">
                <th className="w-[30%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7785]">
                  {t("holidays.table.holidayName")}
                </th>

                <th className="w-[25%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7785]">
                  {t("holidays.table.dateRange")}
                </th>

                <th className="w-[20%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7785]">
                  {t("holidays.table.totalDays")}
                </th>

                <th className="w-[25%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7785]">
                  {t("holidays.table.status")}
                </th>
              </tr>
            </thead>

            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody>
              {holidays.map((holiday, index) => (
                <motion.tr
                  key={holiday.id}
                  variants={rowAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.3 + index * 0.08,
                  }}
                  whileHover={{
                    backgroundColor: "#F8FAFB",
                  }}
                  className={
                    index !== holidays.length - 1
                      ? "border-b border-[#D9E2EC] transition-colors"
                      : "transition-colors"
                  }
                >
                  {/* Holiday Name */}

                  <td
                    dir="auto"
                    className="px-6 py-4 text-left text-sm font-semibold text-[#202B33]"
                  >
                    {holiday.customName ||
                      t(`holidays.items.${holiday.nameKey}.name`)}
                  </td>

                  {/* Date */}

                  <td
                    dir="ltr"
                    className="px-6 py-4 text-left text-sm text-[#486581]"
                  >
                    {holiday.customDateRange || holiday.dateRange}
                  </td>

                  {/* Total Days */}

                  <td
                    dir="auto"
                    className="px-6 py-4 text-left text-sm text-[#6B7785]"
                  >
                    {holiday.customTotalDays ||
                      t(`holidays.${holiday.totalDaysKey}`)}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4 text-left">
                    <motion.span
                      whileHover={{
                        scale: 1.03,
                      }}
                      className="inline-block rounded-full bg-[#3F7D5A]/10 px-3 py-1 text-xs font-medium text-[#3F7D5A]"
                    >
                      {t(`holidays.status.${holiday.statusKey}`)}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* =================================================
          SCHEDULE HOLIDAY MODAL
      ================================================= */}

      <AnimatePresence>
        {isModalOpen && (
          <ScheduleHolidayModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveHoliday}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
