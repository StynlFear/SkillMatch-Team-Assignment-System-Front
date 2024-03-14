import React, { useState } from "react";
import Input from "../../Components/Inputs/auth.inputs";
import SubmitButton from "../../Components/Buttons/submit.button";

function GenerateLinkPage() {
  const [randomLink, setRandomLink] = useState("");
  const [email, setEmail] = useState("");

  // Function to generate a random link
  const generateRandomLink = () => {
    const organizationId = localStorage.getItem("organizationId"); // Retrieve organization ID from local storage
    if (organizationId) {
      const link = `http://localhost:5173/worker/${organizationId}`;
      setRandomLink(link);
    } else {
      console.error("Organization ID not found in local storage");
    }
  };

  const sendInvite = () => {
    // Logic to send invite
    console.log("Invite sent to:", email);
  };

  return (
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
  );
}

export default GenerateLinkPage;
