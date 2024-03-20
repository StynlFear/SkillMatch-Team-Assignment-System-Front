import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/team.createteam.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
import RoleFetcher from "../../utils/user.rolefetcher";
const CreateTeamForm = () => {
  const { projectId } = useParams(); // Destructure projectId from useParams()
  const [formData, setFormData] = useState({
    assignmentStatus: true,
    workHours: 40,
    teamComments: '',
    customRoleId: ''
  });
  const [customRoles, setCustomRoles] = useState([]);
  const organizationId = localStorage.getItem('organizationId');

  useEffect(() => {
    const fetchCustomRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/roles/o/${organizationId}`);
        setCustomRoles(response.data.data); // Access the data array from the response
      } catch (error) {
        console.error('Error fetching custom roles:', error);
      }
    };

    if (organizationId) {
      fetchCustomRoles();
    }
  }, [organizationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/v1/team/c`, {
        ...formData,
        projectId: projectId, // Make sure projectId is included
        customRoleId: formData.customRoleId // Include customRoleId from form data
      });
      console.log('Team created successfully:', response.data);
      // Handle success or navigation after successful team creation
    } catch (error) {
      console.error('Error creating team:', error);
      // Handle error
    }
  };

  return (
    <div className='create-team-form-container'>
      <RoleFetcher types={["admin","projectManager"]} />
      <h2>Create Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customRoleId">Custom Role:</label>
          <select id="customRoleId" name="customRoleId" value={formData.customRoleId} onChange={handleChange} required>
            <option value="">Select Custom Role</option>
            {customRoles.map(role => (
              <option key={role.customRoleId} value={role.customRoleId}>{role.customRoleName}</option> // Use the customRoleId as the key
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="workHours">Work Hours:</label>
          <input type="number" id="workHours" name="workHours" value={formData.workHours} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="teamComments">Team Comments:</label>
          <textarea id="teamComments" name="teamComments" value={formData.teamComments} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default CreateTeamForm;
