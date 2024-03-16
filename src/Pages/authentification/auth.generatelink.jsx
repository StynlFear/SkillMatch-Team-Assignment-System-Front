import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Correct import statement for jwtDecode
import Input from "../../Components/Inputs/auth.inputs";
import SubmitButton from "../../Components/Buttons/submit.button";
import Sidebar from "../../Components/SideBar/app.sidebard";
const apiUrl = import.meta.env.VITE_APP_USER_IP;
function GenerateLinkPage() {
  const navigate = useNavigate();
  const [randomLink, setRandomLink] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
  
  
  

  const generateRandomLink = () => {
    const organizationId = localStorage.getItem("organizationId");
    if (organizationId) {
      const link = `http://localhost:5173/worker/${organizationId}`;
      setRandomLink(link);
    } else {
      console.error("Organization ID not found in local storage");
    }
  };

  const sendInvite = () => {
    console.log("Invite sent to:", email);
  };


  return (
    <div><Sidebar/>
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
            type="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <SubmitButton className="generate-link-submit" onClick={sendInvite}>
          Send Invite
        </SubmitButton>
      </div>
      <button className="generate-link-button" onClick={generateRandomLink}>
        Generate Link
      </button>
      {randomLink && (
        <div>
          <h2>Random Link:</h2>
          <input
            className="generate-link-input"
            type="text"
            value={randomLink}
            readOnly
          />
        </div>
      )}
    </div>
    </div>
  );
}

export default GenerateLinkPage;
