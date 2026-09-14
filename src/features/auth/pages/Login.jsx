import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiShield,
  FiChevronRight,
} from "react-icons/fi";

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
      toast.error(t("auth.login.emailPasswordRequired"));
      return;
    }

    toast.success(t("auth.login.signingInAlert", { email }));
  };

  const handleQuickSignIn = () => {
    toast.success(t("auth.login.quickSignInAlert"));
  };

  return (
    <MainAuthForm>
      {/* RIGHT SIDE: FORM */}

      <h1 className="title">{t("auth.login.title")}</h1>

      <p className="subtitle">
        {t("auth.login.noAccount")}{" "}
        <Link to="/register" className="signup-link">
          {t("auth.login.createOne")}
        </Link>
      </p>

      <form onSubmit={handleSignIn}>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">{t("auth.login.workEmail")}</label>

          <div className="input-wrapper">
            <FiMail className="input-icon" />

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
            <FiLock className="input-icon" />

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
              aria-label={
                showPassword
                  ? t("auth.login.hidePassword")
                  : t("auth.login.showPassword")
              }
            >
              {showPassword ? (
                <FiEyeOff id="eyeIcon" />
              ) : (
                <FiEye id="eyeIcon" />
              )}
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

            <span className="checkbox">{rememberMe && <FiCheck />}</span>

            <span>{t("auth.login.rememberMe")}</span>
          </label>

          <Link to="/ForgotPassword" className="forgot">
            {t("auth.login.forgotPassword")}
          </Link>
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
          <FiShield />
        </div>

        <div className="quick-text">
          <div className="quick-title">{t("auth.login.quickSignIn")}</div>

          <div className="quick-subtitle">
            {t("auth.login.quickSignInDesc")}
          </div>
        </div>

        <FiChevronRight className="arrow" />
      </button>
    </MainAuthForm>
  );
}
