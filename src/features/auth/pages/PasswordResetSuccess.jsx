import { useNavigate } from "react-router-dom";
import MainAuthForm from "../components/mainAuthForm";
import "../../../styles/auth/PasswordResetSuccess.css";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <MainAuthForm>
      <div className="password-success-card">
        <div className="success-icon">✓</div>

        <h1>Password reset successfully</h1>

        <p>
          Your password has been reset successfully. You can now login with your
          new password.
        </p>

        <button className="success-button" onClick={() => navigate("/Login")}>
          Go to sign in
        </button>
      </div>
    </MainAuthForm>
  );
};

export default PasswordResetSuccess;
