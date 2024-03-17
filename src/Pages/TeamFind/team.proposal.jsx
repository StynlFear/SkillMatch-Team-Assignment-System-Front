import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/team.proposal.css";
import Sidebar from '../../Components/SideBar/app.sidebard';
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const ProposalManagement = () => {
    const [proposals, setProposals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { projectId } = useParams();
  
    useEffect(() => {
      const fetchProposals = async () => {
        try {
          const response = await axios.get(`${apiUrl}/v1/project/view/${projectId}`);
          setProposals(response.data.proposals);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching proposals:', error);
          setIsLoading(false);
        }
      };
  
      fetchProposals();
    }, [projectId]);
  
    const handleAccept = async (proposalId, memberId) => {
      try {
        // Log proposalId and memberId to debug
        console.log(`Accepted proposal with ID ${proposalId} and memberId ${memberId}`);
  
        const teamId = "259b9849-3446-4817-8aec-11373bd0f663"; // Replace with your dynamic teamId
        // Send request to add the user to the team
        const teamResponse = await axios.post(`${apiUrl}/v1/team/addTeamMem`, {
          teamId: teamId,
          userId: memberId
        });
        console.log('User assigned to team:', teamResponse.data);
  
        // Send request to delete the proposal
        const deleteResponse = await axios.delete(`${apiUrl}/v1/proposal/${proposalId}`);
        console.log('Proposal deleted:', deleteResponse.data);
  
        // Optionally, you can update the state or perform any other necessary actions after accepting the proposal
      } catch (error) {
        console.error('Error accepting proposal:', error);
      }
    };
  

    const handleDecline = async (proposalId) => {
      try {
        // Send request to decline proposal by proposalId
        const response = await axios.delete(`${apiUrl}/v1/proposal/${proposalId}`);
        console.log('Proposal declined and deleted:', response.data);
  
        // Optionally, you can update the state or perform any other necessary actions after declining the proposal
      } catch (error) {
        console.error('Error declining proposal:', error);
      }
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
        <div>
            <Sidebar/>
      <div className='proposal-management-container'>
        <h2>Proposal Management</h2>
        <ul>
          {proposals.map(proposal => (
            <li key={proposal._id}>
              <div>Project ID: {proposal.projectId}</div>
              <div>User ID: {proposal.memberId}</div>
              <div>Work Hours: {proposal.workHours}</div>
              <div>Roles: {proposal.roles.join(', ')}</div>
              <div>Comments: {proposal.comments}</div>
              <button onClick={() => handleAccept(proposal._id, proposal.memberId)}>Accept</button>
              <button onClick={() => handleDecline(proposal._id)}>Decline</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
};

export default ProposalManagement;
