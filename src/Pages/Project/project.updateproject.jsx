import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoleSelectionPage from "../../Components/Role selector/fetchroles";
import "../../css/project.createproject.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

function UpdateProjectPage() {
  const { projectId } = useParams();
  // State variables to store the form input values
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("fixed");
  const [startDate, setStartDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [status, setStatus] = useState("not_started");
  const [techStack, setTechStack] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    // Fetch project data using projectId
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/project/${projectId}`);
        const projectData = response.data.data;
        setTitle(projectData.projectName);
        setDescription(projectData.projectDescription);
        setPeriod(projectData.projectPeriod.toLowerCase());
        // Format the start date
        setStartDate(formatDate(projectData.projectStartDate));
        // Format the deadline date if present
        if (projectData.projectDeadline) {
          setDeadlineDate(formatDate(projectData.projectDeadline));
        }
        setStatus(projectData.projectStatus.toLowerCase());
        setTechStack(projectData.technologyStack.join('\n'));
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
  
    fetchProject();
  }, [projectId]);

  // Function to format date from "YYYY-MM-DD" to "MM/DD/YYYY"
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to be sent
    const projectData = {
      projectName: title,
      projectDescription: description,
      projectPeriod: period,
      projectStartDate: startDate,
      projectDeadline: deadlineDate,
      projectStatus: status,
      technologyStack: techStack.split('\n').map(item => item.trim()).filter(item => item !== ''),
      organizationId: localStorage.getItem("organizationId"),
    };

    // Send the updated project data using Axios PUT request
    axios.put(`${apiUrl}/v1/project/${projectId}`, projectData)
      .then(response => {
        console.log("Project updated successfully:", response.data);
        navigate("/dashboard")
        // Optionally handle the response or perform any necessary actions
      })
      .catch(error => {
        console.error('Error updating project:', error);
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

  return (
    <div>
      <h2>Update Project</h2>
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
            <option value="in_progress">In Progress</option>
            <option value="closing">Closing</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <RoleSelectionPage selectedRoles={selectedRoles} onSelectRole={handleSelectRole} />
        </div>
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}

export default UpdateProjectPage;
