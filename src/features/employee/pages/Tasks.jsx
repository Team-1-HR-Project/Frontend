import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiCalendar,
  FiUploadCloud,
  FiClock,
  FiCheckCircle,
  FiFileText,
  FiChevronRight,
  FiMoreHorizontal,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";

const INITIAL_TASKS = [
  {
    id: "task-1",
    translationKey: "dummyTasks.t1",
    priority: "high",
    dueDate: "2026-06-12",
    status: "in-progress",
    progress: 70,
    action: "submit",
  },
  {
    id: "task-2",
    translationKey: "dummyTasks.t2",
    priority: "medium",
    dueDate: "2026-06-15",
    status: "under-review",
    progress: 100,
    action: "review",
  },
  {
    id: "task-3",
    translationKey: "dummyTasks.t3",
    priority: "low",
    dueDate: "2026-06-18",
    status: "in-progress",
    progress: 35,
    action: "submit",
  },
];

const STATUS_FILTERS = [
  "all",
  "in-progress",
  "under-review",
  "completed",
];

const Tasks = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeFilter, setActiveFilter] = useState("all");

  // =====================================================
  // TASK UPDATE MODAL
  // =====================================================

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskUpdate, setShowTaskUpdate] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // =====================================================
  // NEW TASK MODAL
  // =====================================================

  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] =
    useState("medium");
  const [newTaskDueDate, setNewTaskDueDate] =
    useState("");
  const [newTaskDescription, setNewTaskDescription] =
    useState("");

  const isRtl = i18n.language?.startsWith("ar");

  const firstName =
    currentUser?.name?.split(" ")[0] || "there";

  // =====================================================
  // STATUS COUNTS
  // =====================================================

  const stats = useMemo(() => {
    return {
      all: tasks.length,

      inProgress: tasks.filter(
        (task) => task.status === "in-progress"
      ).length,

      underReview: tasks.filter(
        (task) => task.status === "under-review"
      ).length,

      completed: tasks.filter(
        (task) => task.status === "completed"
      ).length,
    };
  }, [tasks]);

  // =====================================================
  // FILTERED TASKS
  // =====================================================

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") {
      return tasks;
    }

    return tasks.filter(
      (task) => task.status === activeFilter
    );
  }, [tasks, activeFilter]);

  // =====================================================
  // PRIORITY
  // =====================================================

  const getPriorityMeta = (priority) => {
    switch (priority) {
      case "high":
        return {
          label: t("tasks.priority.high"),
          dot: "bg-[#d95f59]",
          text: "text-[#c6534d]",
          background: "bg-[#fff4f3]",
          border: "border-[#f4d5d2]",
        };

      case "medium":
        return {
          label: t("tasks.priority.medium"),
          dot: "bg-[#d69b45]",
          text: "text-[#b77a27]",
          background: "bg-[#fff8eb]",
          border: "border-[#f2dfbd]",
        };

      case "low":
      default:
        return {
          label: t("tasks.priority.low"),
          dot: "bg-[#6ca77e]",
          text: "text-[#558d66]",
          background: "bg-[#f1f8f3]",
          border: "border-[#d5e8da]",
        };
    }
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusMeta = (status) => {
    switch (status) {
      case "in-progress":
        return {
          label: t("tasks.status.inProgress"),
          color: "#6b9fbc",
          background: "#edf5f9",
        };

      case "under-review":
        return {
          label: t("tasks.status.underReview"),
          color: "#b57c25",
          background: "#fff5e3",
        };

      case "completed":
        return {
          label: t("tasks.status.completed"),
          color: "#57976e",
          background: "#edf7f0",
        };

      default:
        return {
          label: t("tasks.status.inProgress"),
          color: "#6b9fbc",
          background: "#edf5f9",
        };
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      isRtl ? "ar-EG" : "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // TASK UPDATE
  // =====================================================

  const handleOpenTaskUpdate = (task) => {
    setSelectedTask(task);
    setUploadedFile(null);
    setShowTaskUpdate(true);
  };

  const handleCloseTaskUpdate = () => {
    setShowTaskUpdate(false);
    setSelectedTask(null);
    setUploadedFile(null);
  };

  // =====================================================
  // FILE UPLOAD
  // =====================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
    ];

    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOCX, or PNG file.");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be 10MB or less.");
      return;
    }

    setUploadedFile(file);
  };

  // =====================================================
  // SUBMIT FOR REVIEW
  // =====================================================

  const handleSubmitForReview = () => {
    if (!selectedTask) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              status: "under-review",
              progress: 100,
            }
          : task
      )
    );

    handleCloseTaskUpdate();
  };

  // =====================================================
  // NEW TASK
  // =====================================================

  const handleOpenNewTask = () => {
    setNewTaskTitle("");
    setNewTaskPriority("medium");
    setNewTaskDueDate("");
    setNewTaskDescription("");
    setShowNewTask(true);
  };

  const handleCloseNewTask = () => {
    setShowNewTask(false);
    setNewTaskTitle("");
    setNewTaskPriority("medium");
    setNewTaskDueDate("");
    setNewTaskDescription("");
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    if (!newTaskTitle.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!newTaskDueDate) {
      alert("Please select a due date.");
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      description: newTaskDescription.trim(),
      status: "in-progress",
      progress: 0,
      action: "submit",
    };

    setTasks((prev) => [newTask, ...prev]);
    setActiveFilter("all");

    handleCloseNewTask();
  };

  return (
    <div className="min-h-full w-full text-[#1c364f]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7"
      >
        {/* Breadcrumb */}

        <div
          className="
            mb-3
            flex
            items-center
            gap-2
            text-[12px]
            font-medium
            text-[#91a3b2]
          "
        >
          <span>{t("tasks.workManagement")}</span>

          <FiChevronRight
            className={`
              h-3.5
              w-3.5
              ${isRtl ? "rotate-180" : ""}
            `}
          />

          <span className="font-semibold text-[#1c364f]">
            {t("tasks.myTasks")}
          </span>
        </div>

        {/* Title */}

        <div
          className="
            flex
            items-end
            justify-between
            gap-5
            max-[640px]:items-start
            max-[640px]:flex-col
          "
        >
          <div>
            <h1
              className="
                text-[29px]
                font-bold
                tracking-[-0.5px]
                text-[#1c364f]
                max-[640px]:text-[25px]
              "
            >
              {t("tasks.myTasks")}
            </h1>

            <p className="mt-1.5 text-[14px] text-[#73889a]">
              {t("tasks.subtitle")}
            </p>
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenNewTask}
            className="
              inline-flex
              items-center
              gap-2
              rounded-[10px]
              bg-[#1c364f]
              px-4
              py-2.5
              text-[13px]
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#284761]
              max-[640px]:w-full
              max-[640px]:justify-center
            "
          >
            <FiPlus className="h-4 w-4" />
            <span>{t("tasks.newTask")}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          delay: 0.08,
        }}
        className="
          mb-5
          flex
          items-center
          gap-2
          overflow-x-auto
          border-b
          border-[#e5ebef]
        "
      >
        {STATUS_FILTERS.map((filter) => {
          const count =
            filter === "all"
              ? stats.all
              : filter === "in-progress"
                ? stats.inProgress
                : filter === "under-review"
                  ? stats.underReview
                  : stats.completed;

          const label =
            filter === "all"
              ? t("tasks.filters.all")
              : filter === "in-progress"
                ? t("tasks.filters.inProgress")
                : filter === "under-review"
                  ? t("tasks.filters.underReview")
                  : t("tasks.filters.completed");

          const active = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                relative
                flex
                shrink-0
                items-center
                gap-1.5
                px-3
                pb-3
                pt-1
                text-[12px]
                font-semibold
                transition
                ${
                  active
                    ? "text-[#1c364f]"
                    : "text-[#8999a6] hover:text-[#536c80]"
                }
              `}
            >
              <span>{label}</span>

              <span
                className={`
                  inline-flex
                  min-w-[18px]
                  items-center
                  justify-center
                  rounded-full
                  px-1
                  text-[10px]
                  font-bold
                  ${
                    active
                      ? "bg-[#edf2f5] text-[#1c364f]"
                      : "bg-[#f5f7f8] text-[#9aa9b5]"
                  }
                `}
              >
                {count}
              </span>

              {active && (
                <motion.div
                  layoutId="task-active-tab"
                  className="
                    absolute
                    bottom-[-1px]
                    left-0
                    right-0
                    h-[2px]
                    rounded-full
                    bg-[#1c364f]
                  "
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* =====================================================
          TASK CARDS
      ===================================================== */}

      <AnimatePresence mode="popLayout">
        {filteredTasks.length > 0 ? (
          <motion.div layout className="space-y-3">
            {filteredTasks.map((task, index) => {
              const priority = getPriorityMeta(task.priority);
              const status = getStatusMeta(task.status);

              const priorityLine =
                task.priority === "high"
                  ? "#e36b70"
                  : task.priority === "medium"
                    ? "#d9a04b"
                    : "#70abc9";

              const priorityBackground =
                task.priority === "high"
                  ? "#fff0f0"
                  : task.priority === "medium"
                    ? "#fff7e8"
                    : "#edf6fb";

              const priorityText =
                task.priority === "high"
                  ? "#d45b60"
                  : task.priority === "medium"
                    ? "#b67a22"
                    : "#4d83a7";

              return (
                <motion.article
                  layout
                  key={task.id}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  className="
                    relative
                    overflow-hidden
                    rounded-[14px]
                    border
                    border-[#d9e3e9]
                    bg-white
                    px-[46px]
                    py-[21px]
                    shadow-[0_1px_3px_rgba(28,54,79,0.025)]
                    transition-all
                    duration-200
                    hover:border-[#cbd8e0]
                    hover:shadow-[0_4px_14px_rgba(28,54,79,0.06)]
                    max-[900px]:px-[35px]
                    max-[640px]:px-[25px]
                  "
                >
                  {/* COLORED LEFT LINE */}

                  <div
                    className="
                      absolute
                      bottom-[20px]
                      left-[23px]
                      top-[20px]
                      w-[4px]
                      rounded-full
                      max-[640px]:left-[13px]
                    "
                    style={{
                      backgroundColor: priorityLine,
                    }}
                  />

                  {/* THREE DOTS */}

                  <button
                    type="button"
                    className="
                      absolute
                      right-[27px]
                      top-[22px]
                      rounded-md
                      p-1
                      text-[#7894a8]
                      transition
                      hover:bg-[#f4f7f9]
                      hover:text-[#526f84]
                      max-[640px]:right-[16px]
                    "
                  >
                    <FiMoreHorizontal className="h-[18px] w-[18px]" />
                  </button>

                  {/* CONTENT */}

                  <div
                    className="
                      flex
                      min-h-[145px]
                      items-center
                      justify-between
                      gap-8
                      max-[760px]:block
                    "
                  >
                    {/* LEFT CONTENT */}

                    <div className="min-w-0 flex-1">

                      {/* Priority */}

                      <div className="mb-3">
                        <span
                          className="
                            inline-flex
                            items-center
                            rounded-full
                            px-[10px]
                            py-[5px]
                            text-[10px]
                            font-bold
                          "
                          style={{
                            color: priorityText,
                            backgroundColor:
                              priorityBackground,
                          }}
                        >
                          {priority.label}
                        </span>
                      </div>

                      {/* Title */}

                      <h2
                        className="
                          max-w-[650px]
                          text-[16px]
                          font-medium
                          leading-[1.4]
                          text-[#1d4465]
                        "
                      >
                        {task.translationKey
                          ? t(
                              `${task.translationKey}.title`
                            )
                          : task.title}
                      </h2>

                      {/* Description */}

                      {(task.translationKey ||
                        task.description) && (
                        <p
                          className="
                            mt-1.5
                            max-w-[650px]
                            text-[11px]
                            leading-[1.6]
                            text-[#8296a5]
                          "
                        >
                          {task.translationKey
                            ? t(
                                `${task.translationKey}.desc`
                              )
                            : task.description}
                        </p>
                      )}

                      {/* Due Date */}

                      <div
                        className="
                          mt-2.5
                          flex
                          items-center
                          gap-1.5
                          text-[11px]
                          font-medium
                          text-[#68849a]
                        "
                      >
                        <FiCalendar className="h-[14px] w-[14px]" />

                        <span>
                          {t("tasks.due")}{" "}
                          {formatDate(task.dueDate)}
                        </span>
                      </div>

                      {/* Progress */}

                      <div className="mt-6 max-w-[560px]">
                        <div
                          className="
                            mb-1.5
                            flex
                            items-center
                            justify-between
                          "
                        >
                          <span
                            className="
                              text-[10px]
                              font-medium
                              text-[#69859a]
                            "
                          >
                            {status.label}
                          </span>

                          <span
                            className="
                              text-[11px]
                              font-bold
                              text-[#1c364f]
                            "
                          >
                            {task.progress}%
                          </span>
                        </div>

                        <div
                          className="
                            h-[6px]
                            w-full
                            overflow-hidden
                            rounded-full
                            bg-[#e9eff2]
                          "
                        >
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${task.progress}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay:
                                0.15 +
                                index * 0.05,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor:
                                task.status ===
                                "completed"
                                  ? "#57976e"
                                  : "#6c9fba",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* RIGHT ACTION */}

                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        justify-end
                        pr-[1px]
                        max-[760px]:mt-5
                        max-[760px]:justify-start
                      "
                    >
                      {task.status ===
                        "in-progress" && (
                        <motion.button
                          whileHover={{
                            y: -1,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          onClick={() =>
                            handleOpenTaskUpdate(
                              task
                            )
                          }
                          className="
                            inline-flex
                            min-w-[170px]
                            items-center
                            justify-center
                            gap-2
                            rounded-[8px]
                            border
                            border-[#d8e3e9]
                            bg-white
                            px-4
                            py-[14px]
                            text-[12px]
                            font-bold
                            text-[#345672]
                            transition
                            hover:border-[#c1d1da]
                            hover:bg-[#f9fbfc]
                          "
                        >
                          <FiUploadCloud className="h-[15px] w-[15px]" />

                          <span>
                            {t("tasks.submitDeliverable")}
                          </span>
                        </motion.button>
                      )}

                      {task.status ===
                        "under-review" && (
                        <div
                          className="
                            inline-flex
                            min-w-[125px]
                            items-center
                            justify-center
                            gap-1.5
                            rounded-full
                            bg-[#fff4df]
                            px-4
                            py-[11px]
                            text-[11px]
                            font-bold
                            text-[#b37a20]
                          "
                        >
                          <FiClock className="h-[14px] w-[14px]" />

                          <span>
                            {t("tasks.awaitingReview")}
                          </span>
                        </div>
                      )}

                      {task.status ===
                        "completed" && (
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-[#edf7f0]
                            px-4
                            py-[11px]
                            text-[11px]
                            font-bold
                            text-[#57976e]
                          "
                        >
                          <FiCheckCircle className="h-[14px] w-[14px]" />

                          <span>
                            {t("tasks.completed")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              rounded-[14px]
              border
              border-dashed
              border-[#dce5ea]
              bg-white
              py-16
              text-center
            "
          >
            <FiCheckCircle className="mx-auto mb-3 h-6 w-6 text-[#8ca0af]" />

            <p className="text-[13px] font-semibold text-[#526b7e]">
              {t("tasks.noTasks")}
            </p>

            <p className="mt-1 text-[11px] text-[#9aa8b3]">
              {t("tasks.allCaughtUp")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          NEW TASK MODAL
      ===================================================== */}

      <AnimatePresence>
        {showNewTask && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={handleCloseNewTask}
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-[#102536]/35
              p-4
              backdrop-blur-[3px]
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 18,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 18,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                w-full
                max-w-[470px]
                overflow-hidden
                rounded-[17px]
                border
                border-[#dfe7eb]
                bg-white
                shadow-[0_20px_60px_rgba(28,54,79,0.18)]
              "
            >
              {/* Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#edf1f3]
                  px-6
                  py-5
                "
              >
                <div>
                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[1px]
                      text-[#8da0ad]
                    "
                  >
                    {t("tasks.workManagement")}
                  </p>

                  <h2
                    className="
                      text-[18px]
                      font-bold
                      text-[#1c364f]
                    "
                  >
                    {t("tasks.createNewTask")}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleCloseNewTask}
                  className="
                    rounded-lg
                    p-2
                    text-[#9baab5]
                    transition
                    hover:bg-[#f4f7f8]
                    hover:text-[#536c80]
                  "
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}

              <form
                onSubmit={handleCreateTask}
                className="px-6 py-5"
              >
                {/* Title */}

                <div className="mb-5">
                  <label
                    className="
                      mb-2
                      block
                      text-[12px]
                      font-semibold
                      text-[#61798c]
                    "
                  >
                    {t("tasks.form.title")}
                  </label>

                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) =>
                      setNewTaskTitle(
                        e.target.value
                      )
                    }
                    placeholder={t(
                      "tasks.form.titlePlaceholder"
                    )}
                    className="
                      w-full
                      rounded-[10px]
                      border
                      border-[#dce5ea]
                      bg-white
                      px-3
                      py-2.5
                      text-[12px]
                      text-[#1c364f]
                      outline-none
                      transition
                      placeholder:text-[#a8b4bd]
                      focus:border-[#6f8da3]
                      focus:ring-2
                      focus:ring-[#6f8da3]/10
                    "
                  />
                </div>

                {/* Priority */}

                <div className="mb-5">
                  <label
                    className="
                      mb-2
                      block
                      text-[12px]
                      font-semibold
                      text-[#61798c]
                    "
                  >
                    {t("tasks.form.priority")}
                  </label>

                  <select
                    value={newTaskPriority}
                    onChange={(e) =>
                      setNewTaskPriority(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-[10px]
                      border
                      border-[#dce5ea]
                      bg-white
                      px-3
                      py-2.5
                      text-[12px]
                      text-[#1c364f]
                      outline-none
                      transition
                      focus:border-[#6f8da3]
                      focus:ring-2
                      focus:ring-[#6f8da3]/10
                    "
                  >
                    <option value="high">
                      {t("tasks.priority.high")}
                    </option>

                    <option value="medium">
                      {t("tasks.priority.medium")}
                    </option>

                    <option value="low">
                      {t("tasks.priority.low")}
                    </option>
                  </select>
                </div>

                {/* Due date */}

                <div className="mb-5">
                  <label
                    className="
                      mb-2
                      block
                      text-[12px]
                      font-semibold
                      text-[#61798c]
                    "
                  >
                    {t("tasks.form.dueDate")}
                  </label>

                  <div className="relative">
                    <FiCalendar
                      className="
                        absolute
                        left-3
                        top-1/2
                        h-3.5
                        w-3.5
                        -translate-y-1/2
                        text-[#8fa0ab]
                      "
                    />

                    <input
                      type="date"
                      value={newTaskDueDate}
                      onChange={(e) =>
                        setNewTaskDueDate(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        rounded-[10px]
                        border
                        border-[#dce5ea]
                        bg-white
                        py-2.5
                        pl-9
                        pr-3
                        text-[12px]
                        text-[#1c364f]
                        outline-none
                        transition
                        focus:border-[#6f8da3]
                        focus:ring-2
                        focus:ring-[#6f8da3]/10
                      "
                    />
                  </div>
                </div>

                {/* Description */}

                <div className="mb-1">
                  <label
                    className="
                      mb-2
                      block
                      text-[12px]
                      font-semibold
                      text-[#61798c]
                    "
                  >
                    {t("tasks.form.description")}
                  </label>

                  <textarea
                    rows={3}
                    value={newTaskDescription}
                    onChange={(e) =>
                      setNewTaskDescription(
                        e.target.value
                      )
                    }
                    placeholder={t(
                      "tasks.form.descriptionPlaceholder"
                    )}
                    className="
                      w-full
                      resize-none
                      rounded-[10px]
                      border
                      border-[#dce5ea]
                      bg-white
                      px-3
                      py-2.5
                      text-[12px]
                      text-[#1c364f]
                      outline-none
                      transition
                      placeholder:text-[#a8b4bd]
                      focus:border-[#6f8da3]
                      focus:ring-2
                      focus:ring-[#6f8da3]/10
                    "
                  />
                </div>

                {/* Footer */}

                <div
                  className="
                    mt-6
                    flex
                    gap-3
                    border-t
                    border-[#edf1f3]
                    bg-[#fcfdfd]
                    pt-4
                  "
                >
                  <button
                    type="button"
                    onClick={handleCloseNewTask}
                    className="
                      flex-1
                      rounded-[9px]
                      border
                      border-[#dce5ea]
                      bg-white
                      px-4
                      py-2.5
                      text-[12px]
                      font-semibold
                      text-[#667d8f]
                      transition
                      hover:bg-[#f6f8f9]
                    "
                  >
                    {t("tasks.form.cancel")}
                  </button>

                  <motion.button
                    type="submit"
                    whileHover={{
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="
                      flex-1
                      rounded-[9px]
                      bg-[#1c364f]
                      px-4
                      py-2.5
                      text-[12px]
                      font-semibold
                      text-white
                      transition
                      hover:bg-[#284761]
                    "
                  >
                    {t("tasks.form.create")}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          TASK UPDATE MODAL
      ===================================================== */}

      <AnimatePresence>
        {showTaskUpdate && selectedTask && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={handleCloseTaskUpdate}
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-[#102536]/35
              p-4
              backdrop-blur-[3px]
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 18,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 18,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                w-full
                max-w-[470px]
                overflow-hidden
                rounded-[17px]
                border
                border-[#dfe7eb]
                bg-white
                shadow-[0_20px_60px_rgba(28,54,79,0.18)]
              "
            >
              {/* Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#edf1f3]
                  px-6
                  py-5
                "
              >
                <div>
                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[1px]
                      text-[#8da0ad]
                    "
                  >
                    {t("tasks.taskUpdate")}
                  </p>

                  <h2
                    className="
                      text-[18px]
                      font-bold
                      text-[#1c364f]
                    "
                  >
                    {t("tasks.submitDeliverable")}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleCloseTaskUpdate}
                  className="
                    rounded-lg
                    p-2
                    text-[#9baab5]
                    transition
                    hover:bg-[#f4f7f8]
                    hover:text-[#536c80]
                  "
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}

              <div className="px-6 py-5">
                {/* Task */}

                <div className="mb-6">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.7px]
                      text-[#94a3ae]
                    "
                  >
                    {t("tasks.form.task")}
                  </p>

                  <h3
                    className="
                      mt-1.5
                      text-[15px]
                      font-bold
                      leading-snug
                      text-[#1c364f]
                    "
                  >
                    {selectedTask.translationKey
                      ? t(
                          `${selectedTask.translationKey}.title`
                        )
                      : selectedTask.title}
                  </h3>
                </div>

                {/* Progress */}

                <div className="mb-6">
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        text-[12px]
                        font-semibold
                        text-[#61798c]
                      "
                    >
                      {t("tasks.form.progress")}
                    </span>

                    <span
                      className="
                        text-[13px]
                        font-bold
                        text-[#1c364f]
                      "
                    >
                      {selectedTask.progress}%
                    </span>
                  </div>

                  <div
                    className="
                      h-[8px]
                      overflow-hidden
                      rounded-full
                      bg-[#edf1f3]
                    "
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${selectedTask.progress}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-[#4F83A8]
                      "
                    />
                  </div>
                </div>

                {/* Notes */}

                <div className="mb-5">
                  <label
                    className="
                      mb-2
                      block
                      text-[12px]
                      font-semibold
                      text-[#61798c]
                    "
                  >
                    {t("tasks.form.notes")}
                  </label>

                  <textarea
                    rows={3}
                    placeholder={t(
                      "tasks.form.notesPlaceholder"
                    )}
                    className="
                      w-full
                      resize-none
                      rounded-[10px]
                      border
                      border-[#dce5ea]
                      bg-white
                      px-3
                      py-2.5
                      text-[12px]
                      text-[#1c364f]
                      outline-none
                      transition
                      placeholder:text-[#a8b4bd]
                      focus:border-[#6f8da3]
                      focus:ring-2
                      focus:ring-[#6f8da3]/10
                    "
                  />
                </div>

                {/* Upload */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-[12px]
                      font-semibold
                      text-[#61798c]
                    "
                  >
                    {t("tasks.form.deliverable")}
                  </label>

                  <label
                    className="
                      flex
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-[12px]
                      border
                      border-dashed
                      border-[#cfdce3]
                      bg-[#fafcfd]
                      px-5
                      py-6
                      text-center
                      transition
                      hover:border-[#9eb3c1]
                      hover:bg-[#f7fafb]
                    "
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div
                      className="
                        mb-3
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-[#edf3f6]
                      "
                    >
                      <FiUploadCloud
                        className="
                          h-5
                          w-5
                          text-[#4F83A8]
                        "
                      />
                    </div>

                    {uploadedFile ? (
                      <>
                        <p
                          className="
                            max-w-full
                            truncate
                            px-4
                            text-[12px]
                            font-bold
                            text-[#35536b]
                          "
                        >
                          {uploadedFile.name}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-[#91a0aa]
                          "
                        >
                          {(
                            uploadedFile.size /
                            (1024 * 1024)
                          ).toFixed(2)}{" "}
                          MB
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          className="
                            text-[12px]
                            font-semibold
                            text-[#526b7e]
                          "
                        >
                          {t(
                            "tasks.form.uploadFile"
                          )}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-[#9aa8b3]
                          "
                        >
                          {t(
                            "tasks.form.uploadHint"
                          )}
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Footer */}

              <div
                className="
                  flex
                  gap-3
                  border-t
                  border-[#edf1f3]
                  bg-[#fcfdfd]
                  px-6
                  py-4
                "
              >
                <button
                  type="button"
                  onClick={handleCloseTaskUpdate}
                  className="
                    flex-1
                    rounded-[9px]
                    border
                    border-[#dce5ea]
                    bg-white
                    px-4
                    py-2.5
                    text-[12px]
                    font-semibold
                    text-[#667d8f]
                    transition
                    hover:bg-[#f6f8f9]
                  "
                >
                  {t("tasks.form.cancel")}
                </button>

                <motion.button
                  type="button"
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleSubmitForReview}
                  disabled={!uploadedFile}
                  className="
                    flex-1
                    rounded-[9px]
                    bg-[#1c364f]
                    px-4
                    py-2.5
                    text-[12px]
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#284761]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  {t(
                    "tasks.form.submitForReview"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;