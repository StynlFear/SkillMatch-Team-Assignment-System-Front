import React, { useState } from 'react';
import '../../css/team.findusers.css';

const EmployeeSearch = () => {
  // State variables for user input
  const [includePartiallyAvailable, setIncludePartiallyAvailable] = useState(false);
  const [weeksToFinish, setWeeksToFinish] = useState(2); // Default value
  const [includeUnavailable, setIncludeUnavailable] = useState(false);
  const [skills, setSkills] = useState('');

  // Function to handle search submission
  const handleSearch = () => {
    // Implement search functionality here based on the state variables
    // You can make API calls or perform client-side filtering based on the criteria
    console.log("Performing search...");
  };

  return (
    <div className="employee-search-container">
      <h2 className="employee-search-title">Employee Search</h2>
      <div className="employee-search-option">
        <label className="employee-search-label">
          <input
            className="employee-search-checkbox"
            type="checkbox"
            checked={includePartiallyAvailable}
            onChange={() => setIncludePartiallyAvailable(!includePartiallyAvailable)}
          />
          Include Partially Available Employees
        </label>
      </div>
      <div className="employee-search-option">
        <label className="employee-search-label">
          Projects Close to Finish (N weeks):{' '}
          <input
            className="employee-search-number-input"
            type="number"
            min="2"
            max="6"
            value={weeksToFinish}
            onChange={(e) => setWeeksToFinish(e.target.value)}
          />
        </label>
      </div>
      <div className="employee-search-option">
        <label className="employee-search-label">
          <input
            className="employee-search-checkbox"
            type="checkbox"
            checked={includeUnavailable}
            onChange={() => setIncludeUnavailable(!includeUnavailable)}
          />
          Include Unavailable Employees
        </label>
      </div>
      <div className="employee-search-option">
        <label className="employee-search-label">
          Skills:
          <input
            className="employee-search-text-input"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </label>
      </div>
      <button className="employee-search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default EmployeeSearch;
