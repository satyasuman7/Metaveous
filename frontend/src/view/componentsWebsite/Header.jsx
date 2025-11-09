import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkLightMode from "./DarkLightMode";
import './websitestyle.css';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuData = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services",
      // submenu: [
      //   { title: "Web Development", path: "/services/web" },
      //   { title: "Mobile Apps", path: "/services/mobile" },
      //   { title: "UI/UX Design", path: "/services/uiux" },
      // ],
    },
    { title: "Blogs", path: "/blogs" },
    { title: "Careers", path: "/careers" },
    { title: "Gallery", path: "/gallery" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <header className='w-100 top-0 start-0 z-3 '>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src="/images/logo/logo-2.svg" alt="logo" width="140" height="30" />
          </Link>

          {/* Mobile Toggle */}
          {/* <DarkLightMode /> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto">
               {/* SUBMENU EXAMPLE */}
              {menuData.map((menuItem, index) =>(
                // menuItem.submenu ? (
                //   <li className="nav-item dropdown" key={index}>
                //     <Link className="nav-link dropdown-toggle" to="#" id={`dropdown-${index}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                //       {menuItem.title}
                //     </Link>
                //     <ul className="dropdown-menu" aria-labelledby={`dropdown-${index}`}>
                //       {menuItem.submenu.map((subItem, i) => (
                //         <li key={i}>
                //           <Link className="dropdown-item" to={subItem.path} style={{ color: location.pathname === subItem.path ? "#0d6efd" : "inherit", }}>
                //             {subItem.title}
                //           </Link>
                //         </li>
                //       ))}
                //     </ul>
                //   </li>
                // ) : (
                  <li className="nav-item me-4 py-3" key={index}>
                    <Link className={`nav-link ${ location.pathname === menuItem.path ? "text-primary fw-bold" : ""}`} to={menuItem.path}>
                      {menuItem.title}
                    </Link>
                  </li>
                )
              )}

              {/* Auth Buttons + Theme */}
              <li className="nav-item d-flex align-items-center ms-lg-3">
                <Link className="btn btn-primary text-decoration-none me-2" to="/adminsignin">
                  Sign In
                </Link>
                <DarkLightMode />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;