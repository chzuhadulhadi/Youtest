import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiCall } from '../../apiCalls/apiCalls';
import { userPackage } from '../../apiCalls/apiRoutes';
import '../homepage/header.css';
import '../homepage/css/media.css';
import '../homepage/css/theme.css';
// import "./css/media.css";
// import "./css/theme.css"

import './sidebar.css'
import { Grid } from '@mui/material';
function SideBar(props) {
    const navigate = useNavigate()
    const [packageData, setPackageData] = useState({})

    return (
        <nav id="sidebar">
            <header style={{ position: 'relative', background: 'none' }} >

                <div className="site-logo">
                    <Grid container>
                        <Grid item xs={2}>
                            <a href="/" style={{ fontSize: '25px' }}>

                                <div style={{ textAlign: 'center', background: 'none', marginLeft: '20px' }}>
                                    <i className='fa fa-home' style={{ fontSize: '25px', color: 'white' }}></i>
                                </div>
                            </a>
                        </Grid>
                        <Grid item xs={10}>
                            <h1 style={{ textAlign: 'center', margin: '0', paddingTop: '0', paddingBottom: '0' }}>

                                <a href="/" style={{ fontSize: '25px' }}>

                                    Test<span>Factory</span>
                                </a>
                            </h1>
                        </Grid>
                    </Grid>
                </div>
            </header>
            <ul className="list-unstyled components" style={{ overflow: 'auto', width: '100%' }}>
                <li id="2" onClick={() => { navigate("/dashboard/mytest") }}>
                    <a id="1">My Tests </a>
                </li>
                <li id="3" onClick={() => { navigate("/dashboard/my-mailing-list") }}>
                    <a id="2">My Mailing Lists </a>
                </li>
                <li id="4" onClick={() => { navigate("/dashboard/questionaire-history") }}>
                    <a id="3">Test History </a>
                </li>
                <li id="5" onClick={() => { navigate("/dashboard/landing-pages") }}>
                    <a id="4">Landing Pages </a>
                </li>
                <li id="6" onClick={() => { navigate("/dashboard/my-landing-pages") }}>
                    <a id="5">My Landing Pages </a>
                </li>
                <li id="6" onClick={() => { navigate("/dashboard/PricingPlace") }}>
                    <a id="6">Pricing </a>
                </li>
                <li id="7" onClick={() => { navigate("/dashboard/update") }}>
                    <a id="7">My Account Details </a>
                </li>
                <li id="7" onClick={() => { navigate("/dashboard/change-password") }}>
                    <a id="7">Change Password </a>
                </li>

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

export default SideBar;