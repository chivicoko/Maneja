import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import { KeyboardArrowDown, Menu, NotificationsOutlined, Search } from '@mui/icons-material';
import Sidebar from '../sidebars/Sidebar';
import { Link } from 'react-router-dom';
// import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

const AdminNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  // const {user} = useUser();
  // console.log(user?.firstName);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      <nav className="z-30 py-3 md:py-5 px-4 md:px-6 md:pr-12 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 md:gap-3 w-2/5 md:w-1/5 lg:hidden">
            <Link to="/" className="flex items-center justify-start lg:hidden gap-2">
              <div className="relative w-[48px] h-[48px]">
                <img src="/images/logo.jpg" alt="The Manager's Logo" className='rounded-full' />
              </div>
            </Link>

            <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-700 focus:outline-blue-800">
              <Menu />
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-3 w-4/5 md:px-2 md:w-2/5 justify-self-start">
            <div className="px-1 bg-transparent border hover:border-blue-800 w-full flex items-center justify-between rounded-[4px] focus-within:ring-1 focus-within:ring-blue-800 hover:ring-blue-800">
              <input
                type="text"
                placeholder="Search..."
                name="searchText"
                className="bg-transparent w-full py-2 border-0 text-xs pl-1 focus:outline-0 focus:ring-0 placeholder:text-xs md:text-base text-[#666666] leading-tight"
              />
              <button type="button" className="focus:outline-blue-800">
                <span className="text-[#666666]"><Search className="h-4 w-4 md:h-6 md:w-6" /></span>
              </button>
            </div>

            <button className="md:hidden text-[#333333]"><NotificationsOutlined /></button>
          </div>

          <div className="hidden md:w-2/5 md:flex items-center justify-end">
            <button className="border-r-2 border-blue-800 px-2 text-[#333333] bg-white border-none">
              <NotificationsOutlined />
            </button>
            <Link to='/login' className=''> 
              <span className="px-2 flex items-center justify-between gap-1">
                <span className="text-[#333333]"><AccountCircleIcon /></span>
                <button tabIndex={-1} className="text-[#666666] flex items-center justify-between gap-1 text-sm bg-white">
                  Big Tech
                  <span className="text-[#333333]"><KeyboardArrowDown /></span>
                </button>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {open && (
        <>
          <Sidebar show="block" closeSidebar={closeSidebar} />

          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        </>
      )}
    </>
  );
};

export default AdminNavbar;
