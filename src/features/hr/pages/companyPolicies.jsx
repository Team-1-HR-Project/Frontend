import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, X, BookOpen, Download } from "lucide-react";

/* =====================================================
   DATA
===================================================== */

const initialPolicies = [
  {
    id: "punctuality",
    translationKey: "punctuality",
  },
  {
    id: "leave",
    translationKey: "leave",
  },
  {
    id: "salary-advance",
    translationKey: "salaryAdvance",
  },
];

/* =====================================================
   POLICY CARD
===================================================== */

function PolicyCard({ policy, index, onEdit }) {
  const { t } = useTranslation();

  const isTranslatedPolicy = Boolean(policy.translationKey);

  const title = isTranslatedPolicy
    ? t(`hrCompanyPolicies.policies.${policy.translationKey}.title`)
    : policy.title;

  const description = isTranslatedPolicy
    ? t(`hrCompanyPolicies.policies.${policy.translationKey}.description`)
    : policy.description;

  const effectiveDate = isTranslatedPolicy
    ? t(`hrCompanyPolicies.policies.${policy.translationKey}.effectiveDate`)
    : policy.effectiveDate;

  const version = isTranslatedPolicy
    ? t(`hrCompanyPolicies.policies.${policy.translationKey}.version`)
    : policy.version;

  return (
    <div
      className="
        group
        rounded-xl
        border
        border-[#D9E2EC]
        bg-white
        p-6
        opacity-0
        animate-[policyCardIn_0.55s_ease-out_forwards]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_25px_rgba(36,59,83,0.08)]
      "
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* =====================================================
          ICON + STATUS
      ===================================================== */}

      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-[#F5F7F8]
            text-[#486581]
            transition-all
            duration-300
            group-hover:-translate-y-0.5
            group-hover:scale-105
          "
        >
          <BookOpen
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:rotate-[-5deg]
            "
          />
        </div>

        <span
          className="
            rounded-full
            bg-[#5B8C6A]/10
            px-3
            py-1
            text-xs
            font-medium
            text-[#5B8C6A]
            transition-all
            duration-300
            group-hover:bg-[#5B8C6A]/15
          "
        >
          {t("hrCompanyPolicies.aiSynced")}
        </span>
      </div>

      {/* =====================================================
          TITLE
      ===================================================== */}

      <h3
        className="
          mt-4
          font-['Manrope']
          text-[16px]
          font-semibold
          text-[#202B33]
          transition-colors
          duration-300
          group-hover:text-[#243B53]
        "
      >
        {title}
      </h3>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <p className="mt-1 text-sm leading-relaxed text-[#6B7785]">
        {description}
      </p>

      {/* =====================================================
          POLICY DETAILS
      ===================================================== */}

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#D9E2EC] pt-4">
        <div>
          <p className="text-xs text-[#6B7785]">
            {t("hrCompanyPolicies.effectiveDate")}
          </p>

          <p className="mt-0.5 text-sm font-medium text-[#202B33]">
            {effectiveDate}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#6B7785]">
            {t("hrCompanyPolicies.document")}
          </p>

          <p className="mt-0.5 text-sm font-medium text-[#202B33]">{version}</p>
        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="mt-4 flex items-center justify-between">
        {/* EDIT */}

        <button
          type="button"
          onClick={() => onEdit(policy)}
          className="
            rounded-md
            border
            border-[#D9E2EC]
            px-3
            py-1.5
            text-sm
            font-medium
            text-[#202B33]
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:bg-[#F5F7F8]
            hover:shadow-sm
            active:translate-y-0
          "
        >
          {t("hrCompanyPolicies.editDocument")}
        </button>

        {/* DOWNLOAD */}

        <button
          type="button"
          className="
            flex
            items-center
            gap-1.5
            text-sm
            font-medium
            text-[#486581]
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:text-[#243B53]
          "
        >
          <Download
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-300
              group-hover:translate-y-[1px]
            "
          />

          {t("hrCompanyPolicies.downloadPdf")}
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   ADD / EDIT POLICY MODAL
===================================================== */

function AddPolicyModal({ onClose, onSave, editingPolicy }) {
  const { t } = useTranslation();

  const getInitialTitle = () => {
    if (!editingPolicy) return "";

    if (editingPolicy.translationKey) {
      return t(
        `hrCompanyPolicies.policies.${editingPolicy.translationKey}.title`,
      );
    }

    return editingPolicy.title || "";
  };

  const getInitialEffectiveDate = () => {
    if (!editingPolicy) return "";

    if (editingPolicy.translationKey) {
      return t(
        `hrCompanyPolicies.policies.${editingPolicy.translationKey}.effectiveDate`,
      );
    }

    return editingPolicy.effectiveDate || "";
  };

  const [title, setTitle] = useState(getInitialTitle());

  const [effectiveDate, setEffectiveDate] = useState(getInitialEffectiveDate());

  const [owner, setOwner] = useState(editingPolicy?.owner || "");

  const isEditing = Boolean(editingPolicy);

  /* =====================================================
     SAVE FORM
  ===================================================== */

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title,
      effectiveDate,
      owner,
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#202B33]/40
        px-4
        animate-[modalOverlayIn_0.2s_ease-out]
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-xl
          bg-white
          p-6
          shadow-xl
          animate-[modalIn_0.3s_ease-out]
        "
      >
        {/* =====================================================
            MODAL HEADER
        ===================================================== */}

        <div className="flex items-center justify-between">
          <h2
            className="
              font-['Manrope']
              text-lg
              font-semibold
              text-[#202B33]
            "
          >
            {isEditing
              ? t("hrCompanyPolicies.editPolicyDocument")
              : t("hrCompanyPolicies.addPolicyDocument")}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-md
              p-1
              text-[#6B7785]
              transition-all
              duration-200
              hover:bg-[#F5F7F8]
              hover:text-[#202B33]
              hover:rotate-90
            "
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <div className="mt-5 grid grid-cols-2 gap-4">
          {/* POLICY TITLE */}

          <div>
            <label className="text-sm font-medium text-[#202B33]">
              {t("hrCompanyPolicies.policyTitle")}
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("hrCompanyPolicies.policyTitlePlaceholder")}
              className="
                mt-1.5
                w-full
                rounded-md
                border
                border-[#D9E2EC]
                px-3
                py-2
                text-sm
                text-[#202B33]
                placeholder:text-[#6B7785]/70
                transition-all
                duration-200
                focus:border-[#486581]
                focus:outline-none
                focus:ring-1
                focus:ring-[#486581]
                focus:shadow-[0_0_0_3px_rgba(72,101,129,0.08)]
              "
            />
          </div>

          {/* EFFECTIVE DATE */}

          <div>
            <label className="text-sm font-medium text-[#202B33]">
              {t("hrCompanyPolicies.effectiveDateLabel")}
            </label>

            <input
              type="text"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              placeholder={t("hrCompanyPolicies.effectiveDatePlaceholder")}
              className="
                mt-1.5
                w-full
                rounded-md
                border
                border-[#D9E2EC]
                px-3
                py-2
                text-sm
                text-[#202B33]
                placeholder:text-[#6B7785]/70
                transition-all
                duration-200
                focus:border-[#486581]
                focus:outline-none
                focus:ring-1
                focus:ring-[#486581]
                focus:shadow-[0_0_0_3px_rgba(72,101,129,0.08)]
              "
            />
          </div>

          {/* OWNER */}

          <div className="col-span-2">
            <label className="text-sm font-medium text-[#202B33]">
              {t("hrCompanyPolicies.owner")}
            </label>

            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder={t("hrCompanyPolicies.ownerPlaceholder")}
              className="
                mt-1.5
                w-full
                rounded-md
                border
                border-[#D9E2EC]
                px-3
                py-2
                text-sm
                text-[#202B33]
                placeholder:text-[#6B7785]/70
                transition-all
                duration-200
                focus:border-[#486581]
                focus:outline-none
                focus:ring-1
                focus:ring-[#486581]
                focus:shadow-[0_0_0_3px_rgba(72,101,129,0.08)]
              "
            />
          </div>
        </div>

        {/* =====================================================
            MODAL BUTTONS
        ===================================================== */}

        <div className="mt-6 flex justify-end gap-3">
          {/* CANCEL */}

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-md
              border
              border-[#D9E2EC]
              px-4
              py-2
              text-sm
              font-medium
              text-[#202B33]
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:bg-[#F5F7F8]
              hover:shadow-sm
              active:translate-y-0
            "
          >
            {t("hrCompanyPolicies.cancel")}
          </button>

          {/* SAVE */}

          <button
            type="button"
            onClick={handleSave}
            className="
              rounded-md
              bg-[#243B53]
              px-4
              py-2
              text-sm
              font-medium
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:bg-[#1c2f43]
              hover:shadow-[0_6px_15px_rgba(36,59,83,0.18)]
              active:translate-y-0
              active:scale-[0.98]
            "
          >
            {isEditing
              ? t("hrCompanyPolicies.saveChanges")
              : t("hrCompanyPolicies.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   COMPANY POLICIES PAGE
===================================================== */

export default function CompanyPolicies() {
  const { t } = useTranslation();

  const [policies, setPolicies] = useState(initialPolicies);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Policy currently being edited
  const [editingPolicy, setEditingPolicy] = useState(null);

  /* =====================================================
     ADD POLICY
  ===================================================== */

  const handleAddPolicy = () => {
    setEditingPolicy(null);
    setIsModalOpen(true);
  };

  /* =====================================================
     EDIT POLICY
  ===================================================== */

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    setIsModalOpen(true);
  };

  /* =====================================================
     SAVE ADD / EDIT
  ===================================================== */

  const handleSavePolicy = ({ title, effectiveDate, owner }) => {
    /* =====================================================
       EDIT EXISTING POLICY
    ===================================================== */

    if (editingPolicy) {
      setPolicies((prev) =>
        prev.map((policy) =>
          policy.id === editingPolicy.id
            ? {
                ...policy,

                // Convert translated policy into editable local data
                translationKey: undefined,

                title,

                effectiveDate:
                  effectiveDate || t("hrCompanyPolicies.emptyDate"),

                description: owner
                  ? t("hrCompanyPolicies.ownedBy", {
                      owner,
                    })
                  : policy.translationKey
                    ? t(
                        `hrCompanyPolicies.policies.${policy.translationKey}.description`,
                      )
                    : policy.description,
              }
            : policy,
        ),
      );
    } else {
      /* =====================================================
         ADD NEW POLICY
      ===================================================== */

      setPolicies((prev) => [
        ...prev,
        {
          id: `${title.toLowerCase().replace(/\s+/g, "-")}-${prev.length}`,

          title,

          description: owner
            ? t("hrCompanyPolicies.ownedBy", {
                owner,
              })
            : "",

          effectiveDate: effectiveDate || t("hrCompanyPolicies.emptyDate"),

          version: t("hrCompanyPolicies.newVersion"),
        },
      ]);
    }

    // Close modal
    setIsModalOpen(false);

    // Clear editing state
    setEditingPolicy(null);
  };

  return (
    <div
      className="
        w-full
        min-w-0
        animate-[pageFadeIn_0.45s_ease-out]
      "
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="
          mb-6
          flex
          items-start
          justify-between
          opacity-0
          animate-[headerIn_0.5s_ease-out_forwards]
        "
      >
        <div>
          <h1
            className="
              font-['Manrope']
              text-2xl
              font-bold
              text-[#202B33]
            "
          >
            {t("hrCompanyPolicies.title")}
          </h1>

          <p className="mt-1 text-sm text-[#6B7785]">
            {t("hrCompanyPolicies.subtitle")}
          </p>
        </div>

        {/* =====================================================
            ADD POLICY BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={handleAddPolicy}
          className="
            group
            flex
            items-center
            gap-2
            rounded-lg
            bg-[#243B53]
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-[2px]
            hover:bg-[#1c2f43]
            hover:shadow-[0_8px_20px_rgba(36,59,83,0.18)]
            active:translate-y-0
            active:scale-[0.98]
          "
        >
          <Plus
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:rotate-90
            "
          />

          <span>{t("hrCompanyPolicies.addPolicyDocument")}</span>
        </button>
      </div>

      {/* =====================================================
          POLICY CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy, index) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            index={index}
            onEdit={handleEditPolicy}
          />
        ))}
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {isModalOpen && (
        <AddPolicyModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingPolicy(null);
          }}
          onSave={handleSavePolicy}
          editingPolicy={editingPolicy}
        />
      )}

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes pageFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes headerIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes policyCardIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalOverlayIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
