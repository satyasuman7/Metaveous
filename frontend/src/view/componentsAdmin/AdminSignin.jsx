import React from 'react'
import { MdOutlineEmail } from 'react-icons/md'

export default function AdminSignin() {
  return (
    <>
      <div className="container my-5" style={{ width: "45%" }}>
        <div className="card signin_card">
          <div className="card-body">
            <h3 className="text-center mt-4">Admin Sign-In</h3>
            <form action="">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-group mb-3">
                  <span className="input-group-text"><MdOutlineEmail size={21} /></span>
                  <input type="email" id="email" name="email" className='form-control' placeholder="Enter email" required />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}
