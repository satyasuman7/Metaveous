import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// ICONS
import { FaMobileAlt, FaLockOpen } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePersonAddAlt1 } from "react-icons/md";
import TableData from '../TableData';

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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));
  };

  // GET user
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/createaccount");
      if (res.data && res.data.data) {
        const normalizedData = res.data.data.map(user => ({
          ...user,
          status: user.status === true || user.status === "true" || user.status === "Active"
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

  // POST user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneno)) {
      toast.error("Mobile No. must be 10 digits only.");
      return;
    }

    if (editId) {
      await editAdmin(editId, true);
      setFormData({ fullname: '', phoneno: '', email: '', password: '', profile: null, status: false });
      setEditId(null);
      fetchUsers();
    } else {
      const adminform = new FormData();
      adminform.append("fullname", formData.fullname);
      adminform.append("email", formData.email);
      adminform.append("password", formData.password);
      adminform.append("phoneno", formData.phoneno);
      adminform.append("status", formData.status);
      adminform.append("profile", formData.profile);
      // if (formData.profile) {
      //   adminform.append("profile", formData.profile);
      // }

      try {
        const res = await axios.post("http://localhost:3000/createaccount", adminform, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.status === 200 || res.status === 201) {
          if (res.data.token) {
            document.cookie = `token=${res.data.token}; path=/;`;
          }
          toast.success(res.data.msg || 'Signup successful!');
          setFormData({ fullname: '', phoneno: '', email: '', password: '', profile: null, status: false });
          fetchUsers();
        } else {
          toast.error("Error: " + (res.data.msg || "Unknown error"));
        }
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
        toast.error( error.response?.data?.msg || "Failed to create account.");
      }
    }
  };

  // DELETE user
  const deleteAdmin = async (id) => {
    if (window.confirm("Delete this admin account?")) {
      const res = await fetch(`http://localhost:3000/createaccount/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchUsers();
        toast.success("Deleted successfully.");
      } else {
        toast.error("Failed to delete admin account.");
      }
    }
  };

  // EDIT user
  const editAdmin = async (editId, submit = false) => {
    if (!submit) {
      const accountToEdit = userData.find((item) => item._id === editId);
      if (accountToEdit) {
        setFormData({
          fullname: accountToEdit.fullname,
          email: accountToEdit.email,
          password: accountToEdit.password,
          phoneno: accountToEdit.phoneno,
          profile: null,
          status: accountToEdit.status === true || accountToEdit.status === "true" || accountToEdit.status === "Active",
        });
        setEditId(editId);
      }
    } else {
      try {
        const adminform = new FormData();
        adminform.append("fullname", formData.fullname);
        adminform.append("email", formData.email);
        adminform.append("password", formData.password);
        adminform.append("phoneno", formData.phoneno);
        adminform.append("status", formData.status);
        adminform.append("profile", formData.profile);
        // if (formData.profile instanceof File) {
        //   adminform.append("profile", formData.profile);
        // }

        await axios.put(`http://localhost:3000/createaccount/${editId}`, adminform, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Account updated successfully");
        setEditId(null);
      } catch (error) {
        console.error("Update failed", error);
        toast.error("Failed to update account");
      }
    }
  };

  return (
    <>
      {/* FORM */}
      <div className="p-3">
        <div className="card shadow border-0 p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* FULL-NAME */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-2">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <div className="input-group mb-3">
                  <span className="input-group-text"><MdOutlinePersonAddAlt1 size={21} /></span>
                  <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter full name" />
                </div>
              </div>

              {/* MOBILE NUMBER */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-2">
                <label htmlFor="phoneno" className="form-label">Mobile Number</label>
                <div className="input-group mb-3">
                  <span className="input-group-text"><FaMobileAlt size={21} /></span>
                  <input type="tel" id="phoneno" name="phoneno" value={formData.phoneno} onChange={handleChange} className='form-control' placeholder="Enter mobile number" required />
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-2">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-group mb-3">
                  <span className="input-group-text"><MdOutlineEmail size={21} /></span>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className='form-control' placeholder="Enter email" required />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group mb-3">
                  <span className="input-group-text"><FaLockOpen size={21} /></span>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className='form-control' placeholder="Enter password" required />
                </div>
              </div>

              {/* PROFILE - IMAGE */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-2">
                <label htmlFor="profile" className="form-label">Profile Image</label>
                <input type="file" id="profile" name="profile" className='form-control' accept="image/*" onChange={handleChange} />
              </div>

              {/* STATUS SWITCH */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4 d-flex align-self-center" >
                <label className="switch me-2">
                  <input type="checkbox" id="status" name="status" checked={formData.status} onChange={handleChange} />
                  <span className="slider round"></span>
                </label>
                <label htmlFor="status"> {formData.status ? 'Active' : 'Inactive'} </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className='text-end mt-4'>
              <button type="submit" className='btn btn-primary py-2 px-4'>
                {editId ? "Update" : "Create Account"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-3" onClick={() => {
                  setFormData(initialFormState);
                  setEditId(null);
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