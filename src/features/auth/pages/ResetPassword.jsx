import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/auth/ResetPassword.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MainAuthForm from "../components/mainAuthForm";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleResetPassword = async () => {
    setError("");

    // Check password requirements
    if (strengthScore < 5) {
      setError("Please meet all password requirements.");
      return;
    }

    // Check matching passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      // هنا تحطي API بتاع الـ backend
      // مثال:
      //
      // const response = await axios.post("/api/reset-password", {
      //   password: newPassword,
      // });
      //
      // if (!response.data.success) {
      //   throw new Error(response.data.message);
      // }

      // مؤقتًا للتجربة
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // لو الـ reset نجح
      navigate("/password-reset-success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            />
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
              <span className="requirement-circle" />
              At least 8 characters
            </div>

            <div
              className={
                passwordRequirements.uppercase
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              One uppercase letter
            </div>

            <div
              className={
                passwordRequirements.lowercase
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              One lowercase letter
            </div>

            <div
              className={
                passwordRequirements.number
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
              One number
            </div>

            <div
              className={
                passwordRequirements.special
                  ? "requirement valid"
                  : "requirement"
              }
            >
              <span className="requirement-circle" />
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
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && <p className="reset-password-error">{error}</p>}

        <button
          className="reset-password-button"
          onClick={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset password"}
        </button>
      </div>
    </MainAuthForm>
  );
};

export default ResetPassword;
