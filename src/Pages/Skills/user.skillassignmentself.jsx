import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/skill.assignment.css"
import { jwtDecode } from 'jwt-decode';
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

function SkillAssignmentSelf() {
    // State variables for form fields
    const token = localStorage.getItem('refreshToken');
    const organizationId = localStorage.getItem('organizationId');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');
    // State variable for error handling
    const [error, setError] = useState('');
    // State variable to store organization skills
    const [organizationSkills, setOrganizationSkills] = useState([]);
    //Decode token to get user id
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.userId;
  
    // Function to fetch organization skills
    const fetchOrganizationSkills = async () => {
        try {
            const response = await axios.get(`${apiUrl}/v1/organization/s/${organizationId}`);
            setOrganizationSkills(response.data);
        } catch (error) {
            console.error('Error fetching organization skills:', error);
        }
    };

    // Fetch organization skills on component mount
    useEffect(() => {
        fetchOrganizationSkills();
    }, []);

    // Function to handle skill assignment
    const handleAssignSkill = (e) => {
        e.preventDefault();

        // Find the selected skill object from organizationSkills array
        const selectedSkillObj = organizationSkills.find(skill => skill.skillName === selectedSkill);
        if (!selectedSkillObj) {
            return;
        }

        // Prepare the data to be sent
        const formData = {
            userId: userId,
            skillId: selectedSkillObj.skillId, // Use skillId from the selected skill object
            skillLevel: selectedLevel,
            skillExperience: selectedExperience
        };

        // Send the data using Axios POST request
        axios.post(`${apiUrl}/v1/skill/AssignSkill`, formData)
            .then(response => {
                console.log("Skill assigned successfully:", response.data);
                // Reset form fields
                setSelectedSkill('');
                setSelectedLevel('');
                setSelectedExperience('');
            })
            .catch(error => {
                console.error('Error assigning skill:', error);
                setError('Error assigning skill. Please try again.'); // Set error message
            });
    };

    return (
        <div>
            <h2>Assign Skills</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleAssignSkill} className='skill-assignment-container'>
                <div>
                    <label htmlFor="skill">Skill:</label>
                    <select
                        id="skill"
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        required
                    >
                        <option value="">Select Skill</option>
                        {organizationSkills.map(skill => (
                            <option key={skill.skillId} value={skill.skillName}>{skill.skillName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="level">Level:</label>
                    <select
                        id="level"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        required
                    >
                        <option value="">Select Level</option>
                        <option value="1">Learns</option>
                        <option value="2">Knows</option>
                        <option value="3">Does</option>
                        <option value="4">Helps</option>
                        <option value="5">Teaches</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="experience">Experience:</label>
                    <select
                        id="experience"
                        value={selectedExperience}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        required
                    >
                        <option value="">Select Experience</option>
                        <option value="0-6 months">0-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-4 years">2-4 years</option>
                        <option value="4-7 years">4-7 years</option>
                        <option value=">7 years">&gt;7 years</option>
                    </select>
                </div>
                <button type="submit">Assign Skill</button>
            </form>
        </div>
    );
}

export default SkillAssignmentSelf;
