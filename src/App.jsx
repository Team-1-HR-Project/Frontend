import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./features/auth/pages/Login";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyOTP from "./features/auth/pages/VerifyOTP";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />{" "}
      <Routes>
        {" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />{" "}
        <Route path="/VerifyOTP" element={<VerifyOTP />} />{" "}
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
