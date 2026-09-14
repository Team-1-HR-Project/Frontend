import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainAuthForm from "../components/mainAuthForm";

export default function Register() {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [messageKey, setMessageKey] = useState("");
  const [messageParams, setMessageParams] = useState(null);
  const [messageType, setMessageType] = useState("");

  /* =========================
     PASSWORD VALIDATION
  ========================= */

  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  /* =========================
     REGISTER
  ========================= */

  const handleRegister = (e) => {
    e.preventDefault();

    setMessageKey("");
    setMessageParams(null);
    setMessageType("");

    // Required fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !contact.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessageKey("auth.register.errorRequired");
      setMessageType("error");
      return;
    }

    // Password requirements
    if (!hasMinLength || !hasLetter || !hasNumber) {
      setMessageKey("auth.register.errorRequirements");
      setMessageType("error");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      setMessageKey("auth.register.errorMismatch");
      setMessageType("error");
      return;
    }

    // Success
    setMessageKey("auth.register.successMessage");
    setMessageParams({ firstName, lastName });
    setMessageType("success");

    console.log("Register:", {
      firstName,
      lastName,
      contact,
      password,
    });
  };

  return (
    <MainAuthForm>
      <h1 className="title">{t("auth.register.title")}</h1>

      <p className="subtitle">
        {t("auth.register.alreadyHaveAccount")}{" "}
        <Link to="/login" className="signup-link">
          {t("auth.register.signIn")}
        </Link>
      </p>

      <form
        onSubmit={handleRegister}
        className="register-form"
      >
        {/* =========================
            FIRST NAME + LAST NAME
        ========================= */}

        <div className="form-row">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">
              {t("auth.register.firstName")}
            </label>

            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>

              <input
                id="firstName"
                type="text"
                placeholder={t("auth.register.firstNamePlaceholder")}
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">
              {t("auth.register.lastName")}
            </label>

            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>

              <input
                id="lastName"
                type="text"
                placeholder={t("auth.register.lastNamePlaceholder")}
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* =========================
            CONTACT
        ========================= */}

        <div className="form-group">
          <label htmlFor="contact">
            {t("auth.register.contact")}
          </label>

          <div className="input-wrapper">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              />
              <path d="M3 7l9 6 9-6" />
            </svg>

            <input
              id="contact"
              type="text"
              placeholder={t("auth.register.contactPlaceholder")}
              value={contact}
              onChange={(e) =>
                setContact(e.target.value)
              }
            />
          </div>

          <span className="field-hint">
            {t("auth.register.contactHint")}
          </span>
        </div>

        {/* =========================
            PASSWORD
        ========================= */}

        <div className="form-group password-group">
          <label htmlFor="password">
            {t("auth.register.password")}
          </label>

          <div className="input-wrapper">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="11"
                rx="2"
              />
              <path d="M8 10V7a4 4 0 018 0v3" />
            </svg>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.register.passwordPlaceholder")}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              aria-label={
                showPassword
                  ? t("auth.register.hidePassword")
                  : t("auth.register.showPassword")
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showPassword ? (
                  <>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 4.2A10.7 10.7 0 0112 4c7 0 10 8 10 8a16.4 16.4 0 01-3.1 4.5" />
                    <path d="M6.6 6.6C3.8 8.5 2 12 2 12s3 8 10 8a10.5 10.5 0 004-.8" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Password Hints */}
          <div className="password-hints">
            <span
              className={`hint-item ${
                hasMinLength ? "valid" : ""
              }`}
            >
              <span className="dot"></span>
              {t("auth.register.reqLength")}
            </span>

            <span
              className={`hint-item ${
                hasLetter ? "valid" : ""
              }`}
            >
              <span className="dot"></span>
              {t("auth.register.reqLetter")}
            </span>

            <span
              className={`hint-item ${
                hasNumber ? "valid" : ""
              }`}
            >
              <span className="dot"></span>
              {t("auth.register.reqNumber")}
            </span>
          </div>
        </div>

        {/* =========================
            CONFIRM PASSWORD
        ========================= */}

        <div className="form-group password-group">
          <label htmlFor="confirmPassword">
            {t("auth.register.confirmPassword")}
          </label>

          <div className="input-wrapper">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="11"
                rx="2"
              />
              <path d="M8 10V7a4 4 0 018 0v3" />
            </svg>

            <input
              id="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder={t("auth.register.confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              aria-label={
                showConfirmPassword
                  ? t("auth.register.hideConfirmPassword")
                  : t("auth.register.showConfirmPassword")
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showConfirmPassword ? (
                  <>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 4.2A10.7 10.7 0 0112 4c7 0 10 8 10 8a16.4 16.4 0 01-3.1 4.5" />
                    <path d="M6.6 6.6C3.8 8.5 2 12 2 12s3 8 10 8a10.5 10.5 0 004-.8" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Confirm Password Error */}
          {confirmPassword &&
            password !== confirmPassword && (
              <span className="confirm-error">
                {t("auth.register.errorMismatch")}
              </span>
            )}
        </div>

        {/* =========================
            CREATE ACCOUNT BUTTON
        ========================= */}

        <button
          type="submit"
          className="submit-btn"
        >
          {t("auth.register.createAccount")}
        </button>

        {/* =========================
            MESSAGE
        ========================= */}

        {messageKey && (
          <div
            className={`form-message ${messageType}`}
          >
            <span className="message-icon">
              {messageType === "success" ? "✓" : "!"}
            </span>

            <span>{t(messageKey, messageParams)}</span>
          </div>
        )}

        {/* =========================
            TERMS
        ========================= */}

        <p className="terms-text">
          {t("auth.register.agreePrefix")}
          <a href="#terms">{t("auth.register.termsOfService")}</a>
          {t("auth.register.and")}
          <a href="#privacy">{t("auth.register.privacyPolicy")}</a>
          {t("auth.register.termsSuffix")}
        </p>
      </form>
    </MainAuthForm>
  );
}