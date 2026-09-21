import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiX, FiFileText } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// `queueId` matches the Dashboard "Pending action queue" item ids.
// `details` is merged in when a collapsed submission is opened from the Dashboard.
const SUBMISSIONS_SEED = [
  {
    id: 1,
    queueId: "oauth2Flow",
    titleKey: "submissionOauth2Title",
    submitterKey: "youssefLotfy",
    dateKey: "dateSep16",
    notesKey: "submissionOauth2Notes",
    files: ["oauth-service.ts", "auth.test.ts"],
    expanded: true,
  },
  {
    id: 2,
    queueId: "releaseNotes",
    titleKey: "submissionQ3ReleaseNotesTitle",
    submitterKey: "salmaNabil",
    attachmentsCount: 2,
    expanded: false,
    details: {
      dateKey: "dateSep15",
      notesKey: "submissionQ3ReleaseNotesNotes",
      files: ["release-notes-q3.md", "changelog.md"],
    },
  },
  {
    id: 3,
    queueId: "paymentTests",
    titleKey: "submissionPaymentTestsTitle",
    submitterKey: "karimAshraf",
    attachmentsCount: 2,
    expanded: false,
    details: {
      dateKey: "dateSep17",
      notesKey: "submissionPaymentTestsNotes",
      files: ["payment.test.ts", "test-report.pdf"],
    },
  },
];

// Show a submission's full details (notes, files, review actions)
const expandSubmission = (submission) => ({
  ...submission,
  ...submission.details,
  attachmentsCount: undefined,
  expanded: true,
});

