import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordToken } from "../services/UserApiCall";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading.....");
    try {
      let resetPasswordTokenRes = await resetPasswordToken(email);
      //console.log("REsponse............", resetPasswordTokenRes);
      if (!resetPasswordTokenRes) return;
      setEmailSent(true);
      toast.success("Mail Send Successfully....");
    } catch (error) {
      console.error("Error in resetPasswordToken:", error);
    }
    finally{
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <div className="flex flex-col text-black w-[300px] gap-4 bg-blue-200 p-4 shadow rounded-2xl">
        <h1 className="text-black font-bold text-2xl">
          {!emailSent ? "Reset Your Password" : "Check Your Email"}
        </h1>
        <p className=" text-sm">
          {!emailSent
            ? "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email we can try another recovery."
            : `We have sent the reset email to ${email}`}
        </p>

        <form onSubmit={handleOnSubmit}>
          {!emailSent && (
            <label>
              <p className=" my-2">
                Email Address <span className="text-pink-800">*</span>
              </p>
              <input
                className="focus:outline-none bg-white custom-box-shadow w-full px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-black"
                type="email"
                placeholder="Enter Email ID"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          )}

          <button
            type="submit"
            className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black my-5"
          >
            {!emailSent ? "Reset Password" : "Resend Email"}
          </button>

          <div>
            <Link to="/login">
              <p className="flex items-center gap-2">
                <span>←</span> Back To Login
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
