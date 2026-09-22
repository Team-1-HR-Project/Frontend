import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiCalendar } from "react-icons/fi";

const TeamLeaveApprovals = () => {
  const { t, i18n } = useTranslation();

  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Nour Adel",
      initials: "NA",
      role: "softwareEngineer",
      leaveType: "annual",
      startDate: "2026-09-23",
      endDate: "2026-09-25",
      days: 3,
      reason: "familyTrip",
      status: "pending",
    },
    {
      id: 2,
      name: "Omar Fathy",
      initials: "OF",
      role: "backendDeveloper",
      leaveType: "sick",
      startDate: "2026-09-19",
      endDate: "2026-09-19",
      days: 1,
      reason: "medicalAppointment",
      status: "pending",
    },
    {
      id: 3,
      name: "Karim Ashraf",
      initials: "KA",
      role: "backendDeveloper",
      leaveType: "annual",
      startDate: "2026-09-22",
      endDate: "2026-09-27",
      days: 6,
      reason: "personalTime",
      status: "pending",
    },
    {
      id: 4,
      name: "Salma Nabil",
      initials: "SN",
      role: "qaEngineer",
      leaveType: "annual",
      startDate: "2026-09-25",
      endDate: "2026-09-29",
      days: 5,
      reason: "personalTime",
      status: "pending",
    },
    {
      id: 5,
      name: "Salma Nabil",
      initials: "SN",
      role: "frontendDeveloper",
      leaveType: "sick",
      startDate: "2026-09-30",
      endDate: "2026-10-01",
      days: 2,
      reason: "personalAppointment",
      status: "pending",
    },
  ]);

  // ----------------------------------------
  // DATE FORMAT
  // ----------------------------------------

  const formatDate = (date) => {
    return new Intl.DateTimeFormat(
      i18n.language === "ar" ? "ar-EG" : "en-US",
      {
        month: "short",
        day: "numeric",
      }
    ).format(new Date(`${date}T00:00:00`));
  };

  const formatDateRange = (request) => {
    const start = formatDate(request.startDate);

    if (request.startDate === request.endDate) {
      return start;
    }

    return `${start} - ${formatDate(request.endDate)}`;
  };

  // ----------------------------------------
  // APPROVE / DECLINE
  // ----------------------------------------

  const handleDecision = (id, status) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
            }
          : request
      )
    );
  };

  return (
    <div className="w-full">
      {/* ======================================
          PAGE HEADER
      ====================================== */}

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
        className="mb-7"
      >
        {/* Breadcrumb */}

        <div className="mb-3 text-[13px] font-bold uppercase tracking-[1px] text-[#6485a4]">
          {t("managerLeave.breadcrumb")}
        </div>

        {/* Title */}

        <h1
          className="
            text-[28px]
            font-bold
            leading-tight
            text-[#1c364f]
            max-[760px]:text-[24px]
          "
        >
          {t("managerLeave.title")}
        </h1>

        {/* Subtitle */}

        <p className="mt-2 text-[15px] text-[#64809d]">
          {t("managerLeave.subtitle")}
        </p>
      </motion.div>

      {/* ======================================
          MAIN CARD
      ====================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 14,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.08,
        }}
        className="
          overflow-hidden
          rounded-[16px]
          border
          border-[#d6e0e7]
          bg-white
          p-[21px]
          shadow-[0_1px_3px_rgba(28,54,79,0.08)]
        "
      >
        {/* ======================================
            TABLE
        ====================================== */}

        <div className="overflow-x-auto">
          <div className="min-w-[850px]">

            {/* TABLE HEADER */}

            <div
              className="
                grid
                grid-cols-[1.35fr_1fr_1.1fr_.6fr_1.45fr_1.05fr]
                items-center
                gap-4
                rounded-t-[2px]
                bg-[#f3f6f8]
                px-[22px]
                py-[17px]
                text-[11px]
                font-bold
                uppercase
                tracking-[0.4px]
                text-[#7893aa]
              "
            >
              <div>Member</div>

              <div>Leave Type</div>

              <div>Dates</div>

              <div>Days</div>

              <div>Reason</div>

              {/* Actions column has no title */}

              <div></div>
            </div>

            {/* ======================================
                TABLE BODY
            ====================================== */}

            <div>
              <AnimatePresence initial={false}>
                {requests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -15,
                      height: 0,
                      overflow: "hidden",
                    }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.04,
                    }}
                    className="
                      grid
                      grid-cols-[1.35fr_1fr_1.1fr_.6fr_1.45fr_1.05fr]
                      items-center
                      gap-4
                      border-b
                      border-[#e7edf1]
                      px-[22px]
                      py-[18px]
                      text-[13px]
                    "
                  >
                    {/* ==================================
                        MEMBER
                    ================================== */}

                    <div className="flex min-w-0 items-center gap-3">
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                        }}
                        transition={{
                          duration: 0.15,
                        }}
                        className="
                          flex
                          h-[34px]
                          w-[34px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#edf2f5]
                          text-[10px]
                          font-bold
                          text-[#496983]
                        "
                      >
                        {request.initials}
                      </motion.div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            font-bold
                            text-[#17344f]
                          "
                        >
                          {request.name}
                        </p>

                        <p
                          className="
                            mt-[3px]
                            truncate
                            text-[11px]
                            text-[#8aa0b3]
                          "
                        >
                          {t(
                            `managerLeave.roles.${request.role}`
                          )}
                        </p>
                      </div>
                    </div>

                    {/* ==================================
                        LEAVE TYPE
                    ================================== */}

                    <div className="text-[#36536d]">
                      {t(
                        `managerLeave.leaveTypes.${request.leaveType}`
                      )}
                    </div>

                    {/* ==================================
                        DATES
                    ================================== */}

                    <div className="text-[#36536d]">
                      {formatDateRange(request)}
                    </div>

                    {/* ==================================
                        DAYS
                    ================================== */}

                    <div className="text-[#36536d]">
                      {request.days}
                    </div>

                    {/* ==================================
                        REASON
                    ================================== */}

                    <div className="text-[#36536d]">
                      {t(
                        `managerLeave.reasons.${request.reason}`
                      )}
                    </div>

                    {/* ==================================
                        ACTIONS
                    ================================== */}

                    <div>
                      {request.status === "pending" ? (
                        <div className="flex items-center gap-3">
                          {/* APPROVE */}

                          <motion.button
                            type="button"
                            whileHover={{
                              y: -1,
                            }}
                            whileTap={{
                              scale: 0.96,
                            }}
                            onClick={() =>
                              handleDecision(
                                request.id,
                                "approved"
                              )
                            }
                            className="
                              text-[13px]
                              font-medium
                              text-[#15926c]
                              transition-colors
                              hover:text-[#0d7053]
                            "
                          >
                            {t(
                              "managerLeave.actions.approve"
                            )}
                          </motion.button>

                          {/* DECLINE */}

                          <motion.button
                            type="button"
                            whileHover={{
                              y: -1,
                            }}
                            whileTap={{
                              scale: 0.96,
                            }}
                            onClick={() =>
                              handleDecision(
                                request.id,
                                "rejected"
                              )
                            }
                            className="
                              text-[13px]
                              font-medium
                              text-[#e34b50]
                              transition-colors
                              hover:text-[#c7363c]
                            "
                          >
                            {t(
                              "managerLeave.actions.reject"
                            )}
                          </motion.button>
                        </div>
                      ) : (
                        <motion.span
                          initial={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            px-3
                            py-[5px]
                            text-[11px]
                            font-semibold

                            ${
                              request.status ===
                              "approved"
                                ? "bg-[#e8f6f0] text-[#15926c]"
                                : "bg-[#fff0f0] text-[#d74b50]"
                            }
                          `}
                        >
                          {request.status === "approved"
                            ? t("leaves.approved")
                            : t("leaves.rejected")}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {requests.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              min-h-[220px]
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#eef3f6]
                text-[#5f7d98]
              "
            >
              <FiCalendar size={19} />
            </div>

            <h3
              className="
                mt-3
                text-[15px]
                font-bold
                text-[#1c364f]
              "
            >
              {t("managerLeave.empty.title")}
            </h3>

            <p
              className="
                mt-1
                text-[12px]
                text-[#7890a6]
              "
            >
              {t("managerLeave.empty.description")}
            </p>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default TeamLeaveApprovals;