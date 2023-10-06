import React, { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Menu, MenuItem, Popper, Paper, Grow,MenuList } from "@mui/material";

import "./css/media.css";
import "./css/theme.css";
import "./header.css";
import { Dropdown } from "react-bootstrap";
const menuStyle = {
  backgroundColor: '#696969', // Set the background color to gray
  fontSize: '1.2em', 
  // margin:'10px',     // Increase font size slightly
  padding: '10px 20px'   ,      // Add padding
};
function Header({ setLoginCheck }) {

  const [token, setToken] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleClickAway = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Clicked outside the menu, close it
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    // Add a click event listener when the component mounts
    document.addEventListener("click", handleClickAway);

    // Remove the click event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem("token") || null);
  }, []);

  const handleClose = (event) => {
    setAnchorEl(null);
  }
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      // setOpen(false)
      setAnchorEl(null);
    }
  }

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
        <ul className={isMobileMenuOpen ? 'nav_items show_menu' : 'nav_items'}>
          <div className="close_menu" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="fas fa-times"></i>
          </div>
          <li className="active">
            <Typography sx={{ minWidth: 100 }}><a href="#home">Home</a></Typography>
          </li>
          <li>
            <Typography sx={{ minWidth: 100 }}> <a href="#about">About</a></Typography>
          </li>
          <li>
            <Typography sx={{ minWidth: 100 }}><a href="#services">Services</a></Typography>
          </li>
          <li>
            <Typography sx={{ minWidth: 100 }}><a href="#contact">Contact</a></Typography>
          </li>
          {token && (
            <li ref={menuRef} >
              <Typography sx={{ minWidth: 100 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                <a style={{ color: "white" }} > User </a>
              </Typography>
              <Popper open={open} anchorEl={anchorEl} transition disablePortal >  
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem style={menuStyle} onClick={() => navigate("/dashboard/mytest")}>Dashboard</MenuItem>
                        <MenuItem style={menuStyle} onClick={logoutHandler}>Logout</MenuItem>
                      </MenuList>
                  </Grow>
                )}
              </Popper>
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
