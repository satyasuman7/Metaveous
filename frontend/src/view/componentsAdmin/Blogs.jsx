import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TableData from '../TableData';

//ICONS
import { FaFeatherAlt } from "react-icons/fa";
import { MdTitle, MdOutlineCategory } from "react-icons/md";
import { FaCamera } from 'react-icons/fa6';

const blogColumns = [
  { key: 'blog_title', label: 'Blog Title' },
  { key: 'blog_author_name', label: 'Author Name' },
  { key: 'blog_category', label: 'Category' },
  { key: 'blog_image', label: 'Image', isImage: true },
  { key: 'blog_content', label: 'Content' },
];

const Blogs = () => {
  const [blogForm, setBlogForm] = useState({
    blog_title: '',
    blog_author_name: '',
    blog_category: '',
    blog_image: null,
    blog_content: '',
  });
  const [blogList, setBlogList] = useState([]);
  const [editId, setEditId] = useState(null);

  //FOR IMAGE PREVIEW & UPLOAD
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const openCamera = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    setBlogForm({ ...blogForm, blog_image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  };

  //GET Blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/blogs");
      setBlogList(res.data.data || []);
    } catch {
      toast.error("Error fetching blogs");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  // POST & PUT Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogForm.blog_title || !blogForm.blog_author_name || !blogForm.blog_category) {
      toast.warning("All fields are required");
      return;
    }
    const adminblogform = new FormData();
    adminblogform.append("blog_title", blogForm.blog_title);
    adminblogform.append("blog_author_name", blogForm.blog_author_name);
    adminblogform.append("blog_category", blogForm.blog_category);
    adminblogform.append("blog_content", blogForm.blog_content);
    if (blogForm.blog_image) adminblogform.append("blog_image", blogForm.blog_image);

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/blogs/${editId}`, adminblogform);
        toast.success("Blog updated Successfully");
      } else {
        await axios.post("http://localhost:3000/blogs", adminblogform);
        toast.success("Blog created Successfully");
      }

      // Reset form
      setBlogForm({ blog_title: '', blog_author_name: '', blog_category: '', blog_image: null, blog_content: '' });
      setImagePreview(null);
      setEditId(null);
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  };

  //DELETE Blog
  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:3000/blogs/${id}`);
        toast.success("Deleted successfully");
        fetchBlogs();
      } catch {
        toast.error("Failed to delete blog");
      }
    }
  };

  //EDIT Blog (FETCH DATA TO FORM)
  const editBlog = (id) => {
    const blog = blogList.find((b) => b._id === id);
    if (blog) {
      setBlogForm({
        blog_title: blog.blog_title,
        blog_author_name: blog.blog_author_name,
        blog_category: blog.blog_category,
        blog_image: null,
        blog_content: blog.blog_content,
      });
      setImagePreview(`http://localhost:3000/uploads/blogs/${blog.blog_image}`);
      setEditId(id);
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="card shadow p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* BLOG TITLE */}
              <div className="col-md-6 mb-3">
                <label htmlFor="blog_title" className="form-label">Blog Title</label>
                <div className="input-group">
                  <span className="input-group-text"><MdTitle /></span>
                  <input type="text" name="blog_title" id="blog_title" className="form-control" placeholder="Enter blog title" value={blogForm.blog_title} onChange={handleChange} required />
                </div>
              </div>

              {/* AUTHOR NAME */}
              <div className="col-md-6 mb-3">
                <label htmlFor="blog_author_name" className="form-label">Author Name</label>
                <div className="input-group">
                  <span className="input-group-text"><FaFeatherAlt /></span>
                  <input type="text" name="blog_author_name" id="blog_author_name" className="form-control" placeholder="Enter author name" value={blogForm.blog_author_name} onChange={handleChange} required />
                </div>
              </div>

              {/* BLOG CATEGORY */}
              <div className="col-md-6 mb-3">
                <label htmlFor="blog_category" className="form-label">Category</label>
                <div className="input-group">
                  <span className="input-group-text"><MdOutlineCategory /></span>
                  <select name="blog_category" id="blog_category" className="form-select" value={blogForm.blog_category} onChange={handleChange} required>
                    <option value="" disabled>Select Category</option>
                    <option value="News">News</option>
                    <option value="Events">Events</option>
                    <option value="Technology">Technology</option>
                    <option value="Announcements">Announcements</option>
                  </select>
                </div>
              </div>

              {/* BLOG IMAGE */}
              <div className="col-md-6 mb-3">
                <label className="mb-2">Blog Image</label>
                <button type="button" className="btn border-0 mx-3" onClick={openCamera}>
                  <FaCamera size={40} />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" capture="user" className="d-none" onChange={handleImageChange} />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview mb-2" />
                ) : (
                  <img src="../../../noImage.jpeg" alt="No preview" className="image-preview mb-2" />
                )}
              </div>

              {/* BLOG CONTENT */}
              <div className="col-12 mb-3">
                <label htmlFor="blog_content" className="form-label">Blog Content</label>
                <textarea name="blog_content" id="blog_content" rows="4" className="form-control" placeholder="Enter blog content" value={blogForm.blog_content} onChange={handleChange} required />
              </div>
            </div>

            {/* SUBMIT & UPDATE BUTTON */}
            <div className="text-end">
              <button type="submit" className="btn btn-primary py-2 px-4">
                {editId ? "Update Blog" : "Add Blog"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setBlogForm({ blog_title: '', blog_author_name: '', blog_category: '', blog_image: null, blog_content: '' }); setImagePreview(null); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* BLOG TABLE */}
      <TableData
        data={blogList}
        columns={blogColumns}
        title="Blogs List"
        onEdit={(item) => editBlog(item._id)}
        onDelete={(item) => deleteBlog(item._id)}
        baseImagePath="blogs/"
      />
    </>
  );
};

export default Blogs;