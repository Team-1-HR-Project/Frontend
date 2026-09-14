import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../Styles/auth/Login.css";
import MainAuthForm from "../components/mainAuthForm";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert(t("auth.login.emailPasswordRequired"));
      return;
    }

    alert(t("auth.login.signingInAlert", { email }));
  };

  const handleQuickSignIn = () => {
    alert(t("auth.login.quickSignInAlert"));
  };

  return (
    <MainAuthForm>
      {/* RIGHT SIDE: FORM */}

      <h1 className="title">{t("auth.login.title")}</h1>

      <p className="subtitle">
        {t("auth.login.noAccount")}{" "}
        <a href="/register" className="signup-link">
          {t("auth.login.createOne")}
        </a>
      </p>

      <form onSubmit={handleSignIn}>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">{t("auth.login.workEmail")}</label>

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
              id="email"
              type="email"
              placeholder={t("auth.login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">{t("auth.login.password")}</label>

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
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="password-toggle"
              type="button"
              onClick={togglePassword}
              aria-label={showPassword ? t("auth.login.hidePassword") : t("auth.login.showPassword")}
            >
              <svg
                id="eyeIcon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="form-options">
          <label className="remember">
            <input
              type="checkbox"
              id="remember"
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

            <span>{t("auth.login.rememberMe")}</span>
          </label>

          <a href="/ForgotPassword" className="forgot">
            {t("auth.login.forgotPassword")}
          </a>
        </div>

        {/* Sign In Button */}
        <button type="submit" className="sign-in">
          {t("auth.login.signIn")}
        </button>
      </form>

      {/* OR Separator */}
      <div className="separator">
        <span>{t("auth.login.or")}</span>
      </div>

      {/* Quick Sign In */}
      <button
        className="quick-signin"
        type="button"
        onClick={handleQuickSignIn}
      >
        <div className="fingerprint">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10a5 5 0 0110 0c0 5-1 8-3 10" />
            <path d="M9 10a3 3 0 016 0c0 4-.5 7-2 9" />
            <path d="M5 10a7 7 0 0114 0c0 4-.5 7-2 10" />
            <path d="M11 10a1 1 0 012 0c0 4-.3 6-1 8" />
            <path d="M3 10a9 9 0 0118 0c0 3-.5 6-1.5 8" />
            <path d="M8 14c-.2 2-.7 4-1.5 5" />
            <path d="M16 14c-.1 2-.4 3.5-1 5" />
          </svg>
        </div>

        <div className="quick-text">
          <div className="quick-title">{t("auth.login.quickSignIn")}</div>

          <div className="quick-subtitle">{t("auth.login.quickSignInDesc")}</div>
        </div>

        <svg
          className="arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </MainAuthForm>
  );
}