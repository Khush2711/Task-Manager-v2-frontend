import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import BottomNavigation from '../common/BottomNavigation';

function Layout() {

  const { token } = useSelector((state) => state.user);

  return (
    <>

      {
        token ? (
          <>

            <div className='w-full h-screen flex flex-col md:flex-row'>

              <div className="w-1/5 h-screen bg-white sticky top-0 hidden xl:block">
                {/* sidebar */}
                <Sidebar />
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* navbar */}

                <div className="p-4 2xl:px-10">
                  <Outlet />
                </div>

              </div>


            </div>
            <div className="bottomNavigation xl:hidden ">
              <BottomNavigation />
            </div>

          </>
        )
          :
          (<></>)
      }

    </>
  )
}

export default Layout