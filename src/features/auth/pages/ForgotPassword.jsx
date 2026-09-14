import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import "../../../styles/auth/ForgotPassword.css";
import MainAuthForm from "../components/mainAuthForm";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(t("auth.forgotPassword.emailRequired"));
      return;
    }

    toast.success(t("auth.forgotPassword.otpSent", { email }));

    setTimeout(() => {
      navigate("/VerifyOTP");
    }, 1500);
    // Navigate to Verify OTP after showing the toast
  };

  return (
    <MainAuthForm>
      <h1 className="title">{t("auth.forgotPassword.title")}</h1>

      <p className="subtitle">{t("auth.forgotPassword.subtitle")}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">{t("auth.forgotPassword.workEmail")}</label>

          <div className="input-wrapper">
            <FiMail className="input-icon" />

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
    </MainAuthForm>
  );
}
