import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SubmitButton from "../../Components/Buttons/submit.button";
import AppButton from "../../Components/Buttons/app.button";
import Input from "../../Components/Inputs/auth.inputs";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_LOCAL_IP;
function WorkerRegister() {
  const { organizationId } = useParams(); // Extract organizationId from URL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode
  const [imageSrc, setImageSrc] = useState("../src/assets/half_moon.svg"); // Initial image source for light mode
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!email.trim()|| !validateEmail(email)) errors.email = "Please enter your email";
    if (!validatePassword(password)) errors.password = "Please enter your password";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/v1/user/signup`, {
        name,
        email,
        password,
        organizationId,
      });
      console.log("Registration Successful:", response.data);
      // Handle successful registration
    } catch (error) {
      console.error("Registration Failed:", error);
      // Handle registration error
    }
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
    if (darkMode) {
      setImageSrc("../src/assets/half_moon.svg"); // Light mode: moon image
    } else {
      setImageSrc("../src/assets/sun.svg"); // Dark mode: sun image
    }
  };

  return (
    <div className={`login-container ${darkMode ? "dark-mode" : ""}`}>
      <div class="login-body">
        <img
          className="login-darkmode"
          type="svg"
          src={imageSrc}
          onClick={toggleDarkMode}
          alt="Dark Mode Toggle"
        />
        <div>
          <img
            class="login-image"
            src="../src/assets/login-photo.jfif"
            alt="Italian Trulli"
          />
        </div>
        <div class="auth-form register" >
          <h2 class="login-h2">Register</h2>
          <p class="login-h3">Please enter your data to continue</p>
          <form>
            <label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
               {errors.name && <div className="error-message">{errors.name}</div>}
            </label>
            <br />
            
            <label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
               {errors.email && <div className="error-message">{errors.email}</div>}
            </label>
            <br />
            <label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
                {errors.password && <div className="error-message">{errors.password}</div>} 
            </label>
            
            <SubmitButton onClick={handleRegister}>Register</SubmitButton> 
          </form>
        </div>
      </div>
     
    </div>
  );
}

export default WorkerRegister;
