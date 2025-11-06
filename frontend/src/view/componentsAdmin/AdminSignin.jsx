import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//ICONS
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";


export default function AdminLogin() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await res.json();
      console.log("Login response:", result);

      if (result.success) {
        toast.success(result.msg || "Login successful!");
        document.cookie = "token=" + result.token + "; path=/;";
        navigate('/admin', { state: { userName: result.name, userImage: result.image } });
      } else {
        toast.error(result.msg || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 background_image">
        <div className="card card_style p-4">
          <h3 className="text-center mb-4">Admin Sign-In</h3>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-group">
                <span className="input-group-text"><MdOutlineEmail size={21} /></span>
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-group">
                <span className="input-group-text"><FaLock size={21} /></span>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
              </div>
            </div>

            {/* Remember me + forgot password */}
            <div className="d-flex justify-content-end align-items-center mb-3">
              <NavLink to="#" className="small text-decoration-none">
                Forgot password?
              </NavLink>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}