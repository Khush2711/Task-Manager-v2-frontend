import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePassword } from "../services/UserApiCall";

function ResetPassword() {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating password...");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      toast.dismiss(toastId);
      return;
    }

    try {
      // { password, confirmPassword, token }
      const response = await updatePassword({ password, confirmPassword, token: resetToken }
      );
      
      // //console.log("repsonse..........",response);
      if (response?.data?.success) {
        setSuccess(true);
        toast.success("Password updated successfully!");
      } else {
        toast.error(response?.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <div className="flex flex-col text-black w-[300px] gap-4 bg-blue-200 p-4 shadow rounded-2xl">
        <h1 className="text-black font-bold text-2xl">
          {!success ? "Create New Password" : "Success"}
        </h1>

        <p className="text-sm">
          {!success
            ? "Enter your new password below to reset your account."
            : "Your password has been successfully updated."}
        </p>

        {!success && (
          <form onSubmit={handleSubmit}>
            <label>
              <p className="my-2">
                New Password <span className="text-pink-800">*</span>
              </p>
              <input
                type="password"
                required
                className="focus:outline-none bg-white custom-box-shadow w-full px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              <p className="my-2">
                Confirm Password <span className="text-pink-800">*</span>
              </p>
              <input
                type="password"
                required
                className="focus:outline-none bg-white custom-box-shadow w-full px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 transition-all duration-300 hover:shadow hover:shadow-amber-200 hover:text-blue-400 text-black my-5"
            >
              Reset Password
            </button>
          </form>
        )}

        <div>
          <Link to="/login">
            <p className="flex items-center gap-2 hover:text-shadow-lg transition-all duration-300 px-5 py-1 hover:shadow-blue-400 rounded-2xl justify-center hover:shadow
">
              <span>←</span> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
