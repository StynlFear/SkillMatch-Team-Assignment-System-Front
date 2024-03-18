import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/project.assignment.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const CreateProjectAssignment = () => {
  const organizationId = localStorage.getItem("organizationId");
  const organizationName = localStorage.getItem("organizationName");
  const { projectId } = useParams();
  const token = localStorage.getItem("refreshToken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectId: projectId,
    userId: "",
    workHours: "",
    roles: "",
    comments: "",
  });
  const [customRoles, setCustomRoles] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch custom roles
    const fetchCustomRoles = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/roles/o/${organizationId}`
        );
        setCustomRoles(response.data.data);
      } catch (error) {
        console.error("Error fetching custom roles:", error);
      }
    };

    // Fetch custom roles when the component mounts
    fetchCustomRoles();
  }, [organizationId]);

  useEffect(() => {
    // Fetch users data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/organization/${organizationName}`
        );
        setUsersData(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsersData([]);
      }
    };

    fetchData();
  }, [organizationId]);

  useEffect(() => {
    // Filter users based on search term
    if (usersData) {
      const filtered = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, usersData]);

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.userId;
    setFormData((prevState) => ({
      ...prevState,
      userId: userId,
    }));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Extract customRoleId from formData
      const customRoleId = formData.roles;
      
      // Create an array of custom role IDs
      const roleIds = customRoleId ? [customRoleId] : [];
      
      // Make the post request with the correct roles format
      const response = await axios.post(
        `${apiUrl}/v1/project/p/propose-project-assignment`,
        {
          ...formData,
          projectId: projectId,
          roles: roleIds // Submit roles as an array of strings
        }
      );
      console.log("Assignment proposed successfully:", response.data);
      navigate("/dashboard");
      // Handle success or navigation after successful assignment
    } catch (error) {
      console.error("Error proposing project assignment:", error);
      // Handle error
    }
  };

  return (
    <div className="create-project-assignment-container">
      {/* Search input for filtering users */}
      <input
        type="text"
        placeholder="Search users by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <div>
          {/* Dropdown to select users */}
          <label htmlFor="users">Select User:</label>
          <select
            name="userId"
            onChange={handleChange}
            value={formData.userId}
            required
          >
            <option value="">Select a user</option>
            {filteredUsers.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="workHours">Work Hours:</label>
          <input
            type="number"
            id="workHours"
            name="workHours"
            value={formData.workHours}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Custom Roles:</label>
          <select
            name="roles"
            onChange={handleChange}
            value={formData.roles}
            required
          >
            <option value="">Select a custom role</option>
            {customRoles.map((role) => (
              <option key={role.customRoleId} value={role.customRoleId}>
                {role.customRoleName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProjectAssignment;
