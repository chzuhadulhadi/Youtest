import "./sidebar.css";
import Header from "../homepage/header";
import { Link, useNavigate } from "react-router-dom";
import MultiStepForm from "../questionaire/multistepForm/newQuestionaire";
import QuestionaireHistory from "../questionaire/questionaireHistory";
import MainQuestionaire from "../questionaire/main";
import AddUserInList from "../listings/addUserInListing";
import Paper from "../questionaire/questionpaper";
import MyQuestionaire from "../questionaire/myquestionaire";
import { useEffect, useState } from "react";
import SideBar from '../mainComponent/SideBar';
import LandingPageData from "../LandingPage/landingpagedata";
import PricingPlace from "../LandingPage/PricingPlace";
import { Typography } from "@mui/material";
import UpdateUser from "../user/updateUser";
import ChangePassword from "../user/changePassword";


function Dashboard(params) {

  const navigate = useNavigate()
  const location = window.location.pathname
  const [newlocation, setNewLocation] = useState('')
  useEffect(() => {
    if (location) {
      let tmp = location.slice(location.lastIndexOf("/"), location.length);
      setNewLocation(tmp)
    }

  }, [location])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token == null || token == "") {
      navigate('/')
    }
  })

  // const [idPassed, setIdPassed] = useState(0);
  // const myfunc = (e) => {
  //   setIdPassed(e.target.id);
  //   const name = document.querySelectorAll("li");
  //   name.forEach((elem) => {
  //     elem.classList.remove("active");
  //   });
  //   name[e.target.id].classList.add("active");
  //   console.log(e.target.id);
  // };
  console.log(newlocation);
  return (
    <div className="wrapper">
      <SideBar />
      <div id="content">
        <div className="container-fluid">
          <Link to='/dashboard' className="navbar-brand">
            <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>dashboard</Typography>
          </Link>
          {
            newlocation != '/dashboard' &&
            <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}> {"-->"} </Typography>
          }

          {
            (newlocation == '/mytest') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>My Tests</Typography>
              : (newlocation == '/my-mailing-list') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>My Mailing Lists</Typography>
                : (newlocation == '/questionaire-history') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>Test History</Typography>
                  : (newlocation == '/landing-pages') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>Landing Pages</Typography>
                    : (newlocation == '/my-landing-pages') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>My Landing Pages</Typography>
                      : (newlocation == '/PricingPlace') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>Pricing Place</Typography>
                        : (newlocation == '/my-landing-pages') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>My Landing Pages</Typography>
                          : (newlocation == '/update') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>Update User</Typography>
                            : (newlocation == '/change-password') ? <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>Change Password</Typography>
                              : <Typography variant="span" style={{ color: '#000', fontWeight: 'bold' }}>Dashboard</Typography>
          }
        </div>
        {(newlocation == '/mytest') && <MyQuestionaire />}
        {(newlocation == '/my-mailing-list') && <AddUserInList />}
        {(newlocation == '/questionaire-history') && <QuestionaireHistory />}
        {(newlocation == '/landing-pages') && <LandingPageData />}
        {(newlocation == '/PricingPlace') && <PricingPlace />}
        {(newlocation == '/my-landing-pages') && <Paper />}
        {(newlocation == '/update') && <UpdateUser />}
        {(newlocation == '/change-password') && <ChangePassword/>}
      </div>
    </div>
  )
}
export default Dashboard;
