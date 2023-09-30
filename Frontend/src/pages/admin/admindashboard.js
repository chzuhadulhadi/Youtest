import "../dashboard/sidebar.css";
import Header from "../homepage/header";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../questionaire/multistepForm/newQuestionaire";
import QuestionaireHistory from "../questionaire/questionaireHistory";
import MainQuestionaire from "../questionaire/main";
import AddUserInList from "../listings/addUserInListing";
import Paper from "../questionaire/questionpaper";
import MyQuestionaire from "../questionaire/myquestionaire";
import Users from "./users";
import Tests from "./tests";
import { useEffect, useState } from "react";
import AdminSideBar from './sidebar';
import AdminEditTest from "./editTest";
import Results from "./results";


function AdminDashboard(params) {

  const navigate = useNavigate()
  const location = window.location.pathname
  const [newlocation, setNewLocation] = useState('');
  console.log(/^\/\d+/.test(newlocation) );
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
      <AdminSideBar />

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
        {(newlocation == '/users') && <Users />}
        {(newlocation == '/tests') && <Tests />}
        {(newlocation == '/results') && <Results />}
        {/^\/\d+/.test(newlocation) && <AdminEditTest />}
      </div>
    </div>
  )
}
export default AdminDashboard;
