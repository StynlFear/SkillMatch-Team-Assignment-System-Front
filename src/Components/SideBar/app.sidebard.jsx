import React from "react";
import { useState } from "react";
import "./app.sidebar.css"; // Import CSS for styling

function Sidebar({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
    toggleSidebar(!isOpen); // Pass the updated state to the parent component
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    toggleSidebar(false); // Pass the updated state to the parent component
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
              <a href="/dashboard" className="nav-link">
                <i className="bx bx-home-alt icon"></i>
                <span className="link">Dashboard</span>
              </a>
            </li>
            <li className="list">
              <a href="/createproject" className="nav-link">
                <i className="bx bx-bar-chart-alt-2 icon"></i>
                <span className="link">Projects</span>
              </a>
            </li>
            <li className="list">
              <a href="/generatelink" className="nav-link">
                <i className="bx bx-bell icon"></i>
                <span className="link">Users</span>
              </a>
            </li>
            
            <li className="list">
              <a href="/createdepartment" className="nav-link">
                <i className="bx bx-message-rounded icon"></i>
                <span className="link">Departments</span>
              </a>
            </li>
          <li className="list">
              <a href="/logout" className="nav-link">
                <i className="bx bx-bell icon"></i>
                <span className="link">Logout</span>
              </a>
            </li>
            </ul>
          <div className="bottom-content">
            <li className="list">
              <a href="#" className="nav-link">
                <i className="bx bx-cog icon"></i>
                <span className="link">Settings</span>
              </a>
            </li>
            <li className="list">
              <a href="#" className="nav-link">
                <i className="bx bx-log-out icon"></i>
                <span className="link">Logout</span>
              </a>
            </li>
          </div>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={handleCloseMenu}></div>}
    </nav>
  );
}

export default Sidebar;
