import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Pages/auth.provider';
import axios from 'axios';

const ProtectedRoute = () => {
  const { accessToken, refreshToken, setTokens } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!accessToken && refreshToken) {
          // Access token is missing but refresh token is available, try refreshing access token
          const response = await axios.post('/api/auth/refresh-token', { refreshToken });
          const { accessToken: newAccessToken } = response.data;
          setTokens(newAccessToken, refreshToken);
        }
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        // Handle error (e.g., logout user)
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [accessToken, refreshToken, setTokens]);

  if (loading) {
    // Show loading indicator while checking authentication status
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    // If access token is missing, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export { ProtectedRoute }; // Export as named export
