import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ requiredRole = null }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        console.log('Verifying auth with token:', token);
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Auth verification failed');
        }
        
        const data = await response.json();
        console.log('Auth verification response:', data);
        
        if (data.user) {
          setIsAuthenticated(true);
          setUserRole(data.user.role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        setIsAuthenticated(false);
        // If token is invalid, remove it
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, []);
  
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Verifying authentication...
        </Typography>
      </Box>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If role is required and user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute; 