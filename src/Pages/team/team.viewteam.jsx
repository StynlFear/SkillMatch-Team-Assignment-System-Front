import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const apiUserUrl = import.meta.env.VITE_APP_USER_IP;
import "../../css/team.viewteam.css";

const TeamView = () => {
    const [teams, setTeams] = useState([]);
    const { projectId } = useParams();

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
        
                const updatedTeams = await Promise.all(teamsData.map(async (team, index) => {
                    return {
                        ...team,
                        userName: userNames[index],
                        projectName: await fetchProjectName(team.projectId),
                        customRoleName: await fetchCustomRoleName(team.customTeamRolesId)
                    };
                }));
        
                setTeams(updatedTeams);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, [projectId]);

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`${apiUserUrl}/api/v1/user/${userId}`);
            const userData = response.data.data;
            return userData.name;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return ''; // Return empty string if there's an error
        }
    };

    const fetchProjectName = async (projectId) => {
        try {
            const response = await axios.get(`${apiUrl}/v1/project/${projectId}`);
            const projectData = response.data.data;
            return projectData.projectName;
        } catch (error) {
            console.error('Error fetching project data:', error);
            return ''; // Return empty string if there's an error
        }
    };

    const fetchCustomRoleName = async (customRoleId) => {
        try {
            const response = await axios.get(`${apiUrl}/v1/roles/${customRoleId}`);
            const customRoleData = response.data.data;
            return customRoleData.customRoleName;
        } catch (error) {
            console.error('Error fetching custom role data:', error);
            return ''; // Return empty string if there's an error
        }
    };

    return (
        <div className='team-view-container'>
            <h1>Teams for Project:</h1>
            <table className='team-view-container'>
                <thead>
                    <tr>
                        <th>Team ID</th>
                        <th>Assignment Status</th>
                        <th>Work Hours</th>
                        <th>Team Comments</th>
                        <th>Project Name</th>
                        <th>Custom Role Name</th>
                        <th>Member Name</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.teamId}>
                            <td>{team.teamId}</td>
                            <td>{team.assignmentStatus ? "Assigned" : "Not Assigned"}</td>
                            <td>{team.workHours}</td>
                            <td>{team.teamComments}</td>
                            <td>{team.projectName}</td>
                            <td>{team.customRoleName}</td>
                            <td>{team.userName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamView;
