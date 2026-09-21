import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LuSparkles } from "react-icons/lu";

const AITeamInsights = () => {
  const { t } = useTranslation();

  const skillGaps = [
    {
      id: 1,
      title: t("managerAI.skillGaps.systemDesign"),
      badge: t("managerAI.skillGaps.systemDesignBadge"),
      action: t("managerAI.skillGaps.systemDesignAction"),
    },
    {
      id: 2,
      title: t("managerAI.skillGaps.mentorship"),
      badge: t("managerAI.skillGaps.mentorshipBadge"),
      action: t("managerAI.skillGaps.mentorshipAction"),
    },
    {
      id: 3,
      title: t("managerAI.skillGaps.testStrategy"),
      badge: t("managerAI.skillGaps.testStrategyBadge"),
      action: t("managerAI.skillGaps.testStrategyAction"),
    },
  ];

  const burnoutSignals = [
    {
      id: 1,
      name: "Youssef Lotfy",
      load: 68,
      status: t("managerAI.burnout.high"),
      statusClass: "bg-red-50 text-red-600",
      barClass: "bg-red-600",
    },
    {
      id: 2,
      name: "Karim Ashraf",
      load: 54,
      status: t("managerAI.burnout.watch"),
      statusClass: "bg-amber-50 text-amber-700",
      barClass: "bg-amber-500",
    },
    {
      id: 3,
      name: "Salma Nabil",
      load: 31,
      status: t("managerAI.burnout.balanced"),
      statusClass: "bg-emerald-50 text-emerald-700",
      barClass: "bg-emerald-600",
    },
  ];

  return (
    <div className="w-full">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Breadcrumb */}

        <div
          className="
            mb-3
            text-[13px]
            font-bold
            uppercase
            tracking-[1px]
            text-[#587896]
          "
        >
          {t("managerAI.breadcrumb")}
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
          {t("managerAI.title")}
        </h1>

        {/* Subtitle */}

        <p
          className="
            mt-2
            text-[15px]
            leading-6
            text-[#64809d]
          "
        >
          {t("managerAI.subtitle")}
        </p>
      </motion.div>

      {/* =====================================================
          MAIN CARDS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          xl:grid-cols-2
        "
      >
        {/* ===================================================
            TEAM SKILL GAP
        ==================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.1,
          }}
          whileHover={{
            y: -2,
          }}
          className="
            relative
            overflow-hidden
            rounded-[16px]
            border
            border-[#d8e1e8]
            border-l-[4px]
            border-l-[#527492]
            bg-white
            px-6
            py-5
            shadow-[0_1px_4px_rgba(28,54,79,0.04)]
            max-[760px]:px-5
          "
        >
          {/* Header */}

          <div className="flex items-start gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.25,
              }}
              whileHover={{
                scale: 1.06,
                rotate: 3,
              }}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-[11px]
                bg-[#eaf2f8]
                text-[#527492]
              "
            >
              <LuSparkles size={21} strokeWidth={1.8} />
            </motion.div>

            <div className="min-w-0 flex-1">
              <div
                className="
                  text-[13px]
                  font-bold
                  uppercase
                  tracking-[0.5px]
                  text-[#42627e]
                "
              >
                {t("managerAI.skillGapCard.eyebrow")}
              </div>

              <h2
                className="
                  mt-2
                  text-[23px]
                  font-bold
                  leading-tight
                  text-[#1c364f]
                  max-[760px]:text-[20px]
                "
              >
                {t("managerAI.skillGapCard.title")}
              </h2>

              <p
                className="
                  mt-3
                  max-w-[620px]
                  text-[15px]
                  leading-[1.55]
                  text-[#66809b]
                "
              >
                {t("managerAI.skillGapCard.description")}
              </p>
            </div>
          </div>

          {/* Skill Gap Items */}

          <div className="mt-6 space-y-4">
            {skillGaps.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.25 + index * 0.08,
                }}
                whileHover={{
                  y: -2,
                }}
                className="
                  rounded-[12px]
                  bg-[#f4f6f7]
                  px-[18px]
                  py-[17px]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    max-[600px]:flex-col
                    max-[600px]:items-start
                  "
                >
                  <h3
                    className="
                      text-[16px]
                      font-bold
                      text-[#17344f]
                    "
                  >
                    {item.title}
                  </h3>

                  <span
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      rounded-full
                      bg-[#fff1c7]
                      px-3
                      py-[6px]
                      text-[12px]
                      font-bold
                      text-[#a96700]
                    "
                  >
                    {item.badge}
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-5
                    text-[#66809b]
                  "
                >
                  {item.action}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===================================================
            BURNOUT RISK
        ==================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.18,
          }}
          whileHover={{
            y: -2,
          }}
          className="
            relative
            overflow-hidden
            rounded-[16px]
            border
            border-[#d8e1e8]
            border-l-[4px]
            border-l-[#e4a315]
            bg-white
            px-6
            py-5
            shadow-[0_1px_4px_rgba(28,54,79,0.04)]
            max-[760px]:px-5
          "
        >
          {/* Header */}

          <div>
            <div
              className="
                text-[13px]
                font-bold
                uppercase
                tracking-[0.5px]
                text-[#a36000]
              "
            >
              {t("managerAI.burnoutCard.eyebrow")}
            </div>

            <h2
              className="
                mt-2
                text-[23px]
                font-bold
                leading-tight
                text-[#1c364f]
                max-[760px]:text-[20px]
              "
            >
              {t("managerAI.burnoutCard.title")}
            </h2>

            <p
              className="
                mt-3
                max-w-[650px]
                text-[15px]
                leading-[1.55]
                text-[#66809b]
              "
            >
              {t("managerAI.burnoutCard.description")}
            </p>
          </div>

          {/* Burnout Signals */}

          <div className="mt-7 space-y-6">
            {burnoutSignals.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + index * 0.08,
                }}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <h3
                    className="
                      text-[16px]
                      font-bold
                      text-[#17344f]
                    "
                  >
                    {member.name}
                  </h3>

                  <motion.span
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: 0.4 + index * 0.08,
                    }}
                    className={`
                      inline-flex
                      shrink-0
                      items-center
                      rounded-full
                      px-3
                      py-[6px]
                      text-[12px]
                      font-bold
                      ${member.statusClass}
                    `}
                  >
                    {member.status}
                  </motion.span>
                </div>

                {/* Progress */}

                <div
                  className="
                    mt-3
                    h-[8px]
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#e8ecef]
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${member.load}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.45 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`
                      h-full
                      rounded-full
                      ${member.barClass}
                    `}
                  />
                </div>

                <p
                  className="
                    mt-2
                    text-[13px]
                    leading-5
                    text-[#6d89a2]
                  "
                >
                  {t("managerAI.burnout.loadDescription", {
                    load: member.load,
                  })}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AITeamInsights;