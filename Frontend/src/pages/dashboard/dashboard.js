import "./sidebar.css";
import Header from "../homepage/header";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../questionaire/multistepForm/newQuestionaire";
import QuestionaireHistory from "../questionaire/questionaireHistory";
import MainQuestionaire from "../questionaire/main";
import AddUserInList from "../listings/addUserInListing";
import Paper from "../questionaire/questionpaper";
import MyQuestionaire from "../questionaire/myquestionaire";
import { useEffect, useState } from "react";
import SideBar from '../mainComponent/SideBar';


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
  return (
    <div className="wrapper">
      <SideBar />

      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <div className="container-fluid custom-fluid" style={{ justifyContent: 'flex-end' }}>
            <p onClick={() => {
              localStorage.removeItem('token')
              navigate('/')
            }}
              style={{ backgroundColor: '#FF9000', cursor: 'pointer', padding: '3px 6px', color: "white", float: "right" }}> Logout </p>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
            </div>
          </div>
        </nav>
        {(newlocation == '/mytest') && <MyQuestionaire />}
        {(newlocation == '/my-mailing-list') && <AddUserInList />}
        {(newlocation == '/questionaire-history') && <QuestionaireHistory />}
        {(newlocation == '/landing-pages') && <Paper />}
        {(newlocation == '/my-landing-pages') && <Paper />}
      </div>
    </div>
  )
}
export default Dashboard;
