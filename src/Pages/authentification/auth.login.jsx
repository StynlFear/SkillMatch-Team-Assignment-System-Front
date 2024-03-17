import React, { useState } from 'react';
import SubmitButton from '../../Components/Buttons/submit.button';
import AppButton from '../../Components/Buttons/app.button';
import Input from '../../Components/Inputs/auth.inputs';
import axios from 'axios';
import { setToken } from '../../routes/auth';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_USER_IP;

function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate= useNavigate();
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [imageSrc, setImageSrc] = useState('../src/assets/half_moon.svg');
  const [transitioning, setTransitioning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/user/login`, {
        email: email,
        password: password
      });
      const { accessToken, refreshToken } = response.data;
      setToken(accessToken, refreshToken); // Store tokens in local storage
      console.log('Login Successful:', response.data);
      navigate('/decoder');
      // Redirect user or perform any other action based on the response
    } catch (error) {
      // Handle errors
      console.error('Login Failed:', error);
      setErrorMessage('Invalid email or password. Please try again.'); // Set error message
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      setImageSrc('../src/assets/half_moon.svg');
    } else {
      setImageSrc('../src/assets/sun.svg');
    }
  };

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setErrorMessage(''); // Clear error message when logging out
  };

  return (
    <div className={`login-container ${transitioning ? 'transitioning' : ''}`}>
      <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
        <div className="login-body">
          <img className="login-darkmode" type="svg" src={imageSrc} onClick={toggleDarkMode} alt="Dark Mode Toggle" />
          <div></div>
          <div className="auth-form login">
            <h2 className="login-h2">Login</h2>
            <p className="login-h3">Please enter your login data to continue</p>
            <form>
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
              {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
              <p className="login-p">Don't have an account? <a href="/register">Sign up</a></p>
            </form>
          </div>
        </div>
        {transitioning && <div className="transition-overlay"></div>}
      </div>
    </div>
  );
}

export default LoginPage;
