import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

/* -------------------------------------------------------------------------- */
/*  Animation vocabulary (same as the other Manager pages)                    */
/* -------------------------------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* -------------------------------------------------------------------------- */
/*  Data (leadKey points at the existing `managerTasks.*` member names)       */
/* -------------------------------------------------------------------------- */
const GOALS = [
  {
    id: "crashFree",
    status: "onTrack",
    progress: 78,
    titleKey: "goalCrashFreeTitle",
    leadKey: "karimAshraf",
    items: [
      { id: "android", labelKey: "itemAndroidCrash", done: true },
      { id: "ios", labelKey: "itemIosCrash", done: true },
    ],
  },
  {
    id: "apiLatency",
    status: "atRisk",
    progress: 54,
    titleKey: "goalApiLatencyTitle",
    leadKey: "youssefLotfy",
    items: [
      { id: "profile", labelKey: "itemProfileEndpoints", done: true },
      { id: "caching", labelKey: "itemShipCaching", done: false },
    ],
  },
];

const STATUS_STYLES = {
  onTrack: {
    labelKey: "managerGoals.statusOnTrack",
    badge: "bg-[#e3f8f1] text-[#147d64]",
    percent: "text-[#147d64]",
    bar: "bg-[#2f855a]",
  },
  atRisk: {
    labelKey: "managerGoals.statusAtRisk",
    badge: "bg-[#fff3c4] text-[#975a16]",
    percent: "text-[#d69e2e]",
    bar: "bg-[#d69e2e]",
  },
};

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */
const TeamGoals = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="w-full space-y-6"
    >
      {/* Page Header */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pb-2"
      >
        <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#6b879f]">
          {t("portal.managerPortal")} / {t("portal.teamGoalsOkrs")}
        </p>
        <h1 className="mt-[11px] text-[28px] font-bold leading-[1.2] text-[#243b53]">
          {t("portal.teamGoalsOkrs")}
        </h1>
        <p className="mt-[3px] text-[15px] text-[#627d98]">{t("managerDashboard.subtitle")}</p>
      </motion.div>

      {/* Goal cards */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {GOALS.map((goal, index) => {
          const styles = STATUS_STYLES[goal.status];
          const title = t(`managerGoals.${goal.titleKey}`);

          return (
            <motion.article
              key={goal.id}
              variants={fadeUp}
              transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
              className="rounded-[20px] border border-[#d9e2ec] bg-white p-6 pb-[22px] shadow-[0_2px_6px_rgba(36,59,83,0.08)]"
            >
              {/* Status + percentage */}
              <div className="flex items-start justify-between">
                <span
                  className={`inline-flex rounded-full px-[11px] py-[3px] text-xs font-bold leading-[17px] ${styles.badge}`}
                >
                  {t(styles.labelKey)}
                </span>
                <span dir="ltr" className={`text-[15px] font-bold leading-[18px] ${styles.percent}`}>
                  {goal.progress}%
                </span>
              </div>

              {/* Title + lead */}
              <h2 className="mt-[23px] text-[19px] font-bold leading-7 text-[#243b53]">{title}</h2>
              <p className="mt-1.5 text-[15px] text-[#627d98]">
                {t("managerGoals.lead", { name: t(`managerTasks.${goal.leadKey}`) })}
              </p>

              {/* Progress bar */}
              <div
                role="progressbar"
                aria-label={title}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={goal.progress}
                className="mt-[23px] h-[9px] w-full overflow-hidden rounded-full bg-[#e6eef3]"
              >
                <motion.div
                  className={`h-full rounded-full ${styles.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 + index * 0.05 }}
                />
              </div>

              {/* Key results */}
              <motion.ul
                variants={staggerContainer}
                className="mt-[21.5px] flex flex-col gap-[13px]"
              >
                {goal.items.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={fadeUp}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-start gap-2 text-[15px] text-[#243b53]"
                  >
                    <span className="mt-[5px] flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                      {item.done ? (
                        <FiCheck className="h-[18px] w-[18px] text-[#2f855a]" aria-hidden="true" />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="block h-[18px] w-[18px] rounded-full border-2 border-[#d69e2e]"
                        />
                      )}
                    </span>
                    <span>{t(`managerGoals.${item.labelKey}`)}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default TeamGoals;