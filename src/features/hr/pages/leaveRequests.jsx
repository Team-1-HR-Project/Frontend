import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiDownload,
  FiCheck,
  FiFileText,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";

const initialRequests = [
  {
    id: 1,
    nameKey: "leaveRequests.requestsEmployees.mariam.name",
    roleKey: "leaveRequests.requestsEmployees.mariam.role",
    departmentKey: "leaveRequests.requestsEmployees.mariam.department",
    category: "annual",
    datesKey: "leaveRequests.requestsEmployees.mariam.dates",
    balanceKey: "leaveRequests.requestsEmployees.mariam.balance",
  },
  {
    id: 2,
    nameKey: "leaveRequests.requestsEmployees.omar.name",
    roleKey: "leaveRequests.requestsEmployees.omar.role",
    departmentKey: "leaveRequests.requestsEmployees.omar.department",
    category: "emergency",
    datesKey: "leaveRequests.requestsEmployees.omar.dates",
    balanceKey: "leaveRequests.requestsEmployees.omar.balance",
  },
  {
    id: 3,
    nameKey: "leaveRequests.requestsEmployees.nour.name",
    roleKey: "leaveRequests.requestsEmployees.nour.role",
    departmentKey: "leaveRequests.requestsEmployees.nour.department",
    category: "medical",
    datesKey: "leaveRequests.requestsEmployees.nour.dates",
    balanceKey: "leaveRequests.requestsEmployees.nour.balance",
  },
];

const categoryStyles = {
  annual: "bg-[#e9f1f8] text-[#3c6285]",
  emergency: "bg-[#fff4d9] text-[#a66a00]",
  medical: "bg-[#fde9e9] text-[#c84242]",
};

