import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../styles/auth/ForgotPassword.css";
import MainAuthForm from "../components/mainAuthForm";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert(t("auth.forgotPassword.emailRequired"));
      return;
    }

    alert(t("auth.forgotPassword.otpSent", { email }));
  };

  return (
    <MainAuthForm>
      <h1 className="title">{t("auth.forgotPassword.title")}</h1>

      <p className="subtitle">
        {t("auth.forgotPassword.subtitle")}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">{t("auth.forgotPassword.workEmail")}</label>

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
              placeholder={t("auth.forgotPassword.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="sign-in">
          {t("auth.forgotPassword.sendCode")}
        </button>
      </form>

      <div className="back-login">
        <a href="/login">{t("auth.forgotPassword.backToSignIn")}</a>
      </div>
    </MainAuthForm>
  );
}
