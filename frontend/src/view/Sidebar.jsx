import './style.css';
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

// ICONS
import { RiMenu2Fill, RiAccountPinCircleLine, RiContactsBook3Line } from "react-icons/ri";
import { ImBlogger } from "react-icons/im";
import { TfiHome, TfiGallery } from "react-icons/tfi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import IntroCard from './IntroCard';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  // close & open off-canvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <TfiHome size={20} className="me-2" /> },
    { path: '/admin/createaccount', label: 'Create Admin Account', icon: <RiAccountPinCircleLine size={20} className="me-2" /> },
    { path: '/admin/gallery', label: 'Add Gallery', icon: <TfiGallery size={20} className="me-2" /> },
    { path: '/admin/blogs', label: 'Add Blogs', icon: <ImBlogger size={20} className="me-2" /> },
    { path: '/admin/careers', label: 'Add Careers', icon: <HiOutlineBuildingOffice size={20} className="me-2" /> },
    { path: '/admin/contactview', label: 'View Contact', icon: <RiContactsBook3Line size={20} className="me-2" /> },
  ];

  // Find title based on current route
  const currentItem = navItems.find(item => item.path === location.pathname);
  const currentTitle = currentItem ? currentItem.label : 'Page';

  return (
    <>
      <div className="d-flex min-vh-100">
        {/* sidebar for desktop */}
        <div className="d-none d-lg-block bg-dark border-end sidebar py-4 ">
          <NavLink to="/admin" className="d-flex align-items-center mb-3 px-3 mb-md-0 me-md-auto text-white text-decoration-none">
            {/* <span className="fs-4">Metaveous</span> */}
            <span className="fs-4">Admin</span>
          </NavLink>
          <hr className='text-white' />
          <ul className="nav flex-column mb-auto">
            {navItems.map((item, index) => (
              <li className="sidebar_links" key={index}>
                <NavLink to={item.path} end={item.path === '/admin'} onClick={handleClose} className={({ isActive }) => `nav-link py-3 ${isActive ? 'active' : 'link-light'}`}>
                  {item.icon} {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <br /> <br />
          <div className="dropdown px-3">
            <NavLink className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="profile" width="40" height="40" className="rounded-circle me-2" />
              <strong>Admin</strong>
            </NavLink>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
              <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item" to="/signin">Sign out</NavLink></li>
            </ul>
          </div>
        </div>

        {/* mobile sidebar */}
        <div className="flex-grow-1 background_outlet">
          <nav className="navbar bg-body-tertiary d-lg-none">
            <div className="container-fluid justify-content-between">
              <button className="btn d-lg-none" onClick={handleShow}>
                <RiMenu2Fill size={20} />
              </button>
              {/* <NavLink className="navbar-brand mx-auto">Metaveous</NavLink> */}
              <NavLink className="navbar-brand mx-auto">Admin</NavLink>
              <div className="dropdown">
                <NavLink to="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="" width="40" height="40" className="rounded-circle me-2" />
                  <strong>Admin</strong>
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser2">
                  <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/signin">Sign out</NavLink></li>
                </ul>
              </div>
            </div>
          </nav>

          <Offcanvas show={show} onHide={handleClose} className="mobile_offcanvas" data-bs-theme="dark">
            <Offcanvas.Header closeButton>
              {/* <Offcanvas.Title className=''>Metaveous</Offcanvas.Title> */}
              <Offcanvas.Title className=''>Admin</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="nav flex-column mb-auto">
                {navItems.map((item, index) => (
                  <li className="sidebar_links" key={index}>
                    <NavLink to={item.path} end={item.path === '/admin'} onClick={handleClose} className={({ isActive }) => `nav-link py-3 ${isActive ? 'active' : 'link-light'}`}>
                      {item.icon} {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Offcanvas.Body>
          </Offcanvas>

          <div className='pb-4'>
            <IntroCard title={currentTitle} />
            <Outlet />
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
