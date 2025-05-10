import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// import { SignupAPI } from '../../services/UserApiCall';
import { setOtp, setUser } from '../../Store/Slices/user';
import toast from 'react-hot-toast';
import { sendOTP } from '../../services/UserApiCall';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let toastID = toast.loading('Loading...');
    try {

      let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let mail = data.email;
      if (!regex.test(mail)) {
        toast.error(`${data.email} is invalid email id.....`)
      }
      //console.log('Signup Data:', data);

      if (data.password != data.confirmPassword) {
        toast.error("Password and confirm password both are different!!!")
        return;
      }

      let otp = await sendOTP({ email: data.email });

      if (otp?.data?.success) {

        // //console.log("OTP.....................", otp);
        dispatch(setOtp(otp?.data?.generateOTP))

        const user = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        };

        dispatch(setUser({ user }));

        toast.dismiss(toastID);
        navigate("/verify");
      }

    } catch (error) {
      console.error("Error in Signup:", error);
    }
    finally {
      toast.dismiss(toastID);
    }
  };

  return (
    <div className="w-full md:w-1/3 md:p-1 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container w-full md:w-[400px] flex flex-col gap-y-2 bg-white px-10 pt-14 pb-14 shadow-xl/30">

        <div className='text-center'>
          <p className='text-blue-600 text-3xl font-bold'>Join Us!</p>
          <p className='text-base text-gray-700'>Create your account below.</p>
        </div>

        {/* First Name */}
        <div className='flex flex-col gap-y-1'>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            className='border border-blue-500 rounded-full px-5 py-2'
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <p className='text-xs text-red-600'>{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className='flex flex-col gap-y-1'>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            className='border border-blue-500 rounded-full px-5 py-2'
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <p className='text-xs text-red-600'>{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div className='flex flex-col gap-y-1'>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className='border border-blue-500 rounded-full px-5 py-2'
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className='flex flex-col gap-y-1'>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className='border border-blue-500 rounded-full px-5 py-2'
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className='flex flex-col gap-y-1'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className='border border-blue-500 rounded-full px-5 py-2'
            {...register("confirmPassword", {
              required: "Confirm your password"
            })}
          />
          {errors.confirmPassword && <p className='text-xs text-red-600'>{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
        <div className='flex flex-col gap-y-4 mt-2 w-full'>
          <button type="submit" className='p-2 w-full text-white rounded-full bg-blue-500 shadow-lg shadow-blue-500/50'>
            Sign up
          </button>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
