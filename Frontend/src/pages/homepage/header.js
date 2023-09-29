import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./css/media.css";
import "./css/theme.css";
import "./header.css";

function Header({ setLoginCheck }) {
  const [token, setToken] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Use localStorage.getItem('token') || null to set a default value of null if token is not found
    setToken(localStorage.getItem("token") || null);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header_nav">
      <div className="site-logo">
        <h1>
          <a href="#">
            Test<span>Factory</span>
          </a>
        </h1>
      </div>
      <nav>
        <ul className={isMobileMenuOpen ? 'nav_items show_menu': 'nav_items'}>
          <div className="close_menu" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="fas fa-times"></i>
          </div>
          <li className="active">
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          {token && (
            <li
              onMouseLeave={() => {
                document.getElementById("bar").style.display = "none";
              }}
            >
              <a
                style={{ color: "white" }}
                onMouseOver={() => {
                  document.getElementById("bar").style.display = "inline-block";
                }}
              >
                User
              </a>
              <div
                id="bar"
                style={{
                  display: "none",
                  background: "#38434F",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <a onClick={logoutHandler}>Logout</a>
                <a onClick={() => navigate("/dashboard/mytest")}>Dashboard</a>
              </div>
              <span className="menu-item-bg"></span>
            </li>
          )}
          {!token && (
            <li onClick={() => setLoginCheck(true)}>
              <a style={{ color: "white" }} href="#login">
                Login
              </a>
              <span className="menu-item-bg"></span>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
        <i className="fas fa-bars"></i>
      </div>
    </header>
  );
}

export default Header;
