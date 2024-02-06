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
function SideBar(props) {
    const navigate = useNavigate()
    const [packageData, setPackageData] = useState({})
    useEffect(() => {
        apiCall('post', userPackage, {}).then((res) => {
            setPackageData(res.data.data)
        }
        ).catch((err) => {
            console.log(err)
        })
    }, []);
    return (
        <nav id="sidebar">
            <header style={{position:'relative' ,background:'none'}} >
                <div className="site-logo">
                    <h1>
                        <a href="/#home"  style={{fontSize:'25px'}}>
                            Test<span>Factory</span>
                        </a>
                    </h1>
                </div>
            </header>
                <ul className="list-unstyled components" style={{ overflow: 'auto',width:'100%' }}>
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
                        <a id="6">Pricing Place </a>
                    </li>
                    {packageData.payment &&
                        <div style={{ border: '1px solid white', margin: '10px', paddingInline: '10px', borderRadius: '10px' }}>
                            <li id="7">
                                <h6 id="6">My package: {packageData.package.packageName} </h6>
                                <h6 id="6">Sent Tests: {packageData.package.numberOfTests - packageData.payment.RemainingNumberOfTests} </h6>
                                <h6 id="6">Remaining tests: {packageData.payment.RemainingNumberOfTests} </h6>
                                <h6 id="6">Expiry date: {new Date(packageData.payment.expireDate).toDateString()} </h6>
                            </li>
                        </div>
                    }
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