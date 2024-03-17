import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
      const response = await axios.post(`${apiUrl}/v1/team/addTeamMem`, {
        teamId: teamId,
        userId: memberId
      });
      console.log('User assigned to team:', response.data);
  
      // Optionally, you can update the state or perform any other necessary actions after assigning the user to the team
    } catch (error) {
        console.error('Error accepting proposal:', error);
      }
    };
  

  const handleDecline = async (proposalId) => {
    try {
      // Send request to decline proposal by proposalId
      // Update the state accordingly after successful decline
      console.log(`Declined proposal with ID ${proposalId}`);
    } catch (error) {
      console.error('Error declining proposal:', error);
    }
  };

  const handleDelete = async (proposalId) => {
    try {
      // Send request to delete proposal by proposalId
      // Update the state accordingly after successful deletion
      console.log(`Deleted proposal with ID ${proposalId}`);
    } catch (error) {
      console.error('Error deleting proposal:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
  </li>
))}
      </ul>
    </div>
  );
};

export default ProposalManagement;
