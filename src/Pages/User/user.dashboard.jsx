import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/SideBar/app.sidebard";
import UsersList from "../../Components/projectstable/dashboard.users";
import ProjectsList from "../../Components/projectstable/dashboard.projects";
import DepartmentsList from "../../Components/projectstable/dashboard.departments";
import "../../css/user.dashboard.css";
import SkillList from "../../Components/projectstable/dashboard.skills";
import CustomRoles from "../../Components/projectstable/dashboard.customroles";

function UserDashboard() {
  const organizationId = localStorage.getItem("organizationId");
  const organizationName = localStorage.getItem("organizationName");
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`dashboard ${window.scrollY > 100 ? 'offset-top' : ''}`}> 
      <Sidebar/>
      <div className="card">
        <div className="card-header">Projects</div>
        <div className="card-body">
          <ProjectsList  />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Users</div>
        <div className="card-body">
          <UsersList organizationName={organizationName} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Departments</div>
        <div className="card-body">
          <DepartmentsList organizationId={organizationId} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Custom Roles</div>
        <div className="card-body">
          <CustomRoles />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
