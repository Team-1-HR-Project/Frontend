import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

/* -------------------------------------------------------------------------- */
/*  Animation vocabulary (same as TeamDashboard)                              */
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
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */
// nameKey points at the existing `managerTasks.*` member-name translations
const INITIAL_MEMBERS = [
  { id: "youssef", nameKey: "youssefLotfy", status: "submitted", rating: 4.2 },
  { id: "karim", nameKey: "karimAshraf", status: "inProgress", rating: null },
  { id: "salma", nameKey: "salmaNabil", status: "notStarted", rating: null },
  { id: "omar", nameKey: "omarFathy", status: "notStarted", rating: null },
];

const STATUS_STYLES = {
  submitted: "bg-[#e3f8f1] text-[#147d64]",
  inProgress: "bg-[#fff3c4] text-[#975a16]",
  notStarted: "bg-[#e8f0f7] text-[#486581]",
};

const STATUS_KEYS = {
  submitted: "managerEvaluations.statusSubmitted",
  inProgress: "managerEvaluations.statusInProgress",
  notStarted: "managerEvaluations.statusNotStarted",
};

const MIN_SCORE = 1;
const MAX_SCORE = 5;
const DEFAULT_SCORE = 3;
const THUMB_SIZE = 16;

const formatRating = (value) => (Number.isInteger(value) ? String(value) : value.toFixed(1));

/**
 * Mock AI draft generator (frontend only).
 * Replace the body with the real AI call when the backend is available; keep the
 * signature ({ name, score, t }) => Promise<string>.
 */
const generateEvaluationDraft = ({ name, score, t }) =>
  new Promise((resolve) => {
    const band = score >= 4 ? "High" : score === 3 ? "Mid" : "Low";
    setTimeout(() => resolve(t(`managerEvaluations.draft${band}`, { name })), 900);
  });

const SparklesIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Evaluate Employee modal (part of the Team Evaluations page)               */
/* -------------------------------------------------------------------------- */
const EvaluateEmployeeModal = ({ member, onClose, onSave }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const [score, setScore] = useState(DEFAULT_SCORE);
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Esc to close + lock background scroll while open
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const firstName = member.name.trim().split(/\s+/)[0];
      const draft = await generateEvaluationDraft({ name: firstName, score, t });
      if (isMounted.current) setFeedback(draft); // remains fully editable
    } finally {
      if (isMounted.current) setIsGenerating(false);
    }
  };

  const handleSave = () => onSave({ id: member.id, score, feedback: feedback.trim() });

  // Slider track: filled up to thumb center, dark for the rest (flips in RTL)
  const fraction = (score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE);
  const stop = `calc(${THUMB_SIZE / 2}px + ${fraction} * (100% - ${THUMB_SIZE}px))`;
  const trackBackground = `linear-gradient(${isRtl ? "to left" : "to right"}, #99c8ff ${stop}, #3b3b3b ${stop})`;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#243b53]/[0.66] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="evaluate-employee-title"
        className="w-full max-w-[576px] rounded-3xl bg-white p-[27px] shadow-[0_24px_60px_rgba(15,30,50,0.28)]"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Title row */}
        <div className="flex items-center justify-between">
          <h2
            id="evaluate-employee-title"
            className="text-[22px] font-bold leading-8 text-[#243b53]"
          >
            {t("managerEvaluations.evaluateEmployee")}
            <span className="sr-only"> — {member.name}</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("common.close")}
            className="-m-1 flex items-center justify-center p-1 text-[#243b53] transition hover:text-[#486581]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Overall score */}
        <label
          htmlFor="overall-score"
          className="mt-[23px] block text-sm font-bold text-[#243b53]"
        >
          {t("managerEvaluations.overallScore", { score })}
        </label>

        <div className="relative mt-4 h-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full"
            style={{ background: trackBackground }}
          />
          <input
            id="overall-score"
            type="range"
            min={MIN_SCORE}
            max={MAX_SCORE}
            step={1}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="relative m-0 h-4 w-full cursor-pointer appearance-none bg-transparent focus:outline-none
              [&::-webkit-slider-runnable-track]:bg-transparent
              [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-[#99c8ff]
              [&::-moz-range-track]:bg-transparent
              [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#99c8ff]"
          />
        </div>

        {/* Generate with AI */}
        <motion.button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          aria-busy={isGenerating}
          whileHover={isGenerating ? undefined : { scale: 1.01 }}
          whileTap={isGenerating ? undefined : { scale: 0.99 }}
          className="mt-[29px] flex h-[47px] w-full items-center justify-center gap-2 rounded-xl border border-[#bcccdc] bg-white text-base text-[#486581] transition-colors hover:bg-[#f5f7f8] disabled:cursor-wait disabled:opacity-70"
        >
          <SparklesIcon className={`h-[18px] w-[18px] ${isGenerating ? "animate-pulse" : ""}`} />
          {t("managerEvaluations.generateDraft")}
        </motion.button>

        {/* Qualitative feedback: AI draft lands here, always editable / can be typed manually */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={t("managerEvaluations.feedbackPlaceholder")}
          aria-label={t("managerEvaluations.feedbackPlaceholder")}
          autoFocus
          className="mt-6 block h-[126px] w-full resize-y rounded-xl border border-white bg-white px-[14px] py-3 text-base leading-[27px] text-[#243b53] placeholder:text-[#243b53]/50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#486581]"
        />

        {/* Save */}
        <motion.button
          type="button"
          onClick={handleSave}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mt-[29px] h-[54px] w-full rounded-xl bg-[#243b53] text-base text-white transition-colors hover:bg-[#1c2f42]"
        >
          {t("managerEvaluations.saveEvaluation")}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Team Evaluations page                                                     */
/* -------------------------------------------------------------------------- */
const TeamEvaluations = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [evaluatingId, setEvaluatingId] = useState(null);
  const [toast, setToast] = useState(null); // timestamp id of the visible toast, or null

  // Auto-dismiss the toast (restarts if a new one is triggered)
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const getName = useCallback((nameKey) => t(`managerTasks.${nameKey}`), [t]);
  const closeModal = useCallback(() => setEvaluatingId(null), []);

  const handleSave = useCallback(({ id, score }) => {
    // TODO: persist score + feedback through the real API when available
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "submitted", rating: score } : m)),
    );
    setEvaluatingId(null);
    setToast(Date.now());
  }, []);

  const evaluating = members.find((m) => m.id === evaluatingId);

  const thClass =
    "px-[22px] py-[18px] text-xs font-bold uppercase tracking-wider text-[#829ab1] text-left rtl:text-right";

  return (
    <>
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
            {t("portal.managerPortal")} / {t("portal.teamEvaluations")}
          </p>
          <h1 className="mt-[11px] text-[28px] font-bold leading-[1.2] text-[#243b53]">
            {t("portal.teamEvaluations")}
          </h1>
          <p className="mt-[3px] text-[15px] text-[#627d98]">{t("managerDashboard.subtitle")}</p>
        </motion.div>

        {/* Active Evaluation Cycle */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-end justify-between rounded-[20px] border border-[#d9e2ec] border-l-[3px] border-l-[#2f855a] bg-white p-6 shadow-[0_2px_6px_rgba(36,59,83,0.08)] rtl:border-l rtl:border-l-[#d9e2ec] rtl:border-r-[3px] rtl:border-r-[#2f855a]"
        >
          <div>
            <p className="text-xs font-bold uppercase leading-[18px] tracking-wider text-[#147d64]">
              {t("managerEvaluations.activeCycle")}
            </p>
            <h2 className="mt-1.5 text-[22px] font-bold leading-8 text-[#243b53]">
              {t("managerEvaluations.cycleName")}
            </h2>
          </div>
          <span className="rounded-full bg-[#e3f8f1] px-3 py-1 text-[13px] font-bold leading-[18px] text-[#147d64]">
            {t("managerEvaluations.closesIn", { days: 12 })}
          </span>
        </motion.div>

        {/* Team table */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
          className="rounded-[20px] border border-[#d9e2ec] bg-white p-6 shadow-[0_2px_6px_rgba(36,59,83,0.08)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "18%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "19%" }} />
                <col style={{ width: "17%" }} />
                <col style={{ width: "24%" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-[#e6eef3] bg-[#f5f7f8]">
                  <th className={thClass}>{t("managerEvaluations.colTeamMember")}</th>
                  <th className={thClass}>{t("managerEvaluations.colRole")}</th>
                  <th className={thClass}>{t("managerEvaluations.colReviewStatus")}</th>
                  <th className={thClass}>{t("managerEvaluations.colLastRating")}</th>
                  <th className={thClass}>
                    <span className="sr-only">{t("common.actions")}</span>
                  </th>
                </tr>
              </thead>

              <motion.tbody variants={staggerContainer}>
                {members.map((member) => (
                  <motion.tr
                    key={member.id}
                    variants={fadeUp}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="border-b border-[#e6eef3] last:border-b-0"
                  >
                    <td className="px-[22px] py-4 text-left align-middle text-[15px] font-bold text-[#243b53] rtl:text-right">
                      {getName(member.nameKey)}
                    </td>
                    <td className="px-[22px] py-4 text-left align-middle text-[15px] text-[#627d98] rtl:text-right">
                      {t("managerEvaluations.roleSoftwareEngineer")}
                    </td>
                    <td className="px-[22px] py-4 text-left align-middle rtl:text-right">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[13px] font-bold leading-[18px] ${STATUS_STYLES[member.status]}`}
                      >
                        {t(STATUS_KEYS[member.status])}
                      </span>
                    </td>
                    <td className="px-[22px] py-4 text-left align-middle text-[15px] text-[#243b53] rtl:text-right">
                      {member.rating == null ? (
                        "—"
                      ) : (
                        <span dir="ltr">{formatRating(member.rating)} / 5</span>
                      )}
                    </td>
                    <td className="px-[22px] py-4 text-left align-middle rtl:text-right">
                      <button
                        type="button"
                        onClick={() => setEvaluatingId(member.id)}
                        className="text-[15px] text-[#147d64] transition hover:underline"
                      >
                        + {t("managerEvaluations.evaluateEmployee")}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Portaled to <body> so the page's animated transform can't trap `position: fixed` */}
      {createPortal(
        <>
          <AnimatePresence>
            {evaluating && (
              <EvaluateEmployeeModal
                key={evaluating.id}
                member={{ id: evaluating.id, name: getName(evaluating.nameKey) }}
                onClose={closeModal}
                onSave={handleSave}
              />
            )}
          </AnimatePresence>

          {/* Toast: bottom-right, subtle */}
          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed bottom-6 right-6 z-[110] max-w-[calc(100vw-3rem)] rounded-xl bg-[#243b53] px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(36,59,83,0.25)]"
              >
                {t("managerEvaluations.toastSaved")}
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        document.body,
      )}
    </>
  );
};

export default TeamEvaluations;