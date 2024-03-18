import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import statement for jwtDecode
import Input from "../../Components/Inputs/auth.inputs";
import SubmitButton from "../../Components/Buttons/submit.button";
import Sidebar from "../../Components/SideBar/app.sidebard";
import emailjs from '@emailjs/browser'
const apiUrl = import.meta.env.VITE_APP_USER_IP;
const serviceId = import.meta.env.VITE_APP_SERVICE_ID;
const templateId = import.meta.env.VITE_APP_TEMPLATE_ID;
const publickey = import.meta.env.VITE_APP_PUBLIC_KEY;

function GenerateLinkPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const base_url = window.location.origin; // Get the base URL
  useEffect(() => {
    const token = localStorage.getItem('refreshToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.userId;
        setUserId(userId);

        axios.get(`${apiUrl}/api/v1/user/${userId}`)
          .then(response => {
            console.log("User data response:", response.data); // Log the response data
            const userData = response.data.data; // Access the 'data' object
            setUserData(userData);

            // Check if user has admin account type from the fetched user data
            if (userData.accountType && userData.accountType.includes("admin")) {
              setIsAdmin(true);
            } else {
              navigate('/login')
            }
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const sendInvite = async () => {
    // Validate email address
    if (!email) {
      setError('Email address is required');
      return;
    }

    try {
      // Make a POST request to the API endpoint to generate random link
      const response = await axios.post(`${apiUrl}/api/v1/user/createEmployeeSignUpURL/`, {
        organizationName: localStorage.getItem('organizationName')
      });

      // Extract the generated URL from the response
      const url = response.data.url;

      // Construct the final link
      const link = `${base_url}/worker/${url}`;

      // Prepare data for email template
      const templateParams = {
        to_name: email,
        from_name: 'SkillMatch Service',
        message: `Please click the following link to complete your registration: ${link}`
      };

      // Send email using EmailJS with the template ID
      await emailjs.send(`${serviceId}`, `${templateId}`, templateParams, `${publickey}`);
      
      // Set success message
      setSuccessMessage('Email sent successfully!');

      // Clear error message
      setError("");
    } catch (error) {
      console.error('Error sending invite:', error);
      setError('Error sending email. Please try again later.');
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="generate-link-container">
        <h1 className="generate-link-title ">Share the organization link</h1>
        <p className="generate-link-description">
          Give the workers access to this organization
        </p>
        <p className="generate-link-description">Email</p>
        <div>
          <label className="generate-link-email">
            <input
              className={"generate-link-input"}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <SubmitButton className="generate-link-submit" onClick={sendInvite}>
            Send Invite
          </SubmitButton>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default GenerateLinkPage;
