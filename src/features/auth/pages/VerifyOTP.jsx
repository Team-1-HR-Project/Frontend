import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import "../../../Styles/VerifyOTP.css";
import MainAuthForm from "../components/mainAuthForm";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);

  // Timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input
  const handleChange = (value, index) => {
    // Allow numbers only
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter the 6-digit verification code.");
      return;
    }

    toast.success("OTP verified successfully!");
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);

    inputRefs.current[0]?.focus();

    toast.success("A new verification code has been sent!");
  };

  return (
    <MainAuthForm>
      <h1 className="title">Verify Your Email</h1>

      <p className="subtitle">
        Enter the 6-digit verification code sent to your email.
      </p>

      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label>Verification Code</label>

          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input"
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="sign-in">
          Verify Code
        </button>
      </form>

      <div className="resend-code">
        {timer > 0 ? (
          <span>
            Resend code in{" "}
            <strong>00:{timer.toString().padStart(2, "0")}</strong>
          </span>
        ) : (
          <>
            <span>Didn't receive the code?</span>

            <button type="button" onClick={handleResend}>
              Resend Code
            </button>
          </>
        )}
      </div>

      <div className="back-login">
        <a href="/login">← Back to Sign In</a>
      </div>
    </MainAuthForm>
  );
}
