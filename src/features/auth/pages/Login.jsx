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

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked!");
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

      {/* Google Sign In */}
      <button
        className="quick-signin"
        type="button"
        onClick={handleGoogleSignIn}
        style={{ justifyContent: "center", gap: "10px" }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#10243a" }}>
          {t("auth.login.googleSignIn", "Sign in with Google")}
        </span>
      </button>
    </MainAuthForm>
  );
}