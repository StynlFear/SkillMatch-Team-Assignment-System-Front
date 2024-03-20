import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import "../../css/customrole.create.css";
import { useParams } from 'react-router-dom';
import RoleFetcher from "../../utils/user.rolefetcher";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const CustomRoleForm = () => {
    const organziationId = localStorage.getItem("organizationId");
  const token = localStorage.getItem('refreshToken');
  const [formData, setFormData] = useState({
    customRoleName: '',
    userId: '',
    customRoleAuthor: '',
    organziationId: ''
  });
  
  // Decoding the token to get the userId
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user.userId;

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
      // Assigning userId to the formData before sending the request
      const dataToSend = { ...formData, userId,organziationId };
      await axios.post(`${apiUrl}/v1/roles/create`, dataToSend);
      // Optionally, you can handle success response here
      console.log('Custom role created successfully');
    } catch (error) {
      console.error('Error creating custom role:', error);
    }
  };

  return (
    <div className="custom-role-form-container">
       <RoleFetcher types={["admin","departmentManager"]} />
      <h2>Create Custom Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customRoleName">Custom Role Name:</label>
          <input
            type="text"
            id="customRoleName"
            name="customRoleName"
            value={formData.customRoleName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customRoleAuthor">Custom Role Author:</label>
          <input
            type="text"
            id="customRoleAuthor"
            name="customRoleAuthor"
            value={formData.customRoleAuthor}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <button type="submit">Create Custom Role</button>
        </div>
      </form>
    </div>
  );
};

export default CustomRoleForm;
