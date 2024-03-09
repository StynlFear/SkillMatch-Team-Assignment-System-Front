import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/user.updateuser.css"
function UpdateUserPage() {
  // State variables to store user information
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the user ID from the URL parameter
  const { userid } = useParams();

  useEffect(() => {
    // Function to fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`YOUR_API_ENDPOINT/${userid}`);
        const userData = response.data; // Assuming response.data contains user information
        // Update state with user information
        setUsername(userData.username);
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
    console.log("User ID:", userid);
    console.log("Updated Username:", username);
    console.log("Updated Email:", email);
    console.log("Updated Password:", password);
    // Reset the form after submission
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='form-container-updateuser'>
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
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUserPage;
