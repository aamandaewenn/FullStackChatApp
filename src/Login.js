import React, { useState } from "react";
import {useNavigate} from "react-router-dom";


function Login() {
  const [getusername, setUsername] = useState("");
  const [getpassword, setPassword] = useState("");

  let navigate = useNavigate();

  const login = () => {
    fetch('http://localhost:81/login', 
    {method: 'POST', headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
    body: `username=${getusername}&password=${getpassword}`})
    .then(response => response.json()).then(
      response => {
      if (response.error) alert(response.error);
      else{
        sessionStorage.setItem("accessToken", response);
        navigate('/');
      }})
    };

  
return(
    <div className='login'>
        <h3>Login</h3>
        <label>username</label><input type='text' onChange={(event) => {
          setUsername(event.target.value)}}></input><br></br>
        <label>password</label><input type='text' onChange={(e) => {
          setPassword(e.target.value)}}></input><br></br>
        
        <button onClick={login}>Login</button>
        </div>

)
        }

export default Login;