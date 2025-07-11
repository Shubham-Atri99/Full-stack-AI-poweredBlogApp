import React from 'react'

const Header = () => {
  return (
    <div className=' mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className=' text-center mt-20  mb-8'>
            <div className=' inline-flex  items-center  justify-center  gap-8 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 
             rounded-full  text-sm text-primary'>
                <p>New: AI feature integerated</p>

            </div>
           <div>
            <h1 className=' font-bold  text-7xl'>your own <span className=' text-primary'>blogging</span> <br />platform</h1>
            <p className='  text-1xl text-gray-500 my-6 m-auto'>this is your space to think out loud and present your views on different areas</p>

            <form action="">
               <input
             type="text"
             placeholder="Search..."
             className=" px-4 py-1.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500  mr-1"
  />
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-primary transition">Search</button>
            </form>
           </div>

        </div>
    </div>
  )
}

export default Header