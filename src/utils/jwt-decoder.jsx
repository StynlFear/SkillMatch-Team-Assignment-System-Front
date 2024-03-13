import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
const apiUrl = import.meta.env.VITE_APP_LOCAL_IP;
function JwtDecoder() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

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
            setUserData(response.data); // Assuming response.data contains user data
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
      <h1>Welcome to Your App</h1>
      {userId ? (
        <div>
          <p>User ID: {userId}</p>
          {userData && (
            <div>
              <p>User Data:</p>
              <p>Organization Name: {userData.data.organizationName}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to view your user ID</p>
      )}
    </div>
  );
}

export default JwtDecoder;
