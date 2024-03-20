import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../css/user.updateuser.css";
import RoleFetcher from "../../utils/user.rolefetcher";
const apiuserUrl = import.meta.env.VITE_APP_USER_IP;

function UpdateUserPage() {
  // State variables to store user information
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the user ID from the URL parameter
  const { userid } = useParams();

  useEffect(() => {
    // Function to fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiuserUrl}/api/v1/user/${userid}`);
        const userData = response.data.data; // Access data property to get user information
        // Update state with user information
        setUsername(userData.name);
        setEmail(userData.email);
        // Assuming password is not fetched from API for security reasons
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [userid]); // Fetch data when userid changes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle form submission, such as sending data to a server or updating state
    try {
      const response = await axios.put(`${apiuserUrl}/api/v1/user/${userid}`, {
        name: username,
        email: email,
        password: password // Include password in the request body
      });
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
    // Reset the form after submission
    setUsername('');
    setEmail('');
    setPassword('');
    navigate('/dashboard')
  };

  return (
    <div className='form-container-updateuser'>
      <RoleFetcher types={["admin","departmentManager"]} />
     <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUserPage;
