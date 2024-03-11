import React, { useState } from "react";
import RoleSelectionPage from "../../Components/Role selector/fetchroles";
import "../../css/project.createproject.css";

function CreateProjectPage() {
  // State variables to store the form input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("fixed");
  const [startDate, setStartDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [status, setStatus] = useState("not_started");
  const [techStack, setTechStack] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form input values
    console.log("Project Title:", title);
    console.log("Project Description:", description);
    console.log("Project Period:", period);
    console.log("Start Date:", startDate);
    console.log("Deadline Date:", deadlineDate);
    console.log("Project Status:", status);
    console.log("Technology Stack:", techStack);
    console.log("Selected Roles:", selectedRoles);

    // Reset the form after submission
    setTitle("");
    setDescription("");
    setPeriod("fixed");
    setStartDate("");
    setDeadlineDate("");
    setStatus("not_started");
    setTechStack("");
    setSelectedRoles([]);
  };

  // Function to handle role selection
  const handleSelectRole = (role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((selectedRole) => selectedRole !== role)
        : [...prevRoles, role]
    );
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="period">Period:</label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            required
          >
            <option value="fixed">Fixed</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        {period === "fixed" && (
          <div>
            <label htmlFor="deadlineDate">Deadline Date:</label>
            <input
              type="date"
              id="deadlineDate"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="techStack">Technology Stack:</label>
          <textarea
            id="techStack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="not_started">Not Started</option>
            <option value="starting">Starting</option>
          </select>
        </div>
        <div>
          <RoleSelectionPage selectedRoles={selectedRoles} onSelectRole={handleSelectRole} />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;