const LeaveRequests = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language?.toLowerCase().startsWith("ar");

  const [requests, setRequests] = useState(initialRequests);

  const [approvedCount, setApprovedCount] = useState(12);
  const [rejectedCount, setRejectedCount] = useState(2);

  const [activeAction, setActiveAction] = useState(null);

  const [rejectModal, setRejectModal] = useState({
    open: false,
    request: null,
  });

  const [rejectNote, setRejectNote] = useState("");
  const [message, setMessage] = useState(null);

  /*
   * Update document language and direction
   */
  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  /*
   * Translate request data without storing translated values in state.
   * This avoids setState inside useEffect.
   */
  const translatedRequests = useMemo(() => {
    return requests.map((request) => ({
      ...request,
      name: t(request.nameKey),
      role: t(request.roleKey),
      department: t(request.departmentKey),
      dates: t(request.datesKey),
      balance: t(request.balanceKey),
    }));
  }, [requests, i18n.language, t]);

  /*
   * Show temporary message
   */
  const showMessage = (type, text) => {
    setMessage({
      type,
      text,
    });

    setTimeout(() => {
      setMessage(null);
    }, 2500);
  };

  /*
   * Approve request
   */
  const handleApprove = (request) => {
    setActiveAction(`approve-${request.id}`);

    setTimeout(() => {
      setRequests((prev) => prev.filter((item) => item.id !== request.id));

      setApprovedCount((prev) => prev + 1);

      setActiveAction(null);

      showMessage(
        "success",
        isArabic
          ? `تمت الموافقة على طلب ${request.name}`
          : `${request.name}'s leave request has been approved.`,
      );
    }, 500);
  };

  /*
   * Open reject modal
   */
  const handleRejectClick = (request) => {
    setRejectModal({
      open: true,
      request,
    });

    setRejectNote("");
  };

  /*
   * Close reject modal
   */
  const closeRejectModal = () => {
    setRejectModal({
      open: false,
      request: null,
    });

    setRejectNote("");
  };

  /*
   * Confirm reject
   */
  const handleConfirmReject = () => {
    if (!rejectModal.request || !rejectNote.trim()) {
      return;
    }

    const request = rejectModal.request;

    setActiveAction(`reject-${request.id}`);

    setTimeout(() => {
      setRequests((prev) => prev.filter((item) => item.id !== request.id));

      setRejectedCount((prev) => prev + 1);

      setActiveAction(null);

      setRejectModal({
        open: false,
        request: null,
      });

      setRejectNote("");

      showMessage(
        "error",
        isArabic
          ? `تم رفض طلب ${request.name}`
          : `${request.name}'s leave request has been rejected.`,
      );
    }, 500);
  };

  /*
   * Export queue as CSV
   */
  const handleExport = () => {
    const headers = [
      t("leaveRequests.table.employee"),
      t("leaveRequests.table.roleDepartment"),
      t("leaveRequests.table.category"),
      t("leaveRequests.table.duration"),
      t("leaveRequests.table.balance"),
    ];

    const rows = translatedRequests.map((request) => [
      request.name,
      `${request.role} - ${request.department}`,
      t(`leaveRequests.categories.${request.category}`),
      request.dates,
      request.balance,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "leave-requests.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showMessage(
      "success",
      isArabic
        ? "تم تصدير قائمة الطلبات بنجاح"
        : "Leave requests exported successfully.",
    );
  };

  const pendingCount = requests.length;

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full min-w-0 overflow-x-hidden text-[#12395c]"
    >
      {/* Toast */}
      {message && (
        <div
          className={`fixed right-5 top-5 z-100 flex max-w-90 items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg ${
            message.type === "success"
              ? "border-[#cce7d8] text-[#32734e]"
              : "border-[#f0cccc] text-[#bd3e3e]"
          }`}
        >
          {message.type === "success" ? (
            <FiCheck size={18} />
          ) : (
            <FiAlertCircle size={18} />
          )}

          <span className="text-sm font-semibold">{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-7 flex w-full items-start justify-between gap-5">
        <div className="min-w-0">
          <h1 className="text-[30px] font-bold leading-tight tracking-[-0.4px] text-[#12395c]">
            {t("leaveRequests.title")}
          </h1>

          <p className="mt-2 text-[16px] leading-6 text-[#5d82a4]">
            {t("leaveRequests.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="group flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#d4e0ea] bg-white px-5 text-[14px] font-bold text-[#355d80] shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-[#b9ccdc] hover:bg-[#f8fbfd] hover:shadow-md active:translate-y-0"
        >
          <FiDownload
            size={17}
            className="transition-transform duration-200 group-hover:translate-y-0.5"
          />

          {t("leaveRequests.export")}
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#fff4d9] px-4 py-2 text-[13px] font-bold text-[#a66a00]">
          {isArabic
            ? `${pendingCount} طلبات قيد المراجعة`
            : `${pendingCount} Pending Reviews`}
        </span>

        <span className="rounded-full bg-[#e5f5ed] px-4 py-2 text-[13px] font-bold text-[#26734d]">
          {isArabic
            ? `${approvedCount} تمت الموافقة هذا الشهر`
            : `${approvedCount} Approved this Month`}
        </span>

        <span className="rounded-full bg-[#fde8e8] px-4 py-2 text-[13px] font-bold text-[#c13c3c]">
          {isArabic ? `${rejectedCount} مرفوضة` : `${rejectedCount} Rejected`}
        </span>
      </div>

      {/* Main card */}
      <div className="w-full overflow-hidden rounded-2xl border border-[#d5e0e9] bg-white shadow-[0_2px_8px_rgba(31,61,89,0.05)]">
        {/* Card header */}
        <div className="border-b border-[#e5ebf0] px-6 py-5">
          <h2 className="text-[19px] font-bold text-[#12395c]">
            {t("leaveRequests.queue")}
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden w-full lg:block">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[13%]" />
              <col className="w-[17%]" />
              <col className="w-[10%]" />
              <col className="w-[16%]" />
              <col className="w-[10%]" />
              <col className="w-[13%]" />
              <col className="w-[21%]" />
            </colgroup>

            <thead>
              <tr className="bg-[#f7f9fb]">
                <th className="px-5 py-4 text-left text-[12px] font-bold uppercase tracking-[0.4px] text-[#7190aa] rtl:text-right">
                  {t("leaveRequests.table.employee")}
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-[0.4px] text-[#7190aa] rtl:text-right">
                  {t("leaveRequests.table.roleDepartment")}
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-[0.4px] text-[#7190aa] rtl:text-right">
                  {t("leaveRequests.table.category")}
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-[0.4px] text-[#7190aa] rtl:text-right">
                  {t("leaveRequests.table.duration")}
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-[0.4px] text-[#7190aa] rtl:text-right">
                  {t("leaveRequests.table.balance")}
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-[0.4px] text-[#7190aa] rtl:text-right">
                  {t("leaveRequests.table.reason")}
                </th>

                <th className="px-4 py-4 text-left text-[12px] font-bold uppercase tracking-[0.4px] text-[#7190aa] rtl:text-right">
                  {t("leaveRequests.table.actions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf4f8] text-[#5c819f]">
                        <FiCheck size={22} />
                      </div>

                      <p className="text-[16px] font-bold text-[#12395c]">
                        {isArabic
                          ? "لا توجد طلبات معلقة"
                          : "No pending requests"}
                      </p>

                      <p className="mt-1 text-[14px] text-[#7893aa]">
                        {isArabic
                          ? "تمت مراجعة جميع طلبات الإجازات."
                          : "All leave requests have been reviewed."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                translatedRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-t border-[#e5ebf0] transition-colors hover:bg-[#fbfcfd]"
                  >
                    {/* Employee */}
                    <td className="px-5 py-6 align-middle">
                      <span className="block truncate text-[16px] font-bold text-[#12395c]">
                        {request.name}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-6 align-middle">
                      <div className="truncate text-[15px] text-[#5680a5]">
                        {request.role}
                      </div>

                      <div className="mt-1 truncate text-[13px] text-[#7896af]">
                        {request.department}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-6 align-middle">
                      <span
                        className={`inline-flex max-w-full rounded-full px-3.5 py-1.5 text-[12px] font-bold ${
                          categoryStyles[request.category]
                        }`}
                      >
                        {t(`leaveRequests.categories.${request.category}`)}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-6 align-middle">
                      <span className="block truncate text-[14px] text-[#5680a5]">
                        {request.dates}
                      </span>
                    </td>

                    {/* Balance */}
                    <td className="px-4 py-6 align-middle">
                      <span className="block truncate text-[14px] text-[#5680a5]">
                        {request.balance}
                      </span>
                    </td>

                    {/* Reason */}
                    <td className="px-4 py-6 align-middle">
                      <button
                        type="button"
                        className="flex max-w-full items-center gap-1.5 text-[13px] font-bold text-[#315d80] underline underline-offset-2 transition-colors hover:text-[#12395c] active:text-[#0c2b45]"
                      >
                        <FiFileText className="shrink-0" size={15} />

                        <span className="truncate">
                          {t("leaveRequests.viewReason")}
                        </span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-6 align-middle">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={activeAction !== null}
                          onClick={() => handleApprove(request)}
                          className="flex h-10 min-w-22.5 items-center justify-center gap-1.5 rounded-xl bg-[#e7f4ed] px-3 text-[13px] font-bold text-[#367a55] transition-all duration-200 hover:bg-[#d6eddf] hover:shadow-sm active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {activeAction === `approve-${request.id}` ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#367a55] border-t-transparent" />
                          ) : (
                            <>
                              <FiCheck size={15} />

                              {t("leaveRequests.approve")}
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          disabled={activeAction !== null}
                          onClick={() => handleRejectClick(request)}
                          className="flex h-10 items-center justify-center rounded-xl bg-[#fce8e8] px-3 text-[13px] font-bold text-[#bd3e3e] transition-all duration-200 hover:bg-[#f8dcdc] hover:shadow-sm active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {t("leaveRequests.reject")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet */}
        <div className="divide-y divide-[#e5ebf0] lg:hidden">
          {requests.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf4f8] text-[#5c819f]">
                <FiCheck size={22} />
              </div>

              <p className="mt-3 text-[16px] font-bold text-[#12395c]">
                {isArabic ? "لا توجد طلبات معلقة" : "No pending requests"}
              </p>

              <p className="mt-1 text-[14px] text-[#7893aa]">
                {isArabic
                  ? "تمت مراجعة جميع طلبات الإجازات."
                  : "All leave requests have been reviewed."}
              </p>
            </div>
          ) : (
            translatedRequests.map((request) => (
              <div
                key={request.id}
                className="p-5 transition-colors hover:bg-[#fbfcfd]"
              >
                {/* Employee */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px] font-bold text-[#12395c]">
                      {request.name}
                    </h3>

                    <p className="mt-1 truncate text-[14px] text-[#5680a5]">
                      {request.role}
                    </p>

                    <p className="mt-1 truncate text-[13px] text-[#7896af]">
                      {request.department}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-bold ${
                      categoryStyles[request.category]
                    }`}
                  >
                    {t(`leaveRequests.categories.${request.category}`)}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#f8fafc] p-3">
                    <p className="text-[10px] font-bold uppercase text-[#8aa0b4]">
                      {t("leaveRequests.table.duration")}
                    </p>

                    <p className="mt-1 text-[13px] text-[#5680a5]">
                      {request.dates}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f8fafc] p-3">
                    <p className="text-[10px] font-bold uppercase text-[#8aa0b4]">
                      {t("leaveRequests.table.balance")}
                    </p>

                    <p className="mt-1 text-[13px] text-[#5680a5]">
                      {request.balance}
                    </p>
                  </div>
                </div>

                {/* Reason */}
                <button
                  type="button"
                  className="mt-4 flex items-center gap-2 text-[14px] font-bold text-[#315d80] underline underline-offset-2"
                >
                  <FiFileText size={16} />

                  {t("leaveRequests.viewReason")}
                </button>

                {/* Buttons */}
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    disabled={activeAction !== null}
                    onClick={() => handleApprove(request)}
                    className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#e7f4ed] px-4 text-[13px] font-bold text-[#367a55] transition-all hover:bg-[#d6eddf] active:scale-[0.98] disabled:opacity-60"
                  >
                    {activeAction === `approve-${request.id}` ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#367a55] border-t-transparent" />
                    ) : (
                      <>
                        <FiCheck size={15} />

                        {t("leaveRequests.approve")}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={activeAction !== null}
                    onClick={() => handleRejectClick(request)}
                    className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#fce8e8] px-4 text-[13px] font-bold text-[#bd3e3e] transition-all hover:bg-[#f8dcdc] active:scale-[0.98] disabled:opacity-60"
                  >
                    {t("leaveRequests.reject")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal.open && rejectModal.request && (
        <div
          className="fixed inset-0 z-90 flex items-center justify-center bg-[#12395c]/30 px-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeRejectModal();
            }
          }}
        >
          <div
            className="w-full max-w-115 rounded-2xl border border-[#d9e3eb] bg-white p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-leave-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="reject-leave-title"
                  className="text-[20px] font-bold text-[#12395c]"
                >
                  {isArabic ? "رفض طلب الإجازة" : "Reject Leave Request"}
                </h3>

                <p className="mt-1 text-[14px] text-[#6f8ba4]">
                  {rejectModal.request.name}
                </p>
              </div>

              <button
                type="button"
                onClick={closeRejectModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6d879d] transition hover:bg-[#f3f6f8] hover:text-[#12395c]"
                aria-label={isArabic ? "إغلاق" : "Close"}
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-[13px] font-bold text-[#355d80]">
                {isArabic ? "سبب الرفض" : "Rejection note"}
              </label>

              <textarea
                value={rejectNote}
                onChange={(event) => setRejectNote(event.target.value)}
                rows={4}
                placeholder={
                  isArabic
                    ? "اكتبي سبب رفض الطلب..."
                    : "Add a note for the employee..."
                }
                className="w-full resize-none rounded-xl border border-[#d6e1e9] bg-[#fbfcfd] px-4 py-3 text-[14px] text-[#12395c] outline-none transition focus:border-[#6f96b4] focus:bg-white focus:ring-2 focus:ring-[#dce9f2]"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeRejectModal}
                className="h-10 rounded-xl border border-[#d5e0e8] bg-white px-5 text-[13px] font-bold text-[#52718c] transition hover:bg-[#f7f9fb] active:scale-[0.98]"
              >
                {t("common.cancel")}
              </button>

              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={!rejectNote.trim() || activeAction !== null}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#bd3e3e] px-5 text-[13px] font-bold text-white transition hover:bg-[#a93232] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {activeAction === `reject-${rejectModal.request.id}` ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  t("leaveRequests.reject")
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
