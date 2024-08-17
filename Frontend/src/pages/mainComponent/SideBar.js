import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "./sidebar.css"; // Assume your existing CSS

function SideBar(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="absolute top-[5px] left-[5px] z-70 w-[40px] h-[40px] flex items-center justify-center p-0"
          onClick={toggleSidebar}
        >
          <i className="fa fa-bars text-white text-[16px]"></i>
        </button>
      )}
      <nav
        id="sidebar"
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 h-full w-64 bg-gray-800 transition-transform duration-300 ease-in-out z-40`}
      >
        <button
          className="md:hidden m-2 z-70 w-[38px] h-[38px] flex items-center justify-center"
          onClick={toggleSidebar}
        >
          <i className="fa fa-bars text-white text-[16px]"></i>
        </button>
        <header
          style={{
            position: "relative",
            background: "none",
            overflow: "hidden",
          }}
        >
          <div className="site-logo">
            <Grid container>
              <Grid item xs={2}>
                <a href="/" style={{ fontSize: "25px" }}>
                  <div
                    style={{
                      textAlign: "center",
                      background: "none",
                      marginLeft: "20px",
                    }}
                  >
                    <i
                      className="fa fa-home"
                      style={{ fontSize: "25px", color: "white" }}
                    ></i>
                  </div>
                </a>
              </Grid>
              <Grid item xs={10}>
                <h1
                  style={{
                    textAlign: "center",
                    margin: "0",
                    paddingTop: "0",
                    paddingBottom: "0",
                  }}
                >
                  <a href="/" className="sm:text-[15px] md:text-[20px]">
                    Test<span>Factory</span>
                  </a>
                </h1>
              </Grid>
            </Grid>
          </div>
        </header>
        <ul
          className="list-unstyled components"
          style={{ overflow: "auto", width: "100%" }}
        >
          <li
            id="2"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/mytest");
            }}
          >
            <a className="" id="1">
              My Tests{" "}
            </a>
          </li>
          <li
            id="3"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/my-mailing-list");
            }}
          >
            <a id="2">My Mailing Lists </a>
          </li>
          <li
            id="4"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/questionaire-history");
            }}
          >
            <a id="3">Test History </a>
          </li>
          <li
            id="5"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/landing-pages");
            }}
          >
            <a id="4">Landing Pages </a>
          </li>
          <li
            id="6"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/my-landing-pages");
            }}
          >
            <a id="5">My Landing Pages </a>
          </li>
          <li
            id="6"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/PricingPlace");
            }}
          >
            <a id="6">Pricing </a>
          </li>
          <li
            id="7"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/update");
            }}
          >
            <a id="7">My Account Details </a>
          </li>
          <li
            id="7"
            onClick={() => {
              toggleSidebar();
              navigate("/dashboard/change-password");
            }}
          >
            <a id="7">Change Password </a>
          </li>

          <li
            id="7"
            onClick={() => {
              toggleSidebar();
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <a id="6">Logout </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
