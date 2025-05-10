import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginAPI } from '../../services/UserApiCall';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../Store/Slices/user';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      //console.log('Login Data:', data);
      let response = await LoginAPI(data);
      //console.log("data-------------", response);

      if (response?.data?.success) {
        const token = response?.data?.user?.token;

        // dispatch(setUser());
        dispatch(setUser({ token, user: response?.data?.user }));

        localStorage.setItem("token", token);
        localStorage.setItem("sys", JSON.stringify(response?.data?.user));


        navigate("/dashboard");
      }
    } catch (error) {
      //console.log("error occured in onSubmit......", error);
    }

  };

  return (
    <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
      {/* <h2>Login</h2> */}
      <form onSubmit={handleSubmit(onSubmit)} className="form-container w-full md:w-[400px] flex flex-col gap-y-4 bg-white px-10 pt-14 pb-14 shadow-xl/30">

        <div className=''>
          <p className='text-blue-600 text-3xl font-bold text-center'>
            Welcome back!
          </p>
          <p className='text-center text-base text-gray-700 '>
            Keep all your credential safge.
          </p>
        </div>


        {/* Email Field */}
        <div className='flex flex-col gap-y-1'>
          <label htmlFor="email">Email Address  </label>
          <input
            type="email"
            id="email"
            className='border border-blue-500 rounded-full px-5 py-2'
            {...register("email", {
              required: "Email is required"
            })}
          />
          {errors.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className='flex flex-col gap-y-1'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className='border border-blue-500 rounded-full px-5 py-2'
            {...register("password", {
              required: "Password is required",
              minLength: {
                // value: 6,
                message: "Password must be at least 6 characters long"
              }
            })}
          />
          {errors.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}
        </div>

        <Link to="/forgot-password" className='text-blue-500 hover:text-shadow-lg transition-all duration-200'>Forgot Password?</Link>

        {/* Submit Button */}
        <div className='flex flex-col gap-y-4 w-full'>
          <button
            type="submit"
            className='p-2 w-full text-white rounded-full cursor-pointer bg-blue-500 shadow-lg shadow-blue-500/50'
          >
            Login
          </button>

          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>


        </div>



      </form>
    </div>
  );
};

export default Login;
