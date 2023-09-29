import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {signup} from '../../apiCalls/apiRoutes'
import {apiCall} from '../../apiCalls/apiCalls'
import PhoneInput from 'react-phone-input-2'
import { toast } from "react-toastify";

function SignUp(params) {

  const showToastMessage = (text, color, notify) => {
    if (notify == 1) {
      toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    } else {
      toast.warning(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    }
  };
   const [value, setValue] = useState()
  const [dataToSend, setDataToSend] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneNumberCode: "",
    email: "",
    password: "",
    termsAndService: 1,
    promotions: 1,
    role: 2,
  });

  useEffect(()=>{
    dataToSend.phoneNumber = value
  },[value])
 

  const navigate = useNavigate();
const [confirmationText, setConfirmationText] = useState("")
  const addValues = (e) => {
    setDataToSend((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    console.log(dataToSend)
  };


  const routeHandler = (url) =>{
setTimeout(() => {
  navigate(url)
}, 3000);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setConfirmationText('')
    apiCall('post', signup , dataToSend)
    .then((res)=>{
        if(res.status==200){
          console.log(res?.data?.data?.email)
          const url = "/login/?email=" + res?.data?.data?.email
            showToastMessage("User added successfully ", "green", 1);

            routeHandler(url)
        }
        else{
          showToastMessage('User already Exist, Try again with different Email' , "green",1)
        }
    })
    .catch((err)=>{
      showToastMessage(err?.response?.data?.message, "red", 2);

    })
    
  };
  return (
    <div class="Get_sec">
      <div class="Mid" style={{ height: "100vh" }}>
        <i
          class="fa fa-home"
          onClick={() => {
            navigate("/");
          }}
        ></i>

        <div class="Leftside">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              id="firstName"
              placeholder="FIRST NAME..."
              onChange={addValues}
              class="field"
              required
            />
            <input
              type="text"
              id="lastName"
              placeholder="LAST NAME..."
              onChange={addValues}
              class="field"
              required
            />
            <input
              type="email"
              id="email"
              placeholder="EMAIL..."
              onChange={addValues}
              class="field"
              required
            />
            <input
              type="tel"
              id="phoneNumberCode"
              placeholder="NUMBER CODE..."
              onChange={addValues}
              class="field"
              required
            />
           
            <input
              type="tel"
              id="phoneNumber"
              placeholder="NUMBER..."
              onChange={addValues}
              class="field"
              required
            />
            <input
              type="password"
              id="password"
              minLength="8"
              placeholder="Password ..."
              onChange={addValues}
              class="field"
              required
            />

            <input type="submit" value="send" class="button" />
          </form>
          <p style={{color:'red'}}>{confirmationText}</p>
        </div>
        <div class="Rightside">
          <div class="loginPage">
            <h3>Sign Up !</h3>
            <p> Your information will be secure with us</p>
            <p> Signin will benefit you</p>
            <h4>If you already have an account </h4>
            <button
              onClick={() => {
                navigate("/login");
              }}
              class="clickable-primary-text"
            >
              Login
            </button>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
