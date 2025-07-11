
import React from 'react'

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='flex flex-col  border-r  border-gray-200 min-h-full pt-6'>
      <NavLink end={true} to={'/admin'} className={({isActive})=>  `flex  items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer ${isActive&& " bg-primary/10 border-r-4 border-primary"}` }>
        
        <p className=' hidden md:inline-block'>Dashboard</p>
      </NavLink>
      <NavLink  to={'/admin/addBlog'} className={({isActive})=>  `flex  items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer ${isActive&& " bg-primary/10 border-r-4 border-primary"}` }>
        
        <p className=' hidden md:inline-block'>AddBlog</p>
      </NavLink>
      <NavLink  to={'/admin/listBlog'} className={({isActive})=>  `flex  items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer ${isActive&& " bg-primary/10 border-r-4 border-primary"}` }>
        
        <p className=' hidden md:inline-block'>Blog list</p>
      </NavLink>
      <NavLink  to={'/admin/Comments'} className={({isActive})=>  `flex  items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer ${isActive&& " bg-primary/10 border-r-4 border-primary"}` }>
        
        <p className=' hidden md:inline-block'>comments</p>
      </NavLink>
    </div>
    
  )
}

export default Sidebar