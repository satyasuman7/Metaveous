import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DarkLightMode, useTheme } from "./DarkLightMode";
import Common from "./Common";

// ICONS
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const { darkMode } = useTheme();
  const location = useLocation();

  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const menuData = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Blogs", path: "/blogs" },
    { label: "Careers", path: "/careers" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className={`navbar_style w-100 py-2 shadow ${sticky ? "sticky-top navbar-blur" : ""}`} data-bs-theme={darkMode ? "dark" : "light"}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand w-75" to="/" onClick={closeMenu}>
              <img src="./Metaveos Consultancy pvt. ltd.png" className="company-logo" alt="company_logo" />
            </Link>

            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-expanded={isOpen ? "true" : "false"} onClick={handleToggle}>
              {isOpen ? <RxCross1 size={22} /> : <CiMenuBurger size={22} />}
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarMenu">
              <ul className="navbar-nav ms-auto">
                {menuData.map((menu, index) => (
                  <li className="nav-item me-4" key={index}>
                    <Link className={`nav-link ${location.pathname === menu.path ? "text-primary fw-bold active" : ""}`} to={menu.path} onClick={closeMenu}>
                      {menu.label}
                    </Link>
                  </li>
                ))}
                <li className="nav-item d-flex align-items-center ms-lg-3">
                  <Link className="btn btn-primary text-decoration-none me-3 py-2 px-4" to="/adminsignin" onClick={closeMenu}>
                    Login
                  </Link>
                  <DarkLightMode />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* <Common menu={menuData} /> */}
    </>
  );
};

export default Header;