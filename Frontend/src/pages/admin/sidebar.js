import React, { Component, useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../dashboard/sidebar.css'
function AdminSideBar(props) {
    const navigate = useNavigate()

    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3 onClick={() => { navigate('/') }}>
                    <span style={{ color: "white" }}>Test</span>Factory
                </h3>
            </div>

            <ul className="list-unstyled components">
                {/* <li id="1" onClick={myfunc}>
            <a id="0">Questionnaire </a>
          </li> */}

                <li id="2" onClick={() => { navigate("/dashboard/mytest") }}>
                    <a id="1">Users </a>
                </li>
                <li id="3" onClick={() => { navigate("/dashboard/my-mailing-list") }}>
                    <a id="2">Tests</a>
                </li>
                {/* <li id="4" onClick={() => { navigate("/dashboard/questionaire-history") }}>
                    <a id="3">Questionnaire History </a>
                </li>
                <li id="5" onClick={() => { navigate("/dashboard/landing-pages") }}>
                    <a id="4">Landing pages </a>
                </li>
                <li id="6" onClick={() => { navigate("/dashboard/my-landing-pages") }}>
                    <a id="5">My landing pages </a>
                </li> */}
            </ul>
            <ul className="list-unstyled components">
                <li id="7" onClick={() => {
                    localStorage.removeItem('token')
                    navigate('/login')
                }}>
                    <a id="6">Logout </a>
                </li>
            </ul>
        </nav>
    )
}

export default AdminSideBar;