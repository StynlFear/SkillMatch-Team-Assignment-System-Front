import React, { useState, useEffect } from 'react';
import './roleselector.css'; // Import the CSS file for styling

// Mock data for roles
const mockRoles = ['Role 1', 'Role 2', 'Role 3', 'Role 4'];

function RoleSelectionPage({ selectedRoles, onSelectRole }) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      // Simulate fetching roles (replace this with actual API call)
      setRoles(mockRoles);
      setLoading(false);
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    // Initially set the selected roles
    setSelectedRole(selectedRoles);
  }, [selectedRoles]);

  const handleRoleClick = (role) => {
    console.log("Previous Selected Roles:", selectedRole);
    const updatedSelectedRoles = selectedRole.includes(role)
      ? selectedRole.filter(selected => selected !== role)
      : [...selectedRole, role];
    console.log("Updated Selected Roles:", updatedSelectedRoles);

    setSelectedRole(updatedSelectedRoles);
    console.log("Selected Role State:", selectedRole);
    // Pass the updated selected roles to the parent component
    onSelectRole(updatedSelectedRoles);
  };

  if (loading) {
    return <div>Loading roles...</div>;
  }

  return (
    <div className="role-selection-container"> {/* Apply container styling */}
      <h2>Role Selection</h2>
      <ul className="role-list"> {/* Apply list styling */}
        {roles.map((role) => (
          <li
            key={role}
            onClick={() => handleRoleClick(role)}
            className={selectedRole.includes(role) ? 'selected-role' : 'role'}
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoleSelectionPage;
