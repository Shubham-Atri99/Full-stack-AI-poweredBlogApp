import React from 'react'

const Newletter = () => {
  return (
   <div className=' flex  flex-col  justify-center text-center  mt-3'>
    <h1 className='   text-4xl  font-semibold' >Never miss a Blog!</h1>
    <p className=' text-2xl  text-gray-700 mt-2 px-2 mb-4'>Subscribe to get the latest notification</p>
    <form action="" className=' p-4'>
               <input
             type="text"
             placeholder="Search..."
             className=" px-4 py-1.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500  mr-1"
  />
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-primary transition">Search</button>
            </form>
   </div>
  )
}

export default Newletter