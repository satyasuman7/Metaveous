import React, { useState, useEffect, useRef } from 'react';
import TableData from '../TableData';
import { toast } from 'react-toastify';
import axios from 'axios';

// ICONS
import { MdTitle } from "react-icons/md";
import { FaCamera } from 'react-icons/fa';

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
    setGalleryForm({ ...galleryForm, gallery_image: file });
    setImagePreview(URL.createObjectURL(file));
  };
  
  const handleChange = (e) =>
    setGalleryForm({ ...galleryForm, [e.target.name]: e.target.value });

  // Fetch Gallery List
  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gallery");
      setGalleryList(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Create / Update Gallery
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.gallery_title) {
      toast.warning("Gallery title is required");
      return;
    }
    const formData = new FormData();
    formData.append("gallery_title", galleryForm.gallery_title);
    if (galleryForm.gallery_image) {
      formData.append("gallery_image", galleryForm.gallery_image);
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/gallery/${editId}`, formData);
        toast.success("Gallery updated Successfully");
      } else {
        await axios.post("http://localhost:3000/gallery", formData);
        toast.success("Gallery created Successfully");
      }
      setGalleryForm({ gallery_title: '', gallery_image: null });
      setImagePreview(null);
      setEditId(null);
      fetchGallery();
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  };

  // DELETE Gallery
  const deleteGallery = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await axios.delete(`http://localhost:3000/gallery/${id}`);
        toast.success("Deleted successfully");
        fetchGallery();
      } catch {
        toast.error("Failed to delete gallery item");
      }
    }
  };

  // EDIT Gallery
  const editGallery = (id) => {
    const item = galleryList.find(i => i._id === id);
    if (item) {
      setGalleryForm({ gallery_title: item.gallery_title, gallery_image: null });
      setImagePreview(`http://localhost:3000/uploads/gallery/${item.gallery_image}`);
      setEditId(id);
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="card p-4 shadow">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* GALLERY TITLE */}
              <div className="col-md-6 mb-3">
                <label htmlFor="gallery_title" className="form-label"> Gallery Title </label>
                <div className="input-group">
                  <span className="input-group-text"><MdTitle /></span>
                  <input name="gallery_title" placeholder="Enter gallery title" className="form-control" id='gallery_title' value={galleryForm.gallery_title} onChange={handleChange} required /> 
                </div>
              </div>

              {/* GALLERY IMAGE */}
              <div className="col-md-6 mb-3">
                <label htmlFor="gallery_image" className="form-label mb-2">Gallery Image</label>
                  <button type="button" className="btn border-0 mx-3" onClick={openCamera}> <FaCamera size={40} /> </button>
                  <input ref={fileInputRef} type="file" accept="image/*" capture="user" className="d-none" onChange={handleImageChange} />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview mb-2" />
                  ) : (
                    <img src="../../../noImage.jpeg" alt="No preview" className="image-preview mb-2" />
                  )}
              </div>
            </div>

            <div className="text-end">
              <button className="btn btn-primary py-2 px-4" type="submit">
                {editId ? "Update" : "Add Gallery"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => {
                  setEditId(null);
                  setGalleryForm({ gallery_title: '', gallery_image: null });
                  setImagePreview(null);
                }}>
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