import { Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from './Context/authContext';
const PrivateRoute = ({ children }) => {
  const { accessToken } = useAuth();
  
  return accessToken ? children : <Navigate to="/login"/>;}

export default PrivateRoute;