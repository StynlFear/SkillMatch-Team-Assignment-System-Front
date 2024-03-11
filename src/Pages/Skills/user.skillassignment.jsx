import React, { useState } from 'react';
import "../../css/skill.assignment.css"
function SkillAssignment() {
    // Mock data for skills
    const skillsData = [
        { id: 1, name: 'Skill 1' },
        { id: 2, name: 'Skill 2' },
        { id: 3, name: 'Skill 3' }
    ];

    // Mock data for user skills
    const [userSkills, setUserSkills] = useState([]);

    // State variables for form fields
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');
    // State variable for error handling
    const [error, setError] = useState('');

    // Function to handle skill assignment
    const handleAssignSkill = (e) => {
        e.preventDefault();
        // Add the selected skill to userSkills
        const newUserSkill = {
            id: userSkills.length + 1,
            skillName: selectedSkill,
            level: selectedLevel,
            experience: selectedExperience
        };
        setUserSkills([...userSkills, newUserSkill]);
        // Reset form fields
        setSelectedSkill('');
        setSelectedLevel('');
        setSelectedExperience('');
    };

    return (
        <div>
            <h2>Assign Skills</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleAssignSkill}  className='skill-assignment-container'>
                <div>
                    <label htmlFor="skill">Skill:</label>
                    <select
                        id="skill"
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        required
                    >
                        <option value="">Select Skill</option>
                        {skillsData.map(skill => (
                            <option key={skill.id} value={skill.name}>{skill.name}</option>
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

            <h2>My Skills</h2>
            <div className='skill-card-container skill-card'>
            <ul>
                {userSkills.map(userSkill => (
                    <li key={userSkill.id}>
                        {userSkill.skillName} - Level: {userSkill.level}, Experience: {userSkill.experience}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default SkillAssignment;
