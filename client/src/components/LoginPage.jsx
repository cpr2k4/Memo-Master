import React, { useState } from 'react';
import { loginAPI } from '../api/allApi';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import '../style/login.css'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn} = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    let loginData = {
      email,
      password
    };
    
    // Example success handling
    try {
        // Add login logic here (e.g., API call)
        let response = await loginAPI(loginData);
        if(response.status === "success"){
          console.log("Login successful...");
          setIsLoggedIn(true);
          navigate("/");
        }
        else{
          setErrorMessage(response.message);
        }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              className="password-container-input"
              type={showPassword==true?"text":"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={{textAlign:"center",width:"80px"}} type="button" onClick={()=>setShowPassword(!showPassword)}><span>{showPassword===true?"hide":"show"}</span></button>
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
      </div>
  );
};

export default LoginPage;
