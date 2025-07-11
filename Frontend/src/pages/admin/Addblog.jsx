import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useAppcontext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

const Addblog = () => {
  const editorref = useRef(null);
  const quillref = useRef(null);
  const { axios } = useAppcontext();

  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image || !title || !category || !quillref.current?.root.innerHTML) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle: subtitle,
        description: quillref.current.root.innerHTML,
        catergory: category,
        isPublished,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message || "Blog added successfully");
        setImage('');
        setTitle('');
        setSubtitle('');
        setCategory('');
        quillref.current.root.innerHTML = '';
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add blog");
    } finally {
      setIsAdding(false);
    }
  };

  const handleGenerateAI = async () => {
    const prompt = title || "blog topic";
    if (!prompt) {
      toast.error("Please enter a blog title to generate content.");
      return;
    }

    try {
      setIsGenerating(true);
      const { data } = await axios.post('/api/blog/generate', { prompt });

      if (data.success) {
        quillref.current.root.innerHTML = data.content;
        toast.success("AI content generated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (editorref.current && !quillref.current) {
      const quill = new Quill(editorref.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...',
      });
      quillref.current = quill;
    }
  }, []);

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create a New Blog</h2>

      {/* Upload Thumbnail */}
      <div>
        <label htmlFor="image" className="block font-semibold mb-2 text-gray-700">
          Upload Thumbnail
        </label>
        <div className="w-40 h-40 rounded-lg overflow-hidden border border-dashed border-gray-400 relative group cursor-pointer">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter blog title"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">Subtitle</label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter blog subtitle"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter blog category"
        />
      </div>

      {/* Blog Description */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">Blog Description</label>
        <div className="relative">
          <div ref={editorref} className="min-h-[200px] rounded-lg border border-gray-300" />
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="absolute bottom-2 right-2 px-3 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 shadow"
          >
            {isGenerating ? "Generating..." : "Generate with AI"}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 text-right">
        <button
          disabled={isAdding}
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-base font-semibold hover:bg-blue-700 shadow-md"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default Addblog;
