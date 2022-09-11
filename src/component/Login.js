import React, { useState } from 'react';
import "../css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false)

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      name, password
    };

    const resp = await axios.post("http://stargymtest.infinityfreeapp.com/api/login", loginData);

    if (resp.data.status === 200) {
      setErrors(!errors);
      localStorage.setItem("auth_token", resp.data.token);
      localStorage.setItem("auth_name", resp.data.name);
      navigate("/dashboard");
    } else {
      setErrors(true)
    }
  }


  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" >
        <label>Username</label>
        <input
          type="text"
          name="name"
          className="loginInput"
          placeholder="Enter your username..."
          onChange={(e) => setName(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name='password'
          className="loginInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />{errors ? <span style={{ "color": "red", "paddingTop": "10px" }}>Kullanıcı adı veya şifre hatalı</span> : ""}
        <button className="loginButton" type="submit" onClick={loginSubmit}>
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;