import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppcontext } from '../../contexts/AppContext'
import toast from 'react-hot-toast'

const ListBlog = () => {
  const [allBlogs, setallBlogs] = useState([])
  const {axios}=useAppcontext();

  const fetchfullBlogs= async()=>{
     try {
      const {data}=await axios.get('/api/admin/blogs');
      if (data.success) {
        setallBlogs(data.blogs);
      } else {
       toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
     }
     
  }
  useEffect(() => {
    fetchfullBlogs();
  }, [])
  
  return (
    <div className=' mt-4'>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">List of Blogs</h2>
      <div className="relative max-w-5xl overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 border-b">
            <tr>
              <th className="px-4 py-4 text-left">#</th>
              <th className="px-4 py-4 text-left">Blog Title</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBlogs.map((blog,index)=>(
              <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchfullBlogs} index={index+1}/>
            ))}
          </tbody>
        </table>
    </div>
    </div>
  )
}

export default ListBlog