import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/SideBar/app.sidebard";
function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
   
    <div className="user-dashboard content"> 
     <Sidebar/>
      <h1>Greetings, John Doe!</h1>
      <div className="container">
        <div className="form-container">
          <div className="form-content">
            <form className="dashboard-form">
              <input
                type="search"
                className="dashboard-input"
                placeholder="Search for users"
              />
              <button type="submit" className="dashboard-button">
                Search
              </button>
            </form>
            <Link to="/users" className="link dashboard">
              view users <span>&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="input-results">{/* Render search results here */}</div>
      </div>

      <div className="dashboard-section">
        <h2>Assigned Projects</h2>
        <p>You are assigned to 3 projects.</p>
      </div>
      <div className="dashboard-section">
        <h2>Hours Spent on Projects</h2>
        <div className="project-hours">
          <p>Project 1: 4 hours/day</p>
          <p>Project 2: 5 hours/day</p>
          <p>Project 3: 6 hours/day</p>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Your Roles</h2>
        <p>You have the following roles:</p>
        <ul>
          <li>Developer</li>
          <li>Designer</li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
