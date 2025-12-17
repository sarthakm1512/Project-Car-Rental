import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import UserMenu from "./UserMenu";

function LoginNav() {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
    };
    const handleLogout = () => {
    // 1. Remove authentication token
    localStorage.removeItem("authToken"); // If you're storing JWT in localStorage
    sessionStorage.removeItem("authToken"); // If using sessionStorage

    
  };


    return (
      <>
        <nav>
          {/* mobile */}
          <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
            <div onClick={openNav} className="mobile-navbar__close">
              <i className="fa-solid fa-xmark"></i>
            </div>
            <ul className="mobile-navbar__links">
              <li>
                <Link onClick={openNav} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={openNav} to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link onClick={openNav} to="/models">
                  Models
                </Link>
              </li>
              <li>
                <Link onClick={openNav} to="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link onClick={openNav} to="/team">
                  Our Team
                </Link>
              </li>
              <li>
                <Link onClick={openNav} to="/contact">
                  Contact
                </Link>
              </li>
                    </ul>
        <UserMenu  />
          </div>

          {/* desktop */}

          <div className="navbar">
            <div className="navbar__img">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="logo-img" />
              </Link>
            </div>
            <ul className="navbar__links">
              <li>
                <Link className="home-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                {" "}
                <Link className="about-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                {" "}
                <Link className="models-link" to="/models">
                  Vehicle Models
                </Link>
              </li>
              <li>
                {" "}
                <Link className="testi-link" to="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                {" "}
                <Link className="team-link" to="/team">
                  Our Team
                </Link>
              </li>
              <li>
                {" "}
                <Link className="contact-link" to="/contact">
                  Contact
                </Link>
              </li>
              
        <UserMenu  />
            </ul>
            

            {/* mobile */}
            <div className="mobile-hamb" onClick={openNav}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </nav>
      </>
    );
}

export default LoginNav;