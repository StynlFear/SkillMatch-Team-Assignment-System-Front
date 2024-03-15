import React, { useState } from 'react';
import axios from 'axios';
import EmployeeSearch from './team.assignwtop.jsx';

const AvailableWorkersPage = () => {
  const [availableWorkers, setAvailableWorkers] = useState([]);


  // Function to handle adding available worker to the Team model
  const addWorkerToTeam = (worker) => {
    // Create a new Team instance based on the worker data
    const newTeamMember = new Team({
      teamId: worker.userId, // Assuming userId can be used as teamId
      assignmentStatus: true, // Default assignment status
      workHours: '40', // Default work hours
      teamComments: '', // Default team comments
      customTeamRolesId: '', // Set custom team roles ID
      projectId: '', // Set project ID
      userId: worker.userId, // Set user ID
    });

    // Save the new team member to the database
    newTeamMember.save()
      .then(() => {
        console.log('Worker added to team successfully');
        // Optionally, you can fetch available workers again to update the list
      })
      .catch(error => {
        console.error('Error adding worker to team:', error);
      });
  };

  return (
    <div>
      <h2>Available Workers</h2>
      <EmployeeSearch />
      {/* Display available workers */}
      <ul>
        {availableWorkers.map(worker => (
          <li key={worker.userId}>
            {worker.name} - {worker.email}
            <button onClick={() => addWorkerToTeam(worker)}>Add to Team</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableWorkersPage;
