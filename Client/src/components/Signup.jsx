import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPass] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  let data = {
    name,
    email,
    password,
  };

  //api to send signup data to the backend
  function handleSubmit() {
    console.log(data);
    axios
      .post("http://localhost:8000/signup", data)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("registered successfully");
        }
      })
      .catch((err) => {
        alert("Error");
      });
  }

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="sign_left">
          <h1>Welcome Back</h1>
          <Link to="/">
            <button type="button" className="white_btn">
              Login
            </button>
          </Link>
        </div>
        <div className="sign_right">
          <form className="sign_form_container">
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              className="input"
            />
            <button type="submit" className="green_btn" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
