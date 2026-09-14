import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../styles/auth/ResetPassword.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainAuthForm from "../components/mainAuthForm";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const strengthScore =
    Object.values(passwordRequirements).filter(Boolean).length;

  const strengthPercentage = (strengthScore / 5) * 100;

  const handleResetPassword = async () => {
    setError("");

    // Check password requirements
    if (strengthScore < 5) {
      setError(t("auth.resetPassword.errorRequirements"));
      return;
    }

    // Check matching passwords
    if (newPassword !== confirmPassword) {
      setError(t("auth.resetPassword.errorMismatch"));
      return;
    }

    try {
      setIsLoading(true);

      // مؤقتًا للتجربة
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // لو الـ reset نجح
      navigate("/password-reset-success");
    } catch (err) {
      setError(err.message || t("auth.resetPassword.errorGeneric"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainAuthForm>
      <div className="reset-password-card">
        <h1>{t("auth.resetPassword.title")}</h1>

        <p className="reset-password-description">
          {t("auth.resetPassword.subtitle")}
        </p>

        {/* New Password */}
        <div className="password-field">
          <label htmlFor="newPassword">{t("auth.resetPassword.newPassword")}</label>

          <div className="password-input-wrapper">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder={t("auth.resetPassword.newPasswordPlaceholder")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Password Strength */}
        <div className="password-strength">
          <div className="strength-bar">
            <div
              className="strength-bar-fill"
              style={{ width: `${strengthPercentage}%` }}
            />
          </div>

          <span>{t("auth.resetPassword.strength")}</span>

          <div className="requirements">
            <div
              className={
                passwordRequirements.length
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              {t("auth.resetPassword.reqLength")}
            </div>

            <div
              className={
                passwordRequirements.uppercase
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              {t("auth.resetPassword.reqUppercase")}
            </div>

            <div
              className={
                passwordRequirements.lowercase
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              {t("auth.resetPassword.reqLowercase")}
            </div>

            <div
              className={
                passwordRequirements.number
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              {t("auth.resetPassword.reqNumber")}
            </div>

            <div
              className={
                passwordRequirements.special
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              {t("auth.resetPassword.reqSpecial")}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="password-field confirm-field">
          <label htmlFor="confirmPassword">{t("auth.resetPassword.confirmPassword")}</label>

          <div className="password-input-wrapper">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("auth.resetPassword.confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && <p className="reset-password-error">{error}</p>}

        <button
          className="reset-password-button"
          onClick={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? t("auth.resetPassword.resetting") : t("auth.resetPassword.resetButton")}
        </button>
      </div>
    </MainAuthForm>
  );
};

export default ResetPassword;