const SubmissionReviews = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Submission chosen on the Dashboard (via router state), if any
  const selectedQueueId = location.state?.submissionQueueId ?? null;
  const selectedSubmission = SUBMISSIONS_SEED.find((s) => s.queueId === selectedQueueId);

  const [submissions, setSubmissions] = useState(() =>
    SUBMISSIONS_SEED.map((s) => (s.id === selectedSubmission?.id ? expandSubmission(s) : s)),
  );
  const [highlightId, setHighlightId] = useState(selectedSubmission?.id ?? null);
  const [changeModalSubmissionId, setChangeModalSubmissionId] = useState(null);
  const [changeText, setChangeText] = useState("");

  // Consume the router state once, scroll the selected submission into view, fade the highlight
  useEffect(() => {
    if (!selectedSubmission) return undefined;
    navigate(location.pathname, { replace: true, state: null });
    const scrollTimer = setTimeout(() => {
      document
        .getElementById(`submission-${selectedSubmission.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 350);
    const highlightTimer = setTimeout(() => setHighlightId(null), 2500);
    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(highlightTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message) => {
    toast.custom(
      (toastItem) => (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={
            toastItem.visible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 12, scale: 0.96 }
          }
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-[#243B53] text-white text-sm font-semibold px-4 py-3 rounded-lg shadow-lg"
        >
          {message}
        </motion.div>
      ),
      { position: "bottom-right" },
    );
  };

  const handleApprove = (id) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    showToast(
      t("managerSubmissions.toastApproved", "Submission approved and task completed"),
    );
  };

  const handleReject = (id) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    showToast(t("managerSubmissions.toastRejected", "Submission rejected"));
  };

  const handleOpenChangeModal = (id) => {
    setChangeModalSubmissionId(id);
    setChangeText("");
  };

  const handleCloseChangeModal = () => {
    setChangeModalSubmissionId(null);
    setChangeText("");
  };

  const handleSendChangeRequest = () => {
    handleCloseChangeModal();
  };

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-[28px] font-bold text-[#1e293b] tracking-tight">
          {t("managerSubmissions.title", "Submission Reviews")}
        </h1>
        <p className="text-sm text-[#64748b] mt-1 font-normal">
          {t(
            "managerSubmissions.subtitle",
            "Keep your team aligned, supported, and moving forward.",
          )}
        </p>
      </div>

      {/* Submission Cards */}
      <motion.div initial="hidden" animate="visible" variants={listStagger} className="space-y-5">
        <AnimatePresence>
          {submissions.map((submission) => (
            <motion.div
              key={submission.id}
              id={`submission-${submission.id}`}
              variants={cardVariants}
              exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`bg-white rounded-2xl p-6 border border-[#e2e8f0]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between gap-4 transition-shadow duration-500 ${highlightId === submission.id ? "ring-2 ring-[#243B53]/25" : ""
                }`}
            >
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center rounded-full bg-[#fef9c3] px-3 py-1 text-xs font-bold text-[#a16207]">
                  {t("managerSubmissions.reviewPending", "Review Pending")}
                </span>

                <h3 className="text-lg font-bold text-[#1e293b] mt-3">
                  {t(`managerSubmissions.${submission.titleKey}`)}
                </h3>

                <p className="text-sm text-[#64748b] mt-1">
                  {t("managerSubmissions.submittedBy", "Submitted by")}{" "}
                  <span className="font-semibold text-[#334155]">
                    {t(`managerSubmissions.${submission.submitterKey}`)}
                  </span>
                  {submission.dateKey && (
                    <>
                      {" "}
                      · {t(`managerSubmissions.${submission.dateKey}`)}
                    </>
                  )}
                  {submission.attachmentsCount && (
                    <>
                      {" "}
                      ·{" "}
                      {t("managerSubmissions.attachmentsCount", {
                        count: submission.attachmentsCount,
                        defaultValue: `${submission.attachmentsCount} attachments`,
                      })}
                    </>
                  )}
                </p>

                {submission.expanded && submission.notesKey && (
                  <p className="text-sm text-[#334155] mt-4">
                    <span className="font-bold">
                      {t("managerSubmissions.submitterNotes", "Submitter notes:")}
                    </span>{" "}
                    {t(`managerSubmissions.${submission.notesKey}`)}
                  </p>
                )}

                {submission.expanded && submission.files && (
                  <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                    {submission.files.map((file) => (
                      <span
                        key={file}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1.5 text-xs font-semibold text-[#334155]"
                      >
                        <FiFileText className="w-3.5 h-3.5" />
                        {file}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {submission.expanded && (
                <div className="flex flex-col items-stretch gap-2.5 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleApprove(submission.id)}
                    className="rounded-lg bg-[#1f7a52] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#186142] transition"
                  >
                    {t("managerSubmissions.approveComplete", "Approve & Complete")}
                  </motion.button>
                  <div className="flex items-center gap-2.5">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleOpenChangeModal(submission.id)}
                      className="rounded-lg bg-[#d3922a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#bb7f21] transition"
                    >
                      {t("managerSubmissions.requestChanges", "Request Changes")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleReject(submission.id)}
                      className="rounded-lg bg-[#b3413a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9c352e] transition"
                    >
                      {t("managerSubmissions.reject", "Reject")}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Request Changes Modal */}
      <AnimatePresence>
        {changeModalSubmissionId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-[#1e293b]">
                  {t("managerSubmissions.requestChanges", "Request Changes")}
                </h3>
                <button
                  type="button"
                  onClick={handleCloseChangeModal}
                  className="text-[#94a3b8] hover:text-[#1e293b] transition"
                  aria-label="Close"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={changeText}
                onChange={(e) => setChangeText(e.target.value)}
                placeholder={t(
                  "managerSubmissions.changePlaceholder",
                  "Explain what needs to change...",
                )}
                rows={4}
                className="w-full rounded-lg border border-[#e2e8f0] px-3.5 py-2.5 text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#486581]/30 resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSendChangeRequest}
                className="mt-5 w-full rounded-lg bg-[#d3922a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#bb7f21] transition"
              >
                {t("managerSubmissions.sendChangeRequest", "Send Change Request")}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmissionReviews;