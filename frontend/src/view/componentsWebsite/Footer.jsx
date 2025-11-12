import React from "react";
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-top py-5 position-relative">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              <div style={{ width: "28px", height: "28px", backgroundColor: "#0d6efd", borderRadius: "6px" }}></div>
              <h4 className="ms-2 fw-bold text-dark mb-0">LOGO111</h4>
            </div>
            <p className="text-secondary mb-4"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit expedita at, accusantium maxime minima quod eum aliquam autem eos sunt. </p>
            <div className="d-flex gap-3">
              <FaFacebookF className="text-secondary hover-icon" />
              <FaXTwitter className="text-secondary hover-icon" />
              <FaYoutube className="text-secondary hover-icon" />
              <FaLinkedinIn className="text-secondary hover-icon" />
            </div>
          </div>

          {/* ===== Useful Links ===== */}
          <div className="col-md-2">
            <h6 className="fw-semibold text-dark mb-3">Useful Links</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== Terms ===== */}
          <div className="col-md-2">
            <h6 className="fw-semibold text-dark mb-3">Terms</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  TOS
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== Support & Help ===== */}
          <div className="col-md-3">
            <h6 className="fw-semibold text-dark mb-3">Support & Help</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-decoration-none text-secondary hover-link">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Bottom Line ===== */}
        <hr className="mt-5" />
        <div className="text-center text-secondary small">
          <span className='text-secondary'>2025 © </span>Metaveos Technology. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
