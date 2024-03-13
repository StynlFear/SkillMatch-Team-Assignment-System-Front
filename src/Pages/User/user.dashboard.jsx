import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/SideBar/app.sidebard";
import UsersList from "../../Components/projectstable/dashboard.users";
import ProjectsList from "../../Components/projectstable/dashboard.projects";
import DepartmentsList from "../../Components/projectstable/dashboard.departments";
import "../../css/user.dashboard.css"
function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
   
    <div className="dashboard"> 
     <Sidebar/>
        <div className="input-results">{/* Render search results here */}</div>
      <div className="card">
        <ProjectsList />
      </div>
      <div className="card">
        <UsersList />
      </div>
      <div className="card">
        <DepartmentsList />
      </div>
    </div>
  );
}

export default UserDashboard;
