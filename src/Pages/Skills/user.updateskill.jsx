import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/skill.createskill.css";
import { useNavigate } from 'react-router-dom';
import RoleFetcher from "../../utils/user.rolefetcher";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
function SkillUpdateForm() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  // State variables to store skill information
  const [skill, setSkill] = useState({
    skillName: '',
    skillAuthor: '',
    skillCategory: '',
  });

  // Skill categories
  const skillCategories = ['Programming Language', 'Libraries', 'Frameworks', 'Software Engineering'];

  useEffect(() => {
    // Function to fetch skill data from the API
    const fetchSkillData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/skill/${skillId}`);
        const skillData = response.data; // Assuming response.data contains skill information
        // Update state with skill information
        setSkill({
          ...skill,
          skillCategory: skillData.skillCategory,
          skillName: skillData.skillName,
          skillAuthor: skillData.skillAuthor,
        });
      } catch (error) {
        console.error('Error fetching skill data:', error);
      }
    };

    fetchSkillData();
  }, [skillId]); // Fetch data when skillId changes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the skillName is empty
    if (skill.skillName.trim() === '') {
      console.log('Skill name cannot be blank.');
      return; // Prevent form submission if skill name is empty
    }
    try {
      const response = await axios.put(`https://starfish-app-wpdsi.ondigitalocean.app/v1/skill/${skillId}`, skill);
      console.log('Response:', response); // Add this line
      navigate('/dashboard'); // Redirect to skills dashboard
      // Handle response accordingly
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  // Function to handle input changes for other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the name is skillName
    if (name === 'skillName') {
      // Allow deletion only if value is not empty
      if (value.trim() === '') {
        // If the value is empty, set skillName to an empty string
        setSkill({
          ...skill,
          [name]: '',
        });
      } else {
        // If the value is not empty, update the state
        setSkill({
          ...skill,
          [name]: value,
        });
      }
    } else {
      // For other fields, update the state
      setSkill({
        ...skill,
        [name]: value,
      });
    }
  };
  

  return (
    <div>
      <RoleFetcher types={["admin","departmentManager"]} />
      <form onSubmit={handleSubmit} className='skill-form-container'>
        <div>
          <label htmlFor="skillCategory">Skill Category:</label>
          <select
            id="skillCategory"
            name="skillCategory"
            value={skill.skillCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {skillCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="skillName">Skill Name:</label>
          <input
            type="text"
            id="skillName"
            name="skillName"
            value={skill.skillName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="skillAuthor">Skill Author:</label>
          <input
            type="text"
            id="skillAuthor"
            name="skillAuthor"
            value={skill.skillAuthor}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Skill</button>
      </form>
    </div>
  );
}

export default SkillUpdateForm;
