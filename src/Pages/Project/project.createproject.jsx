import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import RoleSelectionPage from "../../Components/Role selector/fetchroles";
import "../../css/project.createproject.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
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
  const [organizationId, setOrganizationId] = useState(""); // State for organization ID

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
  
    // Format the dates
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-GB');
    const formattedDeadlineDate = new Date(deadlineDate).toLocaleDateString('en-GB');
  
    // Prepare the data to be sent
    const formData = {
      projectName: title,
      projectDescription: description,
      projectPeriod: period,
      projectStartDate: formattedStartDate,
      projectDeadline: formattedDeadlineDate,
      projectStatus: status,
      technologyStack: techStack.split('\n').map(item => item.trim()).filter(item => item !== ''), // Split the techStack string by newline and trim each item
      organizationId: localStorage.getItem("organizationId"), // Get organizationId from localStorage
    };
  
    // Send the data using Axios POST request
    axios.post('${apiURl}/v1/project/', formData)
      .then(response => {
        console.log("Project created successfully:", response.data);
        // Reset the form after successful submission
        setTitle("");
        setDescription("");
        setPeriod("fixed");
        setStartDate("");
        setDeadlineDate("");
        setStatus("not_started");
        setTechStack("");
        setSelectedRoles([]);
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });
  };

  // Function to handle role selection
  const handleSelectRole = (role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((selectedRole) => selectedRole !== role)
        : [...prevRoles, role]
    );
  };

  // Function to get organization ID from local storage
  useEffect(() => {
    const organizationId = localStorage.getItem("organizationId");
    setOrganizationId(organizationId);
  }, []);

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