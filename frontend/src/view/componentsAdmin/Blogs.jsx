import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TableData from '../TableData';

//ICONS
import { FaFeatherAlt } from "react-icons/fa";
import { MdTitle, MdOutlineCategory } from "react-icons/md";

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

  const handleChange = (e) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBlogForm({ ...blogForm, blog_image: e.target.files[0] });
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
      setBlogForm({
        blog_title: '',
        blog_author_name: '',
        blog_category: '',
        blog_image: null,
        blog_content: '',
      });
      setEditId(null);
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  };

  //DELETE Blog
  const deleteBlog = async (id) => {
    if (window.confirm("Delete this Blog?")) {
      const res = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchBlogs();
        toast.success("Deleted successfully.");
      } else {
        toast.error("Failed to delete blog.");
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
      setEditId(id);
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="card shadow p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Blog Title</label>
                <div className="input-group">
                  <span className="input-group-text"><MdTitle /></span>
                  <input name="blog_title" className="form-control" value={blogForm.blog_title} placeholder='Enter blog title' onChange={handleChange} required />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label>Author Name</label>
                <div className="input-group">
                  <span className="input-group-text"><FaFeatherAlt /></span>
                  <input name="blog_author_name" className="form-control" value={blogForm.blog_author_name} placeholder='Enter author name' onChange={handleChange} required />
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label>Category</label>
                <div className="input-group">
                  <span className="input-group-text"><MdOutlineCategory /></span>
                  <select name="blog_category" className="form-select" value={blogForm.blog_category} onChange={handleChange} required>
                    <option value="" disabled>Select Category</option>
                    <option value="News">News</option>
                    <option value="Events">Events</option>
                    <option value="Technology">Technology</option>
                    <option value="Announcements">Announcements</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label>Blog Image</label>
                <input type="file" name="blog_image" className="form-control" onChange={handleFileChange} accept="image/*" required={!editId} />
              </div>

              <div className="col-12 mb-3">
                <label>Blog Content</label>
                <textarea name="blog_content" className="form-control" rows="4" value={blogForm.blog_content} placeholder='Enter blog content' onChange={handleChange} required />
              </div>
            </div>

            <div className="text-end">
              <button className="btn btn-primary py-2 px-4" type="submit">
                {editId ? "Update Blog" : "Add Blog"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setBlogForm({ blog_title: '', blog_author_name: '', blog_category: '', blog_image: null, blog_content: '' }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

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
