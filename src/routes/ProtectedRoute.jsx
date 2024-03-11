import React from 'react';
import { Outlet,Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  const auth = localStorage.getItem('accessToken');

  return (
    auth ? <Outlet/> : <Navigate to="/login"/>
  );
};

export default ProtectedRoute;