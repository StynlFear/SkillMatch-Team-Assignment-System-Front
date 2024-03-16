import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const AvailableWorkersPage = () => {
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
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
    // Your addWorkerToTeam function implementation
  };

  // Filter available workers based on search query
  const filteredWorkers = availableWorkers.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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
    </div>
  );
};

export default AvailableWorkersPage;
