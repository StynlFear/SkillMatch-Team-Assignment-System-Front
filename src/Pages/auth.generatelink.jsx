import React, { useState } from "react";
import Input from "../Components/Inputs/auth.inputs";
import SubMitButton from "../Components/Buttons/submit.button";
import "../css/auth.generatelink.css";
function GenerateLinkPage() {
  const [randomLink, setRandomLink] = useState("");

  // Function to generate a random link
  const generateRandomLink = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setRandomLink("https://skillmatchup.com/" + result);
  };

  return (
    <div>
      <h1>Share the organization link</h1>
      <p>Give the workers acces to this organization</p>
      <p>Email</p>
      <div className="authlink-container">
        <label>
          <Input
            type="Email"
            placeholder="Email"
            style={
              {
                
              }
            }
            maxWidth="400px" 
          />
        </label>
        <SubMitButton
  className="black authlink-submit"
  style={{ maxWidth: "20px" }}
>
  Send Invite
</SubMitButton>
      </div>
      <button onClick={generateRandomLink}>Generate Link</button>
      {randomLink && (
        <div>
          <h2>Random Link:</h2>
          <a href={randomLink} target="_blank" rel="noopener noreferrer">
            {randomLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default GenerateLinkPage;
