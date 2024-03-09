import React, { useState } from 'react';
import SubmitButton from '../../Components/Buttons/submit.button';
import AppButton from '../../Components/Buttons/app.button';
import Input from '../../Components/Inputs/auth.inputs';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_APP_LOCAL_IP;
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode
  const [imageSrc, setImageSrc] = useState('../src/assets/half_moon.svg'); // Initial image source for light mode
  const [transitioning, setTransitioning] = useState(false);
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/signin`, {
        email: email,
        password: password
      });
      const token = response.data.accessToken;
      setToken(token);
      navigate("/worker", { replace: true });
      // Handle the response from the backend
      console.log('Login Successful:', response.data);
      // Redirect user or perform any other action based on the response
  
    } catch (error) {
      // Handle errors
      console.error('Login Failed:', error);
      // You can display an error message to the user or handle the error in another way
    }
    
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
    if (darkMode) {
      setImageSrc('../src/assets/half_moon.svg'); // Light mode: moon image
    } else {
      setImageSrc('../src/assets/sun.svg'); // Dark mode: sun image
    }
  };
  const handleLogout = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className={`login-container ${transitioning ? 'transitioning' : ''}`}>
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
    <div class = "login-body">
    <img className="login-darkmode" type="svg" src={imageSrc} onClick={toggleDarkMode} alt="Dark Mode Toggle" />
        <div><img class="login-image" src="../src/assets/login-photo.jfif" alt="Italian Trulli" /></div>
        <div class="auth-form login">
       
          <h2 class = "login-h2">Login</h2>
          <p class="login-h3">Please enter your login data to continue</p>
          <form >
          <label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </label>
            <br />
            <label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </label>
            <br />
            <SubmitButton onClick={handleLogin}>Login</SubmitButton>
            <p class="login-p">or continue with</p>
            <div class = "login-btn-container">
              <AppButton>Google</AppButton>
              <AppButton>Facebook</AppButton>
              <AppButton>Microsoft</AppButton>
            </div>
          </form>
        </div>
      
    </div>
    {transitioning && <div className="transition-overlay"></div>}
    </div>
    </div>
  );
}

export default LoginPage;
