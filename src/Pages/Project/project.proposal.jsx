// CreateProjectAssignment.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
import "../../css/project.assignment.css";
const CreateProjectAssignment = ({ user, projectId }) => {
  const token = localStorage.getItem('refreshToken');
  const [formData, setFormData] = useState({
    projectId: projectId,
    userId: user ? user.userId : '',
    workHours: '',
    roles: [],
    comments: ''
  });

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.user?.userId || '';
    setFormData({
      ...formData,
      userId: userId
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roles') {
      const isChecked = e.target.checked;
      const roleName = e.target.value;
      setFormData(prevState => ({
        ...prevState,
        roles: isChecked ? [...prevState.roles, roleName] : prevState.roles.filter(role => role !== roleName)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/v1/project/propose-project-assignment`, formData);
      console.log('Assignment proposed successfully:', response.data);
      // Handle success or navigation after successful assignment
    } catch (error) {
      console.error('Error proposing project assignment:', error);
      // Handle error
    }
  };

  return (
    <div className='create-project-assignment-container'>
      <form onSubmit={handleSubmit}>
        {/* Remove projectId input field */}
        <div>
          <label htmlFor="workHours">Work Hours:</label>
          <input type="number" id="workHours" name="workHours" value={formData.workHours} onChange={handleChange} required />
        </div>
        <div>
          <label>Roles:</label>
          <div>
            <input type="checkbox" id="role1" name="roles" value="role1" onChange={handleChange} checked={formData.roles.includes('role1')} />
            <label htmlFor="role1">Role 1</label>
          </div>
          <div>
            <input type="checkbox" id="role2" name="roles" value="role2" onChange={handleChange} checked={formData.roles.includes('role2')} />
            <label htmlFor="role2">Role 2</label>
          </div>
          {/* Add more roles as needed */}
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProjectAssignment;
