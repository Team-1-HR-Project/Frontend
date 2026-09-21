import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const TeamAttendance = () => {
  const { t } = useTranslation();

  const [attendance, setAttendance] = useState([
    {
      id: 1,
      name: "Youssef Lotfy",
      shift: "09:00 - 17:00",
      checkIn: "08:51",
      delay: 0,
      verification: "GPS",
      waiver: false,
    },
    {
      id: 2,
      name: "Karim Ashraf",
      shift: "09:00 - 17:00",
      checkIn: "09:12",
      delay: 12,
      verification: "Biometric",
      waiver: false,
    },
    {
      id: 3,
      name: "Salma Nabil",
      shift: "09:00 - 17:00",
      checkIn: "08:53",
      delay: 0,
      verification: "GPS",
      waiver: false,
    },
    {
      id: 4,
      name: "Omar Fathy",
      shift: "09:00 - 17:00",
      checkIn: "08:54",
      delay: 0,
      verification: "Biometric",
      waiver: false,
    },
    {
      id: 5,
      name: "Nour Adel",
      shift: "09:00 - 17:00",
      checkIn: "08:55",
      delay: 0,
      verification: "GPS",
      waiver: false,
    },
  ]);

  const [toast, setToast] = useState(null);

  const handleExcuseWaiver = (member) => {
    setAttendance((current) =>
      current.map((item) =>
        item.id === member.id
          ? {
              ...item,
              waiver: true,
            }
          : item
      )
    );

    setToast({
      message: t("managerAttendance.toast.success", {
        member: member.name,
      }),
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-7"
      >
        <div
          className="
            mb-3
            text-[13px]
            font-bold
            uppercase
            tracking-[1px]
            text-[#6485a4]
          "
        >
          {t("managerAttendance.breadcrumb")}
        </div>

        <h1
          className="
            text-[28px]
            font-bold
            leading-tight
            text-[#1c364f]
            max-[760px]:text-[24px]
          "
        >
          {t("managerAttendance.title")}
        </h1>

        <p
          className="
            mt-2
            text-[15px]
            leading-6
            text-[#64809d]
          "
        >
          {t("managerAttendance.subtitle")}
        </p>
      </motion.div>

      {/* =====================================================
          ATTENDANCE TABLE
      ====================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
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
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Table Header */}

            <div
              className="
                grid
                grid-cols-[1.35fr_1.05fr_.85fr_1fr_1.05fr_1.45fr]
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
              <div>
                {t("managerAttendance.table.member")}
              </div>

              <div>
                {t("managerAttendance.table.shift")}
              </div>

              <div>
                {t("managerAttendance.table.checkInTime")}
              </div>

              <div>
                {t("managerAttendance.table.delayMinutes")}
              </div>

              <div>
                {t("managerAttendance.table.verification")}
              </div>

              {/* No Action Header */}
              <div></div>
            </div>

            {/* Table Rows */}

            <div>
              {attendance.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.28,
                    delay: 0.12 + index * 0.05,
                  }}
                  className="
                    grid
                    grid-cols-[1.35fr_1.05fr_.85fr_1fr_1.05fr_1.45fr]
                    items-center
                    gap-4
                    border-b
                    border-[#e7edf1]
                    px-[22px]
                    py-[19px]
                    text-[13px]
                    last:border-b-0
                  "
                >
                  {/* Member */}

                  <div>
                    <p className="font-bold text-[#17344f]">
                      {member.name}
                    </p>
                  </div>

                  {/* Shift */}

                  <div className="text-[#36536d]">
                    {member.shift}
                  </div>

                  {/* Check-in Time */}

                  <div className="font-medium text-[#36536d]">
                    {member.checkIn}
                  </div>

                  {/* Delay */}

                  <div>
                    <span
                      className={
                        member.waiver
                          ? "font-bold text-[#15926c]"
                          : member.delay > 0
                            ? "font-bold text-[#e39a16]"
                            : "font-bold text-[#17344f]"
                      }
                    >
                      {member.waiver
                        ? t("managerAttendance.waived")
                        : `${member.delay} ${t(
                            "managerAttendance.minutes"
                          )}`}
                    </span>
                  </div>

                  {/* Verification */}

                  <div>
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-[#eef3f6]
                        px-3
                        py-[6px]
                        text-[11px]
                        font-bold
                        text-[#496983]
                      "
                    >
                      {member.verification}
                    </span>
                  </div>

                  {/* Manager Excuse Waiver */}

                  <div>
                    <AnimatePresence mode="wait" initial={false}>
                      {!member.waiver ? (
                        <motion.button
                          key="waiver-button"
                          type="button"
                          initial={{
                            opacity: 1,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          whileHover={{
                            y: -1,
                          }}
                          whileTap={{
                            scale: 0.96,
                          }}
                          onClick={() =>
                            handleExcuseWaiver(member)
                          }
                          className="
                            cursor-pointer
                            text-[13px]
                            font-medium
                            text-[#527492]
                            transition-colors
                            hover:text-[#1c364f]
                          "
                        >
                          {t(
                            "managerAttendance.managerExcuseWaiver"
                          )}
                        </motion.button>
                      ) : (
                        <motion.span
                          key="waiver-applied"
                          initial={{
                            opacity: 0,
                            scale: 0.9,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          className="
                            inline-flex
                            items-center
                            rounded-full
                            bg-[#e8f6f0]
                            px-3
                            py-[6px]
                            text-[11px]
                            font-bold
                            text-[#15926c]
                          "
                        >
                          {t(
                            "managerAttendance.waiverApplied"
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          SUCCESS TOAST
      ====================================================== */}

      <AnimatePresence>
        {toast && (
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
              y: 15,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed
              bottom-6
              right-6
              z-[100]
              flex
              max-w-[380px]
              items-center
              gap-3
              rounded-[12px]
              border
              border-[#cfe8dc]
              bg-white
              px-4
              py-3
              shadow-[0_8px_30px_rgba(28,54,79,0.15)]
              max-[600px]:bottom-4
              max-[600px]:left-4
              max-[600px]:right-4
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#e8f6f0]
                text-[15px]
                font-bold
                text-[#15926c]
              "
            >
              ✓
            </div>

            <p className="text-[13px] font-medium text-[#36536d]">
              {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamAttendance;