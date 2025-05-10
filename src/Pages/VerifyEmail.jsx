import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import "./verifyEmail.css";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP, signupAPI } from '../services/UserApiCall';
import { setOtp, setUser } from '../Store/Slices/user';

function VerifyEmail() {
  const [userOTP, setUserOTP] = useState('');
  const { otp } = useSelector((state) => state.user)
  const { firstName, lastName, email, password, confirmPassword } = useSelector((state) => state.user.user);

  const inputStyle = {
    width: "3rem",
    height: "3rem",
    fontSize: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
    color: "black",
  };

  const separatorStyle = {
    margin: "0 0.3rem",
    fontSize: "1.5rem",
    color: "#000000",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnResendOtp = async () => {
    const toastId = toast.loading("Loading");
    try {
      let otp = await sendOTP({ email });

      if (otp?.data?.success) {

        // //console.log("OTP.....................", otp);
        dispatch(setOtp(otp?.data?.generateOTP))

      }
    } catch (error) {
      //console.log("Error occured at the time of resending order....,",error);

    }
    finally {
      toast.dismiss(toastId);
    }
  }


  const handleOnSubmit = async () => {
    try {

      //console.log("User Details......................", { firstName, lastName, email, password, confirmPassword, otp: userOTP });

      if (userOTP !== otp) {
        toast.error("Invalid OTP!!!");
        setUserOTP("");
        return;
      }

      let data = await signupAPI({ firstName, lastName, email, password, confirmPassword, otp: userOTP })

      // //console.log("data/...............",data);

      //console.log("signup successfully..................", data?.data?.user?.token, data?.data?.user);

      dispatch(setUser({ token: data?.data?.user?.token, user: { ...data?.data?.user } }))
      localStorage.setItem("token", data?.data?.user?.token);
      localStorage.setItem("sys", JSON.stringify({ ...data?.data?.user }));
      navigate("/dashboard")

    } catch (error) {
      //console.log("Error occured at the time of otp validation....", error);
    }
  }

  const handleOnChange = (otp) => {
    setUserOTP(otp);
  };



  return (


    <div className=" flex justify-center items-center bg-[#f3f4f6] h-[100vh]">
      <div className="bg-[#f3f4f6] flex flex-col gap-12 inside-shadow inset-shadow-sm inset-shadow-indigo-500 p-5 rounded-2xl">

        <h1 className="flex flex-col text-4xl gap-y-5 font-bold text-center text-blue-700">Verify Email</h1>

        <p className='text-xl capitalize'>A verification code has been sent to you. <br />Enter the code below</p>

        <OtpInput
          value={userOTP}
          onChange={handleOnChange}
          numInputs={6}
          renderSeparator={<span style={separatorStyle}>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={inputStyle}
        />

        <div className="flex justify-center">
          <button
            className='bg-blue-500 shadow-lg shadow-blue-500/50 px-4 py-3 rounded-2xl w-full text-white text-2xl cursor-pointer'
            onClick={() => { handleOnSubmit() }}>
            Verify Email
          </button>
        </div>

        <div className="flex justify-between mx-4">
          <Link to="/login">
            <button
              className='bg-cyan-500 shadow-lg shadow-cyan-500/50 py-2 px-2 rounded-2xl w-[150px] font-semibold text-white cursor-pointer'>
              login
            </button>
          </Link>
          <button
            onClick={handleOnResendOtp}
            className='bg-cyan-500 shadow-lg shadow-cyan-500/50 py-2 px-2 rounded-2xl w-[150px] font-semibold text-white cursor-pointer'>
            Resend OTP
          </button>
        </div>

      </div>
    </div>
  );
}

export default VerifyEmail