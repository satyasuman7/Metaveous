import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TableData from '../TableData';

// ICONS
import { FaMobileAlt, FaLockOpen, FaCamera } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePersonAddAlt1 } from "react-icons/md";

const userColumns = [
  { key: 'fullname', label: 'Full Name' },
  { key: 'phoneno', label: 'Mobile Number' },
  { key: 'email', label: 'Email Address' },
  { key: 'password', label: 'Password' },
  { key: 'profile', label: 'Profile Image', isImage: true },
  { key: 'status', label: 'Status' },
];

const initialFormState = { fullname: "", email: "", password: "", phoneno: "", profile: null, status: false };

export default function CreateAccount() {
  const [formData, setFormData] = useState(initialFormState);
  const [userData, setUserData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // GET user
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/createaccount");
      if (res.data && res.data.data) {
        const normalizedData = res.data.data.map(user => ({
          ...user,
          status: user.status === true || user.status === "true" || user.status === "Active",
        }));
        setUserData(normalizedData);
      } else {
        console.error("Unexpected response:", res.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err.response?.data?.msg || err.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Open Camera/File Picker
  const openCamera = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  // ✅ Image Change Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    setFormData(prev => ({ ...prev, profile: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  // ✅ Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));
  };

  // POST user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneno)) {
      toast.error("Mobile No. must be 10 digits only.");
      return;
    }
    const adminForm = new FormData();
    adminForm.append("fullname", formData.fullname);
    adminForm.append("email", formData.email);
    adminForm.append("password", formData.password);
    adminForm.append("phoneno", formData.phoneno);
    adminForm.append("status", formData.status);
    // if (formData.profile instanceof File) {
      adminForm.append("profile", formData.profile);
    // } 

    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:3000/createaccount/${editId}`,
          adminForm,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success(res.data?.msg || "Updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:3000/createaccount",
          adminForm,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success(res.data?.msg || "Account created successfully!");
      }

      // Reset form
      setFormData(initialFormState);
      setImagePreview(null);
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error(error.response?.data?.msg || "Action failed.");
    }
  };

  // DELETE user
  const deleteAdmin = async (id) => {
    if (!window.confirm("Delete this admin account?")) return;
    try {
      await axios.delete(`http://localhost:3000/createaccount/${id}`);
      toast.success("Deleted successfully!");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete admin account.");
    }
  };

  // EDIT user
  const editAdmin = (editId) => {
    const accountToEdit = userData.find(item => item._id === editId);
    if (accountToEdit) {
      setFormData({
        fullname: accountToEdit.fullname,
        email: accountToEdit.email,
        // password: accountToEdit.password,
        password: "",
        phoneno: accountToEdit.phoneno,
        profile: null,
        status: accountToEdit.status === true || accountToEdit.status === "true" || accountToEdit.status === "Active",
      });
      setEditId(editId);
      setImagePreview(accountToEdit.profile ? `http://localhost:3000/uploads/${accountToEdit.profile}` : null);
    } else {
      toast.error("Failed to load account for editing.");
    }
  };

  return (
    <>
      {/* FORM */}
      <div className="p-3">
        <div className="card shadow border-0 p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* FULL NAME */}
              <div className="col-md-6 mb-3">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text"><MdOutlinePersonAddAlt1 size={21} /></span>
                  <input type="text" id="fullname" name="fullname" className="form-control"
                    value={formData.fullname} onChange={handleChange} placeholder="Enter full name" />
                </div>
              </div>

              {/* MOBILE */}
              <div className="col-md-6 mb-3">
                <label htmlFor="phoneno" className="form-label">Mobile Number</label>
                <div className="input-group">
                  <span className="input-group-text"><FaMobileAlt size={21} /></span>
                  <input type="tel" id="phoneno" name="phoneno" className="form-control"
                    value={formData.phoneno} onChange={handleChange} placeholder="Enter mobile number" />
                </div>
              </div>

              {/* EMAIL */}
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text"><MdOutlineEmail size={21} /></span>
                  <input type="email" id="email" name="email" className="form-control"
                    value={formData.email} onChange={handleChange} placeholder="Enter email"/>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLockOpen size={21} /></span>
                  <input type="text" id="password" name="password" className="form-control"
                    value={formData.password} onChange={handleChange} placeholder="Enter password" />
                </div>
              </div>

              {/* PROFILE IMAGE */}
              <div className="col-md-6 mb-3">
                <label htmlFor="profile" className="form-label">Profile Image</label>
                <button type="button" className="btn border-0 mx-2" onClick={openCamera}><FaCamera size={40} /></button>
                <input ref={fileInputRef} type="file" accept="image/*" capture="user" className="d-none" onChange={handleImageChange} />
                <img src={imagePreview || "../../../noImage.jpeg"} alt="Preview" className="image-preview mb-2" />
              </div>

              {/* STATUS */}
              <div className="col-md-6 mb-3 d-flex align-items-center">
                <label className="switch me-2">
                  <input type="checkbox" id="status" name="status" checked={formData.status} onChange={handleChange} />
                  <span className="slider round"></span>
                </label>
                <span>{formData.status ? "Active" : "Inactive"}</span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary py-2 px-4">
                {editId ? "Update" : "Create Account"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-3" onClick={() => {
                  setFormData(initialFormState);
                  setEditId(null);
                  setImagePreview(null);
                }}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* TABLE */}
      <TableData
        data={userData}
        columns={userColumns}
        title="User Accounts"
        onEdit={(item) => editAdmin(item._id)}
        onDelete={(item) => deleteAdmin(item._id)}
      />
    </>
  );
}
