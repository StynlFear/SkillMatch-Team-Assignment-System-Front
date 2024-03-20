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
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [imageSrc, setImageSrc] = useState('../src/assets/half_moon.svg');
  const [transitioning, setTransitioning] = useState(false);

  const [error, setError] = useState('');


  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
  
    try {
      const response = await axios.post(`${apiUrl}/api/v1/user/login`, {
        email: email,
        password: password
      });
  
      console.log('Server Response:', response); // Log the entire response object
  
      if (response.data.status === 200) {
        // Handle successful login
        const { accessToken, refreshToken } = response.data;
        setToken(accessToken, refreshToken); // Store tokens in local storage
        console.log('Login Successful:', response.data);
        navigate('/decoder');
      } else {
        // Handle authentication failure
        setError(response.data.message || 'Incorrect email or password. Please try again.');
      }

    } catch (error) {
      // Handle other errors
      console.error('Login Failed:', error);

      setError('An error occurred while processing your request. Please try again later.');

    }
  };
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setImageSrc(darkMode ? '../src/assets/half_moon.svg' : '../src/assets/sun.svg');
  };

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setError(''); // Clear error message when logging out
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
              {error && <p className="login-p">{error}</p>}
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
              {error && <p className="error-message">{error}</p>} {/* Display error message */}
              <p className="login-p">Don't have an account? <a href="/register">Sign up</a></p>
              <p className="login-p">Already have a link to an organization?  <a href="/userlink">To the page</a></p>
            </form>
          </div>
        </div>
        {transitioning && <div className="transition-overlay"></div>}
      </div>
    </div>
  );
}

export default LoginPage;
