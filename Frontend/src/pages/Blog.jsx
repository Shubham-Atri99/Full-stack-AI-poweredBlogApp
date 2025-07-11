import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { assets } from '../assets/assets/assets';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchblogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) setData(data.blog);
      else toast.error(data.message || "Blog fetch failed");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchcomments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchblogData();
    fetchcomments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await axios.post('/api/blog/add-comment', {
        blog: id,
        name: "Guest User", // or get from auth if available
        content: newComment,
      });

      if (data.success) {
        toast.success("Comment submitted for review.");
        setNewComment("");
        fetchcomments(); // refetch approved comments
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50 w-full' />
      <Navbar />

      <div className='flex flex-col justify-center text-center mt-20'>
        <p className='text-gray-500 text-sm'>{formatDate(data.createdAt || new Date())}</p>
        <h1 className='font-semibold text-4xl mx-auto text-gray-800 max-w-2xl mt-2'>{data.title}</h1>
        <h2 className='text-2xl my-4 mx-auto text-gray-500'>{data.subTitle}</h2>
        <p className="inline-block px-4 py-1 text-primary bg-primary/10 border border-primary/30 rounded-xl text-sm font-medium mb-6 mx-auto">
          by {data.author || "Someone"}
        </p>
      </div>

      <div className='max-w-4xl mx-auto px-4'>
        <img src={data.image} alt={data.title} className='rounded-2xl w-full mb-6' />
        <h2 className='text-2xl text-gray-600 font-semibold my-4'>{data.subTitle}</h2>
        <div
          className='prose max-w-none prose-lg prose-h1:text-3xl prose-h2:text-2xl prose-p:text-gray-700 prose-li:marker:text-primary'
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className='mt-12'>
          <h3 className='text-2xl font-semibold mb-4 text-gray-800'>Comments</h3>
          {comments.length ? (
            comments.map((comment, idx) => (
              <div key={idx} className='border-b border-gray-200 pb-4 mb-4'>
                <p className='text-lg font-semibold text-gray-700'>{comment.name}</p>
                <p className='text-gray-600'>{comment.content}</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No comments yet.</p>
          )}
        </div>

        {/* Add Comment Form */}
        <form className='mt-8' onSubmit={handleSubmit}>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>Leave a Comment</h3>
          <textarea
            className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700'
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Write your comment...'
          ></textarea>
          <button
            type="submit"
            className='mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-200'
          >
            Submit
          </button>
        </form>

        <div className='flex gap-6 mt-12 items-center justify-center'>
          <img src={assets.facebook_icon} alt="facebook" className='w-8 cursor-pointer hover:scale-110 transition' />
          <img src={assets.twitter_icon} alt="twitter" className='w-8 cursor-pointer hover:scale-110 transition' />
          <img src={assets.googleplus_icon} alt="google+" className='w-8 cursor-pointer hover:scale-110 transition' />
        </div>
      </div>
    </div>
  ) : (
    <div className='text-center text-gray-500 mt-20'>No data found</div>
  );
};

export default Blog;
