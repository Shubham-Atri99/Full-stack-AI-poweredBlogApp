import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import Addblog from './pages/admin/Addblog';
import ListBlog from './pages/admin/ListBlog';
import Login from './components/admin/Login';
import Comments from './pages/admin/Comments';
import 'quill/dist/quill.core.css';
import { Toaster } from 'react-hot-toast';
import { useAppcontext } from './contexts/AppContext';

const App = () => {
  const { token } = useAppcontext(); // ✅ fixed

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<Addblog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
