import React, { useState } from "react";
import axios from "axios";
import "../../css/project.createproject.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

function CreateDepartmentPage() {
  // State variables to store the form input values
  const [departmentName, setDepartmentName] = useState("");
  const organizationId = localStorage.getItem("organizationId");// State for organization ID
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form input values
    console.log("Department Name:", departmentName);
    console.log("Organization ID:", organizationId);

    // Prepare the data to be sent
    const formData = {
      departmentName,
      organizationId,
    };

    // Send the data using Axios POST request
    axios.post(`${apiUrl}/v1/department/create`, formData)
      .then(response => {
        console.log("Department created successfully:", response.data);
        // Reset the form after successful submission
        setDepartmentName("");
      })
      .catch(error => {
        console.error('Error creating department:', error);
      });
  };

  return (
    <div>
      <h2>Create Department</h2>
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
        <button type="submit">Create Department</button>
      </form>
    </div>
  );
}

export default CreateDepartmentPage;
