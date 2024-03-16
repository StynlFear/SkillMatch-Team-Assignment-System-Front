import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Components/Inputs/auth.inputs";
import SubmitButton from "../../Components/Buttons/submit.button";

const apiUrl = import.meta.env.VITE_APP_USER_IP;

function WorkerRegister() {
  const organizationId= localStorage.getItem("organizationId");
  console.log(organizationId)
 const  url = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!email.trim() || !validateEmail(email)) errors.email = "Please enter a valid email";
    if (!validatePassword(password)) errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter and one digit";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Registration object
    const registrationData = {
      name,
      email,
      password,
      organizationId: organizationId
    };

    try {
      // Send registration request
      const response = await axios.post(`${apiUrl}/api/v1/user/register/${url}`, registrationData);
      console.log("Registration Successful:", response.data);
      navigate('/login');
    } catch (error) {
      console.error("Registration Failed:", error);
      // Handle registration error
    }
  };

  return (
    <div className="login-container">
      <div className="login-body">
        <div className="auth-form register">
          <h2 className="login-h2">Register</h2>
          <p className="login-h3">Please enter your data to continue</p>
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
