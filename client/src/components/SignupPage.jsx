import React, { useState } from "react";
import { Button } from "@mui/material";
import { signupAPI } from "../api/allApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import bcrypt from 'bcrypt';
import "../style/Signup.css";
import LoginContext from "../context/LoginContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log(event);

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password,saltRounds);

    let userSignUpData = {
      username,
      email,
      password
    };

    try {
      let response = await signupAPI(userSignUpData);
      if (response === "success") {
        // Handle successful sign-up (e.g., redirect or show a success message)
        console.log("Sign-up successful!");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setErrorMessage("",response);
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || !username) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    handleSignUp(event);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-box">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            className="password-container-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={togglePasswordVisibility}
            style={{ textTransform: "none", width: "20px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default SignupPage;
