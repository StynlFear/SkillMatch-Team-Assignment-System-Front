import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/team.proposal.css";
import Sidebar from "../../Components/SideBar/app.sidebard";
import RoleFetcher from "../../utils/user.rolefetcher";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const apiUserUrl = import.meta.env.VITE_APP_USER_IP; // Assuming you have an API endpoint for user data

const ProposalManagement = () => {
  const [proposals, setProposals] = useState([]);
  const [project, setProject] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDataFetched, setUserDataFetched] = useState(false); // Track whether user data has been fetched
  const [selectedTeam, setSelectedTeam] = useState(null); // Track selected team
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/project/${projectId}`);
        const projectData = response.data.data;
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/project/p/${projectId}`);
        setProposals(response.data.proposals || []); // Ensure proposals is initialized as an array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching proposals:", error);
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, [projectId]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/team/v/${projectId}`);
        setTeams(response.data.data || []);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [projectId]);

  useEffect(() => {
    // Fetch user data only if it hasn't been fetched yet
    if (!userDataFetched && proposals.length > 0) {
      const fetchUserData = async (userId, roleIds) => {
        try {
          // Fetch user data
          const userResponse = await axios.get(
            `${apiUserUrl}/api/v1/user/${userId}`
          );
          const userData = userResponse.data.data;

          // Fetch custom role names for each role ID
          const roleNames = await Promise.all(
            roleIds.map(async (roleId) => {
              const roleResponse = await axios.get(
                `${apiUrl}/v1/roles/${roleId}`
              );
              return roleResponse.data.data.customRoleName;
            })
          );

          // Return user name and role names
          return {
            userName: userData.name,
            roleNames: roleNames,
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
          return { userName: "", roleNames: [] };
        }
      };

      const updateProposalsWithUserName = async () => {
        const updatedProposals = await Promise.all(
          proposals.map(async (proposal) => {
            const userData = await fetchUserData(
              proposal.memberId,
              proposal.roles
            );
            return {
              ...proposal,
              userName: userData.userName,
              roleNames: userData.roleNames,
            };
          })
        );
        setProposals(updatedProposals);
        setUserDataFetched(true); // Mark user data as fetched
      };

      updateProposalsWithUserName();
    }
  }, [proposals, userDataFetched]);

  const handleAccept = async (proposalId, memberId, teamId) => {
    try {
      // Log proposalId and memberId to debug
      console.log(
        `Accepted proposal with ID ${proposalId} and memberId ${memberId} for team ${teamId}`
      );

      // Send request to add the user to the selected team
      const teamResponse = await axios.post(`${apiUrl}/v1/team/addTeamMem`, {
        teamId: teamId,
        userId: memberId,
      });
      console.log("User assigned to team:", teamResponse.data);

      // Send request to delete the proposal
      const deleteResponse = await axios.delete(
        `${apiUrl}/v1/project/p/${proposalId}`
      );
      console.log("Proposal deleted:", deleteResponse.data);
      window.location.reload();
      // Optionally, you can update the state or perform any other necessary actions after accepting the proposal
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  };

  const handleDecline = async (proposalId) => {
    try {
      // Send request to decline proposal by proposalId
      const response = await axios.delete(
        `${apiUrl}/v1/project/p/${proposalId}`
      );
      console.log("Proposal declined and deleted:", response.data);
      window.location.reload();
      // Optionally, you can update the state or perform any other necessary actions after declining the proposal
    } catch (error) {
      console.error("Error declining proposal:", error);
    }
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  if (isLoading || !project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <RoleFetcher types={["admin","projectManager"]} />
      <Sidebar />
      <div className="proposal-management-container">
        <h2>Proposal Management</h2>
        {proposals.length === 0 ? (
          <div>No proposals available</div>
        ) : (
          <ul>
            {proposals.map((proposal) => (
              <li key={proposal.proposalId}>
                <div>Project Name: {project.projectName}</div>{" "}
                {/* Display project name */}
                <div>User Name: {proposal.userName}</div>{" "}
                {/* Display user name */}
                <div>Work Hours: {proposal.workHours}</div>
                <div>
                  Roles:{" "}
                  {proposal.roleNames ? proposal.roleNames.join(", ") : ""}
                </div>
                <div>Comments: {proposal.comments}</div>
                <div>
                  <label htmlFor={`teamSelect_${proposal.proposalId}`}>
                    Choose Team:
                  </label>
                  <select
                    id={`teamSelect_${proposal.proposalId}`}
                    value={selectedTeam}
                    onChange={handleTeamChange}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => {
                      const selectedTeamRole = proposal.roleNames === team.customTeamRolesId
                      return (
                        <option key={team.teamId} value={team.teamId}>
                          {selectedTeamRole
                            ? selectedTeamRole.customRoleName
                            : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button
                  onClick={() =>
                    handleAccept(
                      proposal.proposalId,
                      proposal.memberId,
                      selectedTeam
                    )
                  }
                >
                  Accept
                </button>
                <button onClick={() => handleDecline(proposal.proposalId)}>
                  Decline
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProposalManagement;
