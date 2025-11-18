import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./DarkLightMode";

//ICONS
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { ImPhone } from "react-icons/im";
import { MdEmail, MdLocationPin } from "react-icons/md";

const Footer = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <footer className="py-5 position-relative footer_style shadow-lg" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-4">
              <div className="d-flex align-items-center mb-3">
                <img src="./Metaveos Consultancy pvt. ltd.png" className="company-logo" alt="company_logo" />
              </div>
              <p className="text-secondary mb-2"> <ImPhone className="text-primary" size={21} /> +91 7887412120 </p>
              <p className="text-secondary mb-2"> <MdEmail className="text-primary" size={21} /> contact44@metaveos.com </p>
              <p className="text-secondary mb-4"> <MdLocationPin className="text-primary" size={21} /> 27/P Saheed Nagar, Bhubaneswar, (Odisha) 751007 </p>
              <div className="d-flex gap-3">
                <FaFacebookF className="text-secondary hover-icon" />
                <FaXTwitter className="text-secondary hover-icon" />
                <FaYoutube className="text-secondary hover-icon" />
                <FaLinkedinIn className="text-secondary hover-icon" />
              </div>
            </div>

            <div className="col-md-2">
              <h6 className="fw-semibold text-dark mb-3">Useful Links</h6>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2">
                  <Link to="/services" className="text-decoration-none text-secondary hover-link"> Services </Link>
                </li>
                <li className="mb-2">
                  <Link to="/blogs" className="text-decoration-none text-secondary hover-link"> Blogs </Link>
                </li>
                <li className="mb-2">
                  <Link to="/careers" className="text-decoration-none text-secondary hover-link"> Careers </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-decoration-none text-secondary hover-link"> Gallery </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-2">
              <h6 className="fw-semibold text-dark mb-3">Terms</h6>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2">
                  <Link to="#" className="text-decoration-none text-secondary hover-link"> Terms & Conditions </Link>
                </li>
                <li className="mb-2">
                  <Link to="#" className="text-decoration-none text-secondary hover-link"> Privacy Policy </Link>
                </li>
                <li>
                  <Link to="#" className="text-decoration-none text-secondary hover-link"> Refund Policy </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <h6 className="fw-semibold text-dark mb-3">Support & Help</h6>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2">
                  <Link to="/contact" className="text-decoration-none text-secondary hover-link"> Contact </Link>
                </li>
                <li>
                  <Link to="/about" className="text-decoration-none text-secondary hover-link"> About </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="mt-5" />
          <div className="text-center text-secondary small">
            <span className='text-secondary'>2025 © </span>Metaveos Technology. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
