import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./app.sidebar.css"; // Import CSS for styling

function Sidebar({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
    toggleSidebar(!isOpen); // Pass the updated state to the parent component
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    toggleSidebar(false); // Pass the updated state to the parent component
  };

  const handleNavigation = (path) => {
    navigate(path); // Use navigate to navigate to the specified path
    handleCloseMenu(); // Close the menu after navigation
  };

  return (
    <nav className={isOpen ? "open" : ""}>
      <div className="logo">
        <i className="bx bx-menu menu-icon" onClick={handleToggleMenu}></i>
        <span className="logo-name">SkillMatching</span>
      </div>
      <div className="sidebar">
        <div className="logo">
          <i className="bx bx-menu menu-icon" onClick={handleToggleMenu}></i>
          <span className="logo-name">SkillMatching</span>
        </div>

        <div className="sidebar-content">
          <ul className="lists">
            <li className="list">
              <button className="nav-link" onClick={() => handleNavigation("/dashboard")}>
                <i className="bx bx-home-alt icon"></i>
                <span className="link">Dashboard</span>
              </button>
            </li>
            <li className="list">
              <button className="nav-link" onClick={() => handleNavigation("/generatelink")}>
                <i className="bx bx-home-alt icon"></i>
                <span className="link">Generate Link</span>
              </button>
            </li>
          </ul>
          <div className="bottom-content">
            <li className="list">
              <button className="nav-link" onClick={() => handleNavigation("/settings")}>
                <i className="bx bx-cog icon"></i>
                <span className="link">Settings</span>
              </button>
            </li>
            <li className="list">
              <button className="nav-link" onClick={() => handleNavigation("/logout")}>
                <i className="bx bx-log-out icon"></i>
                <span className="link">Logout</span>
              </button>
            </li>
          </div>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={handleCloseMenu}></div>}
    </nav>
  );
}

export default Sidebar;
