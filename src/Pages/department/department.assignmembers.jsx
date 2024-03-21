import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RoleFetcher from "../../utils/user.rolefetcher";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
import "../../css/department.assignmembers.css";
const AssignMembers = () => {
  const organizationName = localStorage.getItem("organizationName");
  const { departmentId } = useParams();
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
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
  }, [organizationName]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAssign = async (userId) => {
    if (assignedUsers.includes(userId)) {
      setSuccessMessage("");
      console.error("User is already assigned to the department");
      return;
    }

    try {
      await axios.post(`${apiUrl}/v1/department/assign-department-members`, {
        departmentId,
        userId,
      });
      setAssignedUsers([...assignedUsers, userId]);
      setSuccessMessage("User assigned successfully.");
    } catch (error) {
      console.error("Error assigning user to department:", error);
      setSuccessMessage("");
    }
  };

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="assign-members-container">
      <RoleFetcher types={["admin","departmentManager"]} />
      <h1>Assign Members to Department</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select>
        {filteredUsers.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleAssign(document.querySelector("select").value)}
      >
        Assign
      </button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AssignMembers;
