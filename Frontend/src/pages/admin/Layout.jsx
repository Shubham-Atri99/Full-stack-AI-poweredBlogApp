import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { Outlet } from 'react-router-dom'; // ✅ Import Outlet
import { useAppcontext } from '../../contexts/AppContext';

const Layout = () => {
  
  const {axios,settoken,navigate}=useAppcontext();

 const logout=()=>{
 localStorage.removeItem('token')
 axios.defaults.headers.common['Authorization']=null;
 settoken(null)
 navigate('/');
 }
  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex-shrink-0">
                  <h1
                    onClick={() => navigate('/')}
                    className="text-2xl font-bold text-primary cursor-pointer"
                  >
                    Blogify
                  </h1>
                </div>

                <div className="hidden sm:block">
                  <button 
                  onClick={logout}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-primary transition">
                    logout
                  </button>
                </div>

                <div className="sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden px-4 pb-3">
              <button 
              onClick={logout}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition">
                logout
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet /> 
        </div>
      </div>
    </>
  );
};

export default Layout;
