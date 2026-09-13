import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../Styles/auth/Login.css";
import MainAuthForm from "../components/mainAuthForm";

export default function Login() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    console.log("Login:", {
      contact,
      password,
      rememberMe,
    });

    // هنا بعدين ممكن تربطي الـ API
  };

  return (
    <MainAuthForm>
      {/* Title */}
      <h1 className="title">Welcome Back</h1>

      {/* Subtitle */}
      <p className="subtitle">
        Don't have an account?{" "}
        <Link to="/register" className="signup-link">
          Create one
        </Link>
      </p>

      <form onSubmit={handleSignIn}>
        {/* =====================================================
            CONTACT
        ===================================================== */}

        <div className="form-group">
          <label htmlFor="loginContact">Email or Phone</label>

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
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>

            <input
              id="loginContact"
              type="text"
              placeholder="Enter your email or phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        {/* =====================================================
            PASSWORD
        ===================================================== */}

        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>

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
              <rect x="5" y="10" width="14" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 018 0v3" />
            </svg>

            <input
              id="loginPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show / Hide Password */}
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
        </div>

        {/* =====================================================
            REMEMBER ME + FORGOT PASSWORD
        ===================================================== */}

        <div className="form-options">
          <label className="remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <span className="checkbox">
              {rememberMe && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l4 4L19 6" />
                </svg>
              )}
            </span>

            Remember me
          </label>

          <Link to="/ForgotPassword" className="forgot">
            Forgot Password?
          </Link>
        </div>

        {/* =====================================================
            SIGN IN BUTTON
        ===================================================== */}

        <button type="submit" className="sign-in">
          Sign In
        </button>

        {/* =====================================================
            SEPARATOR
        ===================================================== */}

        <div className="separator">
          <span>OR</span>
        </div>

        {/* =====================================================
            QUICK SIGN IN
        ===================================================== */}

        <button type="button" className="quick-signin">
          <span className="fingerprint">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 11a2 2 0 012 2v1" />
              <path d="M8 13a4 4 0 018 0v2" />
              <path d="M6 13a6 6 0 0112 0v3" />
              <path d="M4 13a8 8 0 0116 0v2" />
              <path d="M10 13a2 2 0 014 0v4" />
            </svg>
          </span>

          <span className="quick-text">
            <span className="quick-title">
              Quick Sign In
            </span>

            <span className="quick-subtitle">
              Use your registered device
            </span>
          </span>

          <svg
            className="arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </MainAuthForm>
  );
}