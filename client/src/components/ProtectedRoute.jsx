// components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(LoginContext);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
