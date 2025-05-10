import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Task from './Pages/Task';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import OpenRoute from "./components/Auth/OpenRoute";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './Store/Slices/user';
import Layout from './components/Dashboard/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import ResetPassword from './Pages/ResetPassword';
import VerifyEmail from './Pages/VerifyEmail';
import ForgotPassword from './Pages/ForgotPassword';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("sys");
    const currentPath = location.pathname;

    const publicPaths = ["/login", "/signup", "/verify", "/forgot-password"];
    const isResetPasswordPath = currentPath.startsWith("/update-password");

    if (token) {
      dispatch(setUser({ token, user: JSON.parse(user) }));
    } else if (!publicPaths.includes(currentPath) && !isResetPasswordPath) {
      navigate("/login");
    }
  }, []);




  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>

        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />

        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />

        <Route path="/verify" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />


        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />

        <Route path="/update-password/:resetToken" element={
          <OpenRoute>
            <ResetPassword />
          </OpenRoute>
        } />


        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Task />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
