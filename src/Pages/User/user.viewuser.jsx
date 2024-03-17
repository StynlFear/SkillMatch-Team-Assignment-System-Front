import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const apiUserUrl = import.meta.env.VITE_APP_USER_IP;
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
{/*function ViewUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUserUrl}/api/v1/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const fetchProjectName = async (projectId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/v1/organization/p/${organizationId}`
      );
      const projectData = response.data.data;

      // Check if the user is part of a team for this project
      const isUserInTeam = teams.some(
        (team) =>
          team.projectId === projectId && team.memberIds.includes(userId)
      );

      // If the user is part of a team for this project, return the project name; otherwise, return null
      return isUserInTeam ? projectData.projectName : null;
    } catch (error) {
      console.error("Error fetching project data:", error);
      return ""; // Return empty string if there's an error
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/team/v/${projectId}`);
        const teamsData = response.data.data;

        const userIds = teamsData.reduce((acc, team) => {
          return acc.concat(team.memberIds.flat());
        }, []);

        const userNamesPromises = userIds.map(fetchUserData);
        const userNames = await Promise.all(userNamesPromises);

        const updatedTeams = await Promise.all(
          teamsData.map(async (team, index) => {
            return {
              ...team,
              userName: userNames[index],
              projectName: await fetchProjectName(team.projectId),
              customRoleName: await fetchCustomRoleName(team.customTeamRolesId),
            };
          })
        );

        // Filter out the teams where the user is not a member
        const filteredTeams = updatedTeams.filter(
          (team) => team.projectName !== null
        );

        setTeams(filteredTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [projectId]);
  const handleEditUser = () => {
    navigate(`/updateuser/${userId}`);
  };

  const handleUpdateAccountType = () => {
    navigate(`edittype/${userId}`);
  };

  const handleAssignSkills = () => {
    navigate(`skillassignment/${userId}`);
  };

  const handleAssignDepartment = () => {
    // Implement functionality to assign department
  };

  return (
    <div>
      <h2>User Information</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Account Type: {user.accountType}</p>
          <p>Assigned Skills: {user.assignedSkills.join(", ")}</p>
          <p>Projects:</p>
          <ul>
            {user.projects.map((projectId) => {
              const projectName = fetchProjectName(projectId);
              if (projectName !== null) {
                return <li key={projectId}>{projectName}</li>;
              }
              return null;
            })}
          </ul>
          <p>Departments: {user.departments.join(", ")}</p>
          <button onClick={handleEditUser}>Edit User</button>
          <button onClick={handleUpdateAccountType}>Update Account Type</button>
          <button onClick={handleAssignSkills}>Assign Skills</button>
          <button onClick={handleAssignDepartment}>Assign Department</button>
        </div>
      )}
    </div>
  );
}

export default ViewUser;
*/}
