import { useState } from "react";
import "../../../Styles/auth/ResetPassword.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainAuthForm from "../components/mainAuthForm";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const strengthScore =
    Object.values(passwordRequirements).filter(Boolean).length;
  const strengthPercentage = (strengthScore / 5) * 100;

  return (
    <MainAuthForm>
      <div className="reset-password-card">
        <h1>Create a new password</h1>

        <p className="reset-password-description">
          Your new password must be different from your previous password.
        </p>

        {/* New Password */}
        <div className="password-field">
          <label htmlFor="newPassword">New password</label>

          <div className="password-input-wrapper">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Password Strength */}
        <div className="password-strength">
          <div className="strength-bar">
            <div
              className="strength-bar-fill"
              style={{ width: `${strengthPercentage}%` }}
            ></div>
          </div>

          <span>Password strength</span>

          <div className="requirements">
            <div
              className={
                passwordRequirements.length
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle"></span>
              At least 8 characters
            </div>

            <div
              className={
                passwordRequirements.uppercase
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle"></span>
              One uppercase letter
            </div>

            <div
              className={
                passwordRequirements.lowercase
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle"></span>
              One lowercase letter
            </div>

            <div
              className={
                passwordRequirements.number
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle"></span>
              One number
            </div>

            <div
              className={
                passwordRequirements.special
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle"></span>
              One special character
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="password-field confirm-field">
          <label htmlFor="confirmPassword">Confirm new password</label>

          <div className="password-input-wrapper">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button className="reset-password-button">Reset password</button>
      </div>
    </MainAuthForm>
  );
};

export default ResetPassword;
