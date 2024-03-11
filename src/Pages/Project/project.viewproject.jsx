import React from "react";
import EmployeeSearch from "../TeamFind/team.available";
import "../../css/project.viewproject.css"
function ViewProjectPage({ project }) {
  return (
    <div className="employee-search">
        <div  className="view-project-container">
      <h2>View Project</h2>
      <div className="view-project-option">
        <strong className="view-project-title">Title:</strong> <p className="view-project-value">{project.title}</p>
      </div>
      <div className="view-project-option">
        <strong className="view-project-title">Description:</strong> {project.description}
      </div>
      <div>
        <strong className="view-project-title">Period:</strong> {project.period}
      </div>
      <div>
        <strong className="view-project-title">Start Date:</strong> {project.startDate}
      </div>
      {project.period === "fixed" && (
        <div>
          <strong className="view-project-title">Deadline Date:</strong> {project.deadlineDate}
        </div>
      )}
      <div>
        <strong className="view-project-title">Technology Stack:</strong> {project.techStack}
      </div>
      <div>
        <strong className="view-project-title">Status:</strong> {project.status}
      </div>
      <div>
        <strong className="view-project-title ">Selected Roles:</strong>{" "}
        {project.selectedRoles.map((role) => (
          <span className="view-project-value view-project-option" key={role}>{role}, </span>
        ))}
      </div>
      </div>
      <EmployeeSearch/>
    </div>
  );
}

export default ViewProjectPage;
