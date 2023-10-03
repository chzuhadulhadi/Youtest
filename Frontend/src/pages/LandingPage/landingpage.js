import React, { useEffect, useState } from 'react';
import { apiCall } from '../../apiCalls/apiCalls';
import { getSingleLandingPage } from '../../apiCalls/apiRoutes';
const LandingPage = () => {
    var queryParameters = new URLSearchParams(window.location.search);
    var id = queryParameters.get("id");
    console.log(id);
    const [landingPage, setLandingPage] = useState();
    const [testId, setTestId] = useState();
    // const [allLandingPages, setAllLandingPages] = useState([]);
    useEffect(() => {
        getPage();
    }, []);
    useEffect(() => {
        if (landingPage) {
            document.getElementById("l-page").innerHTML = landingPage;
            const sections = document.querySelectorAll("#l-page section");
            sections.forEach((section) => {
                section.style.border = "none";
            });
        }
    }, [landingPage]);

    const getPage = () => {
        apiCall(
            "post",
            getSingleLandingPage,
            {
                id: id,
            },
            true
        )
            .then((res) => {
                console.log(res.data.data);
                setLandingPage(res.data.data.html);
                setTestId(res.data.data.testId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div id="l-page">
            </div>
        </>
    )
}

export default LandingPage