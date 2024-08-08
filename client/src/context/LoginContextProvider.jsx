import React from 'react'
import { useState } from 'react';
import LoginContext from './LoginContext.js';

const LoginContextProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider;
