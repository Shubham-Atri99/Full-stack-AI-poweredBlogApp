import React, { useState, useEffect } from 'react';
import { useAppcontext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { axios } = useAppcontext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApproveToggle = async (id) => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (!confirm) return;

    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Button = ({ children, onClick, className = '', type = 'button' }) => (
    <button
      onClick={onClick}
      type={type}
      className={`px-3 py-1 rounded text-white ${className}`}
    >
      {children}
    </button>
  );

  const renderTable = (filteredComments, title) => (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Content</th>
            <th className="p-2 border">Blog Title</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComments.map((comment, index) => (
            <tr key={comment._id} className="text-center border-t">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{comment.name}</td>
              <td className="p-2 border">{comment.content}</td>
              <td className="p-2 border">{comment.blog?.title}</td>
              <td className="p-2 border space-x-2">
                <Button
                  className={comment.isApproved ? 'bg-yellow-500' : 'bg-green-600'}
                  onClick={() => handleApproveToggle(comment._id)}
                >
                  {comment.isApproved ? 'Unapprove' : 'Approve'}
                </Button>
                <Button className="bg-red-600" onClick={() => handleDelete(comment._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {filteredComments.length === 0 && (
            <tr>
              <td className="p-2 border text-center" colSpan={5}>
                No comments
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const approved = comments.filter((c) => c.isApproved);
  const notApproved = comments.filter((c) => !c.isApproved);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Comments Management</h1>
      {renderTable(notApproved, 'Pending Comments')}
      {renderTable(approved, 'Approved Comments')}
    </div>
  );
};

export default Comments;
