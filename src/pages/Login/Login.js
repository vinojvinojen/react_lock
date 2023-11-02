import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommonTextField from "../../componets/CommonTextField";
import './Login.css'
import CommonButton from "../../componets/CommonButton";
import { LoginPost } from "../../API/Api";
import { useDispatch } from "react-redux";
import { updateToken} from "../../features/loginToken/loginSlice";
// import logo from '../../assets/company_logo.jpg'; // Use require to import the image



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("LockApi2022");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigate();
  const dispatch=useDispatch();


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!username || !password) {
    //   setErrorMessage("please fill in both fields.");
    // } else {
    //   const data = {
    //     username: username,
    //     password: password,
    //     grant_type: "password",
    //   };

    //   try{
    //     LoginPost(data).then((res) => {
    //       dispatch(updateToken(res.data));    
    //       console.log(res.data);
           
    //       navigation("/dashboard")
    //     })
    //       .catch((error) => {
    //         console.error("error" + error);
    //         // setErrorMessage("An error occurred during login.");
    //       });
    //     setErrorMessage("");
    //   }catch(error ){
    //     console.error('Error:', error);

    //   }
     
    // }

    console.log(username);
              navigation("/dashboard")

  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <div className="login-container">
    //   <form onSubmit={handleSubmit} className="login-form">

    //     <CommonTextField
    //       label="Username : "
    //       value={username}
    //       onChange={(e) => setUsername(e)} // Pass the event object

    //     />

    //     <CommonTextField
    //       label="Password : "
    //       value={password}
        
    //       onChange={(e) => setPassword(e)} // Pass the event object

    //     />

    //     <div style={{ display: 'flex', justifyContent: 'center', marginRight: "14vh" }}>
    //       <CommonButton
    //         label="Login"
    //         backgroundColor="#4CAF50"
    //         width="200vh"
    //       ></CommonButton>
    //     </div>

    //   </form>
    // </div>
     <div className="login-container">
      {/* <img src={logo} alt="napco" /> */}

      <form className="login-form">
        <div className="login-form">
          <label className="label" htmlFor="username">Username:</label>
          <input
                    className="field"

            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label  htmlFor="password" className="label">Password:</label>
          <input
          className="field"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button"  className="login-btn"
        onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
