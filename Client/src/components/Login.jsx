import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  let data = {
    email,
    password,
  };
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/checkuser",
        data
      );
      const token = response.data.token;

      if (token) {
        setToken(token);
        localStorage.setItem("token", token);
        alert("Login success");
        navigate("/user");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert(
        "An error occurred during login. Please check the console for details."
      );
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <form className="form_container">
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input"
            />
            <button className="green_btn" onClick={submit}>
              Login
            </button>
          </form>
        </div>
        <div className="right">
          <h1>New Here ?</h1>
          <Link to={"/signup"}>
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
