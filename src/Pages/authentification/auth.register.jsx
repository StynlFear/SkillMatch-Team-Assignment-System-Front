import React, { useState } from "react";
import SubmitButton from "../../Components/Buttons/submit.button";
import Input from "../../Components/Inputs/auth.inputs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/auth.register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [headquartersAddress, setHeadquartersAddress] = useState("");
  const [errors, setErrors] = useState({});

  const apiUrl = import.meta.env.VITE_APP_USER_IP;

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!email.trim() || !validateEmail(email)) errors.email = "Please enter a valid email";
    if (!validatePassword(password)) errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter and one digit";
    if (!organizationName.trim()) errors.organizationName = "Please enter your organization name";
    if (!headquartersAddress.trim()) errors.headquartersAddress = "Please enter your headquarters address";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/v1/user/createOrganizationAdministrator`, {
        name,
        email,
        password,
        organizationName,
        headquartersAddress,
      });
      console.log("Registration Successful:", response.data);
      navigate('/login');
      // Handle successful registration
    } catch (error) {
      console.error("Registration Failed:", error);
      // Handle registration error
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <div></div>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              Name:
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div>
            <label>
              Email:
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div>
            <label>
              Password:
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div>
            <label>
              Organization Name:
              <Input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </label>
            {errors.organizationName && <div className="error-message">{errors.organizationName}</div>}
          </div>

          <div>
            <label>
              Headquarters Address:
              <Input
                type="text"
                value={headquartersAddress}
                onChange={(e) => setHeadquartersAddress(e.target.value)}
              />
            </label>
            {errors.headquartersAddress && <div className="error-message">{errors.headquartersAddress}</div>}
          </div>

          <SubmitButton className="register" onClick={handleRegister} type="submit">Register</SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
