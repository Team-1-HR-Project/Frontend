import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
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
  const loginMutation = useLogin();
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

    // toast.success(t("auth.login.signingInAlert", { email }));
    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          console.log("Login response:", data);

          toast.success(t("auth.login.signingInAlert", { email }));
        },

        onError: (error) => {
          console.log("Login error:", error);

          toast.error(
            error?.response?.data?.message ||
              "Something went wrong. Please try again.",
          );
        },
      },
    );
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
        {/* <button type="submit" className="sign-in">
          {t("auth.login.signIn")}
        </button> */}
        <button
          type="submit"
          className="sign-in"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : t("auth.login.signIn")}
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
        <FiChevronRight className="arrow" />
      </button>
    </MainAuthForm>
  );
}
