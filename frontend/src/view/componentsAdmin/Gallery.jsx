import React, { useState, useEffect } from 'react';
import TableData from '../TableData';
import { toast } from 'react-toastify';
import axios from 'axios';

//ICONS
import { MdTitle } from "react-icons/md";

const galleryColumns = [
  { key: 'gallery_title', label: 'Gallery Title' },
  { key: 'gallery_image', label: 'Gallery Image', isImage: true },
];

export default function Gallery() {
  const [galleryForm, setGalleryForm] = useState({
    gallery_title: '',
    gallery_image: null,
  });
  const [galleryList, setGalleryList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = e => setGalleryForm({ ...galleryForm, [e.target.name]: e.target.value });
  const handleFileChange = e => setGalleryForm({ ...galleryForm, gallery_image: e.target.files[0] });

  //GET Gallery
  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gallery");
      setGalleryList(res.data.data || []);
    } catch {
      toast.error("Error fetching gallery");
    }
  };
  useEffect(() => {
    fetchGallery();
  }, []);

  //POST Gallery
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gallery_title", galleryForm.gallery_title);
    if (galleryForm.gallery_image) formData.append("gallery_image", galleryForm.gallery_image);

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/gallery/${editId}`, formData);
        toast.success("Gallery updated Successfully");
      } else {
        await axios.post("http://localhost:3000/gallery", formData);
        toast.success("Gallery created Successfully");
      }
      setGalleryForm({ gallery_title: '', gallery_image: null });
      setEditId(null);
      fetchGallery();
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  };

  // DELETE Gallery
  const deleteGallery = async (id) => {
    if (window.confirm("Delete this gallery item?")) {
      const res = await fetch(`http://localhost:3000/gallery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchGallery();
        toast.success("Deleted successfully.");
      } else {
        toast.error("Failed to delete gallery item.");
      }
    }
  };

  // EDIT Gallery
  const editGallery = (id) => {
    const item = galleryList.find(i => i._id === id);
    if (item) {
      setGalleryForm({ gallery_title: item.gallery_title, gallery_image: null });
      setEditId(id);
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="card p-4 shadow">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="gallery_title" className="form-label">Gallery Title</label>
                <div className="input-group">
                  <span className="input-group-text"><MdTitle /></span>
                  <input name="gallery_title" placeholder="Enter gallery title" className="form-control" id='gallery_title' value={galleryForm.gallery_title} onChange={handleChange} required /> 
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="gallery_image" className="form-label">Gallery Image</label>
                <input type="file" name="gallery_image" className="form-control" id='gallery_image' onChange={handleFileChange} accept="image/*" required={!editId} />
                {/* {editId && (
                  <div className="mt-2">
                    <p>Current Image:</p>
                    <img src={`http://localhost:3000/gallery/${galleryList.find(i => i._id === editId)?.gallery_image}`} alt={`${galleryList.find(i => i._id === editId)?.gallery_image}`} style={{ maxWidth: '150px' }} />
                  </div>
                )} */}
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-primary py-2 px-4" type="submit">
                {editId ? "Update" : "Add Gallery"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setGalleryForm({ gallery_title: '', gallery_image: null }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Gallery Table */}
      <TableData
        data={galleryList}
        columns={galleryColumns}
        title="Gallery List"
        onEdit={(item) => editGallery(item._id)}
        onDelete={(item) => deleteGallery(item._id)}
        baseImagePath="gallery/"
      />
    </>
  );
}