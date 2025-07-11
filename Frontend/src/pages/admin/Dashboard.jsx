import React, { useState, useEffect } from 'react';
import { assets, dashboard_data } from '../../assets/assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import axios from 'axios';
import { useAppcontext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });
  const {axios} =useAppcontext();
  const fetchBlogs=async()=>{
   try {
    const {data}=await axios.get('/api/admin/dashboard')
    data.success? setDashboardData(data.dashboardDATA):toast.error(data.message)

   } catch (error) {
    toast.error(error.message)
   }
  }
  useEffect(() => {
    // Fetch dashboard data (mock)
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 min-h-screen">
      {/* Section: Stats */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Overview</h2>
      <div className="flex flex-wrap gap-6 mb-10">
        {/* Blogs */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md w-64">
          <img src={assets.dashboard_icon_1} alt="Blogs" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashboardData.blogs}</p>
            <p className="text-sm text-gray-500">Blogs</p>
          </div>
        </div>

        {/* Drafts */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md w-64">
          <img src={assets.dashboard_icon_2} alt="Drafts" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashboardData.drafts}</p>
            <p className="text-sm text-gray-500">Drafts</p>
          </div>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md w-64">
          <img src={assets.dashboard_icon_3} alt="Comments" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashboardData.comments}</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>
      </div>

      {/* Section: Recent Blogs Table */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Blogs</h2>
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
            {dashboardData.recentBlogs.map((blog,index)=>(
              <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
