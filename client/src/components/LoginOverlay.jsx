import React, { useState } from "react";
import "../style/LoginOverlay.css";
import { Button, Link } from "@mui/material";
import { signupAPI } from "../api/allApi";

const LoginOverlay = ({ isLoggedIn,setIsLoggedIn}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    setEmail("");
    setPassword("");
    setUsername("");
    setShowPassword(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Simulated server response for validation
    const userExists = true; // Replace with actual server call
    const passwordCorrect = false; // Replace with actual server call

    if (!userExists || !passwordCorrect) {
      setErrorMessage("Email or password is incorrect");
    } else {
      //handle login
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    let userSignUpData = {
      username,
      email,
      password
    };

    try {
      let isSignUpSuccessful = await signupAPI(userSignUpData);
      if (isSignUpSuccessful) {
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Sign-up failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || (!isLogin && !username)) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    if (isLogin) {
      handleLogin(event);
    } else {
      handleSignUp(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {!isLoggedIn && (
        <div className="overlay">
          <div className="login-box">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
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
                  style={{ textTransform: "none" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
              <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="toggle-link">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <Button onClick={toggleForm}>Sign Up</Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button onClick={toggleForm}>Login</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginOverlay;
