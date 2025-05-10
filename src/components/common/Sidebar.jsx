import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../services/UserApiCall';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Store/Slices/user';
import toast from 'react-hot-toast';
import { HiOutlineViewGrid } from "react-icons/hi";
import { FaTasks, FaSignOutAlt } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";


const sidebarLinks = [
    {
        label: "Dashboard",
        link: "/dashboard",
        icon: <HiOutlineViewGrid size={20} />
    },
    {
        label: "Task",
        link: "/tasks",
        icon: <FaTasks size={20} />
    },
    {
        label: "Logout",
        link: "/logout",
        icon: <FaSignOutAlt size={20} />
    }
];

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = () => {
        LogoutUser();
        dispatch(clearUser({ token: null, user: null }));
        toast.success("Logout successfully....")
        navigate("/login");
    }

    return (
        <div className='w-full h-full flex flex-col gap-6 p-5'>

            <h1 className='flex gap-2 items-center'>
                <p className='text-blue-500 font-bold'>
                    <MdAddTask size={50} />
                </p>
                <span className='text-2xl font-bold text-black'>
                    Task Manager</span>
            </h1>

            <div className="flex flex-col gap-y-5 py-8">
                {
                    sidebarLinks.map((link, key) => (
                        link.label === "Logout" ? (
                            <button
                                key={key}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
                                onClick={handleLogout}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </button>
                        ) : (
                            <NavLink
                                to={link.link}
                                key={key}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-md transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
                                    }`
                                }
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </NavLink>
                        )
                    ))
                }
            </div>

        </div>
    );
}

export default Sidebar;
