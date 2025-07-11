import React, { useState, useMemo } from 'react';
import { useAppcontext } from '../contexts/AppContext';
import BlogCard from './Blogcard';

const categories = ['All', 'Startup', 'Technology', 'Lifestyle', 'Finance'];

const BlogList = () => {
  const { blogs, input } = useAppcontext();
  const [active, setActive] = useState('All');

  const filteredBlogs = useMemo(() => {
    const searchTerm = input.toLowerCase().trim();

    return blogs.filter(blog => {
      const matchesCategory =
        active === 'All' || blog.category?.toLowerCase() === active.toLowerCase();

      const matchesSearch =
        blog.title?.toLowerCase().includes(searchTerm) ||
        blog.description?.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, active, input]);

  return (
    <div className="px-4 sm:px-10 my-10 space-y-10">
      <div className="flex justify-center">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto px-4 py-2">
          {categories.map(item => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition whitespace-nowrap
                ${
                  active === item
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBlogs.length ? (
          filteredBlogs.map(blog => (
            <BlogCard
              key={blog._id}
              image={blog.image}
              title={blog.title}
              category={blog.category}
              description={blog.description}
              _id={blog._id}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
