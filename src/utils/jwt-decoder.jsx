import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_APP_USER_IP;
const apiUrl1 = import.meta.env.VITE_APP_USER_IP;
function JwtDecoder() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem('refreshToken');

    if (token) {
      try {
        // Decode the JWT to extract user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.userId; // Access userId from the decoded token
        setUserId(userId); // Update userId state

        // Fetch user data based on userId
        axios.get(`${apiUrl}/api/v1/user/${userId}`)
          .then(response => {
            const userData = response.data; 
            setUserData(userData);
           
            // Fetch organization ID based on organization name
            const organizationName = userData.data.organizationName;
            localStorage.setItem('organizationName', organizationName);
            axios.get(`https://starfish-app-wpdsi.ondigitalocean.app/v1/organization/v/${organizationName}`)
              .then(orgResponse => {
                const organizationId = orgResponse.data.organizationId;
                console.log(organizationId);
                // Store organization ID in local storage
                localStorage.setItem('organizationId', organizationId);
                navigate('/dashboard');
              })
              .catch(orgError => {
                console.error('Error fetching organization data:', orgError);
              });
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      } catch (error) {
        console.error('Error decoding token:', error.message);
      }
    }
  }, []);

  return (
    <div>
    </div>
  );
}

export default JwtDecoder;
