// AvailableWorkersPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProjectAssignment from '../Project/project.proposal';
import "../../css/project.available.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const AvailableWorkersPage = () => {
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user
  const [searchQuery, setSearchQuery] = useState('');
  const orgName = localStorage.getItem("organizationName");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (orgName) {
          const response = await axios.get(`${apiUrl}/v1/organization/${orgName}`);
          setAvailableWorkers(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setAvailableWorkers([]); // Set availableWorkers to an empty array in case of error
      }
    };

    fetchData(); // Call fetchData directly within useEffect

    const fetchProjects = async () => {
      try {
        const organizationId = localStorage.getItem("organizationId");
        const response = await axios.get(`${apiUrl}/v1/organization/p/${organizationId}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [orgName]); // Run useEffect whenever orgName changes

  const addWorkerToTeam = (worker) => {
    setSelectedUser(worker); // Set the selected user when Add to Team button is clicked
  };

  // Filter available workers based on search query
  const filteredWorkers = availableWorkers.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='available-workers-page-container'>
      <h2>Available Workers</h2>
      {/* Dropdown to select project */}
      <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
        <option value="">Select Project</option>
        {projects.map(project => (
          <option key={project.projectId} value={project.projectId}>{project.projectName}</option>
        ))}
      </select>
      {/* Search input field */}
      <input 
        type="text" 
        placeholder="Search workers..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      {/* Display available workers */}
      <ul>
        {filteredWorkers.map(worker => (
          <li key={worker.userId}>
            {worker.name} - {worker.email}
            <button onClick={() => addWorkerToTeam(worker)}>Add to Team</button>
          </li>
        ))}
      </ul>
      {/* Pass selected user and project to CreateProjectAssignment component */}
      {selectedUser && selectedProject && (
        <CreateProjectAssignment user={selectedUser} projectId={selectedProject} />
      )}
    </div>
  );
};

export default AvailableWorkersPage;
