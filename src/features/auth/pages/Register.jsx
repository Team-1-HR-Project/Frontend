import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainAuthForm from "../components/mainAuthForm";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");
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

    setMessage("");
    setMessageType("");

    // Required fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !contact.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      return;
    }

    // Password requirements
    if (!hasMinLength || !hasLetter || !hasNumber) {
      setMessage(
        "Please make sure your password meets all requirements."
      );
      setMessageType("error");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    // Success
    setMessage(
      `Account created successfully for ${firstName} ${lastName}.`
    );
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
      <h1 className="title">Create an account</h1>

      <p className="subtitle">
        Already have an account?{" "}
        <Link to="/login" className="signup-link">
          Sign in
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
              First Name
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
                placeholder="Enter your first name"
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
              Last Name
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
                placeholder="Enter your last name"
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
            Contact
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
              placeholder="Enter your email or phone number"
              value={contact}
              onChange={(e) =>
                setContact(e.target.value)
              }
            />
          </div>

          <span className="field-hint">
            You can register using either an email address
            or a phone number.
          </span>
        </div>

        {/* =========================
            PASSWORD
        ========================= */}

        <div className="form-group password-group">
          <label htmlFor="password">
            Password
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
              placeholder="Enter your password"
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
                  ? "Hide password"
                  : "Show password"
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
              8+ characters
            </span>

            <span
              className={`hint-item ${
                hasLetter ? "valid" : ""
              }`}
            >
              <span className="dot"></span>
              Contains a letter
            </span>

            <span
              className={`hint-item ${
                hasNumber ? "valid" : ""
              }`}
            >
              <span className="dot"></span>
              Contains a number
            </span>
          </div>
        </div>

        {/* =========================
            CONFIRM PASSWORD
        ========================= */}

        <div className="form-group password-group">
          <label htmlFor="confirmPassword">
            Confirm Password
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
              placeholder="Re-enter your password"
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
                  ? "Hide confirm password"
                  : "Show confirm password"
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
                Passwords do not match.
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
          Create Account
        </button>

        {/* =========================
            MESSAGE
        ========================= */}

        {message && (
          <div
            className={`form-message ${messageType}`}
          >
            <span className="message-icon">
              {messageType === "success" ? "✓" : "!"}
            </span>

            <span>{message}</span>
          </div>
        )}

        {/* =========================
            TERMS
        ========================= */}

        <p className="terms-text">
          By creating an account, you agree to Smart HR's{" "}
          <a href="#terms">Terms of Service</a> and{" "}
          <a href="#privacy">Privacy Policy</a>.
        </p>
      </form>
    </MainAuthForm>
  );
}