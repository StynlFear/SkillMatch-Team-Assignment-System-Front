import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/project.createproject.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

function EditDepartmentPage() {
    // State variables to store the form input values
    const [departmentName, setDepartmentName] = useState("");
    const {departmentId}= useParams();
    const organizationId = localStorage.getItem("organizationId");
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Prepare the data to be sent
      const formData = {
        departmentName,
        organizationId
      };
      console.log("Department Name:", departmentName);
      console.log("Organization ID:", organizationId);
      // Send the data using Axios PUT request for updating the department
      axios.put(`${apiUrl}/v1/department/${departmentId}`, formData)
        .then(response => {
          console.log("Department updated successfully:", response.data);
        })
        .catch(error => {
          console.error('Error updating department:', error);
        });
    };
  
    return (
      <div>
        <h2>Edit Department</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label htmlFor="departmentName">Department Name:</label>
            <input
              type="text"
              id="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Department</button>
        </form>
      </div>
    );
  }
  
  export default EditDepartmentPage;
