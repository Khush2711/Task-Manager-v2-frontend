import React from 'react'
import { useLocation } from 'react-router-dom'
import Login from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';

function Template() {

    const location = useLocation();
    const path = location.pathname;



    return (<>

        <div className='flex flex-col justify-between items-center sm:bg-blue-700 sm:flex-row pt-11 sm:pt-0'>


                <div className='w-full flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
                    <div className='w-[80vw] sm:min-h-screen md:w-auto flex gap-0  flex-col md:flex-row items-center justify-center'>
                        {/* left side */}
                        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center '>
                            <div className='w-[80vw] md:w-[40vw] 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20 '>
                                <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
                                    Manage all your task in one place!
                                </span>
                                <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
                                    <span>Cloud-Based</span>
                                    <span>Task Manager</span>
                                </p>

                                <div className='cell'>
                                    <div className='circle rotate-in-up-left'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="">
                    {
                        path === "/login" ? (<Login />) : (<SignupForm />)
                    }
                </div>


            </div>

        </>

        )
}

        export default Template;