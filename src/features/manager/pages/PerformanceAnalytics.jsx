import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PerformanceAnalytics = () => {
  const { t } = useTranslation();

  // =====================================================
  // DEPARTMENT COMPETENCIES
  // Same color for all competencies
  // =====================================================

  const competencies = [
    {
      id: 1,
      name: t(
        "managerPerformanceAnalytics.competencies.technicalExecution"
      ),
      value: 88,
    },
    {
      id: 2,
      name: t(
        "managerPerformanceAnalytics.competencies.communication"
      ),
      value: 76,
    },
    {
      id: 3,
      name: t(
        "managerPerformanceAnalytics.competencies.ownership"
      ),
      value: 67,
    },
    {
      id: 4,
      name: t(
        "managerPerformanceAnalytics.competencies.mentorship"
      ),
      value: 54,
    },
  ];

  // =====================================================
  // TEAM PERFORMANCE
  // =====================================================

  const teamPerformance = [
    {
      id: 1,
      name: "Youssef Lotfy",
      velocity: 91,
      rating: 4.7,
    },
    {
      id: 2,
      name: "Karim Ashraf",
      velocity: 84,
      rating: 4.4,
    },
    {
      id: 3,
      name: "Salma Nabil",
      velocity: 76,
      rating: 4.2,
    },
    {
      id: 4,
      name: "Omar Fathy",
      velocity: 68,
      rating: 4.0,
    },
  ];

  // =====================================================
  // VELOCITY COLORS BASED ON PERCENTAGE
  // =====================================================

  const getVelocityColor = (value) => {
    if (value >= 85) {
      return {
        color: "#3FA77A",
        background: "#E8F6F0",
      };
    }

    if (value >= 75) {
      return {
        color: "#4F83A8",
        background: "#EAF2F7",
      };
    }

    if (value >= 65) {
      return {
        color: "#D99A3D",
        background: "#FBF3E5",
      };
    }

    return {
      color: "#8B78B8",
      background: "#F1EEF8",
    };
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
        {/* Breadcrumb */}

        <div
          className="
            mb-3
            text-[12px]
            font-bold
            uppercase
            tracking-[1px]
            text-[#7190aa]
          "
        >
          {t("managerPerformanceAnalytics.breadcrumb")}
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
          {t("managerPerformanceAnalytics.title")}
        </h1>

        {/* Subtitle */}

        <p
          className="
            mt-2
            text-[15px]
            leading-6
            text-[#6b849a]
          "
        >
          {t("managerPerformanceAnalytics.subtitle")}
        </p>
      </motion.div>

      {/* =====================================================
          ANALYTICS CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* ===================================================
            LEFT CARD
            DEPARTMENT COMPETENCY DISTRIBUTION
        ==================================================== */}

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
            rounded-[16px]
            border
            border-[#dce5eb]
            bg-white
            p-[24px]
            shadow-[0_2px_8px_rgba(28,54,79,0.06)]
          "
        >
          {/* Card Title */}

          <div className="mb-7">
            <h2
              className="
                text-[18px]
                font-bold
                text-[#1c364f]
              "
            >
              {t(
                "managerPerformanceAnalytics.departmentCompetencyDistribution"
              )}
            </h2>
          </div>

          {/* Competencies */}

          <div className="space-y-6">
            {competencies.map((competency, index) => (
              <motion.div
                key={competency.id}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.15 + index * 0.07,
                }}
              >
                {/* Label + Percentage */}

                <div className="mb-2 flex items-center justify-between gap-4">
                  <span
                    className="
                      text-[14px]
                      font-semibold
                      text-[#3d5b73]
                    "
                  >
                    {competency.name}
                  </span>

                  <span
                    className="
                      text-[14px]
                      font-bold
                      text-[#1c364f]
                    "
                  >
                    {competency.value}%
                  </span>
                </div>

                {/* Progress Background */}

                <div
                  className="
                    h-[9px]
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#EAF2F7]
                  "
                >
                  {/* SAME BLUE COLOR FOR ALL */}

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${competency.value}%`,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.25 + index * 0.08,
                      ease: "easeOut",
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-[#4F83A8]
                    "
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===================================================
            RIGHT CARD
            TEAM PERFORMANCE INDEX
        ==================================================== */}

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
            delay: 0.16,
          }}
          className="
            rounded-[16px]
            border
            border-[#dce5eb]
            bg-white
            p-[24px]
            shadow-[0_2px_8px_rgba(28,54,79,0.06)]
          "
        >
          {/* Card Title */}

          <div className="mb-5">
            <h2
              className="
                text-[18px]
                font-bold
                text-[#1c364f]
              "
            >
              {t(
                "managerPerformanceAnalytics.teamPerformanceIndex"
              )}
            </h2>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Table Header */}

              <div
                className="
                  grid
                  grid-cols-[1.6fr_1fr_.8fr]
                  items-center
                  gap-4
                  rounded-[8px]
                  bg-[#f4f7f9]
                  px-[16px]
                  py-[13px]
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.5px]
                  text-[#7893aa]
                "
              >
                <div>
                  {t(
                    "managerPerformanceAnalytics.table.member"
                  )}
                </div>

                <div>
                  {t(
                    "managerPerformanceAnalytics.table.velocity"
                  )}
                </div>

                <div>
                  {t(
                    "managerPerformanceAnalytics.table.rating"
                  )}
                </div>
              </div>

              {/* Table Rows */}

              <div className="mt-1">
                {teamPerformance.map((member, index) => {
                  const velocityStyle = getVelocityColor(
                    member.velocity
                  );

                  return (
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
                        delay: 0.22 + index * 0.06,
                      }}
                      className="
                        grid
                        grid-cols-[1.6fr_1fr_.8fr]
                        items-center
                        gap-4
                        border-b
                        border-[#edf1f4]
                        px-[16px]
                        py-[17px]
                        last:border-b-0
                      "
                    >
                      {/* Member */}

                      <div>
                        <p
                          className="
                            text-[13px]
                            font-bold
                            text-[#1c364f]
                          "
                        >
                          {member.name}
                        </p>
                      </div>

                      {/* Velocity */}

                      <div className="flex items-center gap-2">
                        {/* Velocity Background */}

                        <div
                          className="
                            h-[7px]
                            min-w-[45px]
                            flex-1
                            overflow-hidden
                            rounded-full
                          "
                          style={{
                            backgroundColor:
                              velocityStyle.background,
                          }}
                        >
                          {/* Velocity Progress */}

                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${member.velocity}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay:
                                0.3 + index * 0.08,
                              ease: "easeOut",
                            }}
                            className="
                              h-full
                              rounded-full
                            "
                            style={{
                              backgroundColor:
                                velocityStyle.color,
                            }}
                          />
                        </div>

                        {/* Velocity Percentage */}

                        <span
                          className="
                            w-[34px]
                            text-right
                            text-[12px]
                            font-bold
                          "
                          style={{
                            color: velocityStyle.color,
                          }}
                        >
                          {member.velocity}%
                        </span>
                      </div>

                      {/* Rating */}

                      <div>
                        <span
                          className="
                            inline-flex
                            min-w-[48px]
                            items-center
                            justify-center
                            rounded-full
                            bg-[#edf4f7]
                            px-2
                            py-[6px]
                            text-[12px]
                            font-bold
                            text-[#527492]
                          "
                        >
                          {member.rating.toFixed(1)}/5
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;