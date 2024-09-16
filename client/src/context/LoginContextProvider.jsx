import React from 'react'
import { useState,useEffect } from 'react';
import LoginContext from './LoginContext.js';

const LoginContextProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
     // Function to check the session status
     const checkLoginStatus = async () => {
      try {
          const response = await fetch('http://localhost:8080/check-session', {
              method: 'GET',
              credentials: 'include', // Ensures cookies are sent with the request
          });

          const data = await response.json();
          if (response.ok && data.isAuthenticated) {
              setIsLoggedIn(true); // User is authenticated
          } else {
              setIsLoggedIn(false); // User is not authenticated
          }
      } catch (error) {
          console.error('Error checking session:', error);
      }
  };

  useEffect(() => {
      checkLoginStatus();
  },[]);

  return (
    <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider;
