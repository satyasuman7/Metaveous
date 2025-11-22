import React, { useState } from 'react';
import { useTheme } from '../DarkLightMode';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialFormState = {
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  contact_message: "",
  status: false
};

export default function Contact() {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState(initialFormState);

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: type === 'checkbox' ? checked : value
    }));
  };

  // POST CONTACT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contact_phone)) {
      toast.error("Mobile No. must be 10 digits only.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/contacts",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(res.data?.msg || "Message sent successfully!");
      setFormData(initialFormState);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Message sending failed.");
    }
  };

  return (
    <>
      <div className="container" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="row py-3">
          
          {/* FORM */}
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="card py-4 px-2">
              <div className="card-body">
                <h2 className="card-title">Subscribe to receive future updates</h2>
                <h6 className="mb-2 text-secondary">Our support team will get back to you ASAP via email.</h6>

                <form onSubmit={handleSubmit}>
                  <div className="row mt-5">

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Your Name</label>
                      <input type="text" className="form-control py-3 px-4" name="contact_name" value={formData.contact_name} onChange={handleChange} placeholder="Enter your name" />
                    </div>

                    <div className="col-md-6 mb-3 mt-4">
                      <label className="form-label">Your Email</label>
                      <input type="email" className="form-control py-3 px-4" name="contact_email" value={formData.contact_email} onChange={handleChange} placeholder="Enter your email" />
                    </div>

                    <div className="col-md-6 mb-3 mt-4">
                      <label className="form-label">Your Mobile Number</label>
                      <input type="tel" className="form-control py-3 px-4" name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="Enter your mobile number" />
                    </div>

                    <div className="col-md-12 mb-3 mt-4">
                      <label className="form-label">Your Message</label>
                      <textarea className="form-control py-3 px-4" name="contact_message" value={formData.contact_message} onChange={handleChange} placeholder="Enter your message"></textarea>
                    </div>

                  </div>

                  <div className="text-end mt-4">
                    <button type="submit" className="btn btn-primary py-2 px-4"> Submit </button>
                  </div>
                </form>

              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <iframe className="rounded-3" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184978.0411422179!2d85.666141381948!3d20.390327871187182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909b34edc0551%3A0x6b5b53037cb5b997!2sMetaveos%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1763706849689!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: '100%', height: '100%' }}></iframe>
          </div>

        </div>
      </div>
    </>
  );
}