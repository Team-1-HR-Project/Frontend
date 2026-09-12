import React, { useState } from "react";
import "../../../Styles/ForgotPassword.css";
import MainAuthForm from "../components/mainAuthForm";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your work email.");
      return;
    }

    alert(`OTP sent to ${email}`);
  };

  return (
    <MainAuthForm>
      <h1 className="title">Forgot Password?</h1>

      <p className="subtitle">
        Enter your work email and we'll send you a verification code.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Work Email</label>

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
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="sign-in">
          Send Verification Code
        </button>
      </form>

      <div className="back-login">
        <a href="/login">← Back to Sign In</a>
      </div>
    </MainAuthForm>
  );
}
