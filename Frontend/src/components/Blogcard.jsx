import React from 'react';
import { useNavigate } from 'react-router-dom';

const stripHTML = (html) => html?.replace(/<[^>]*>?/gm, '') ?? '';

const truncateWords = (text, wordLimit) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
};

const BlogCard = ({ image, category, title, description, _id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl w-full max-w-sm cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <span className="text-sm font-semibold text-indigo-600 uppercase">{category}</span>

        <h2 className="mt-2 text-xl font-bold text-gray-800">{title}</h2>

        <p className="mt-2 text-gray-700 text-sm">
          {truncateWords(stripHTML(description), 80)}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
