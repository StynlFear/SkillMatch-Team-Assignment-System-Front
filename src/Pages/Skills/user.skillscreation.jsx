import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/skill.createskill.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const SkillForm = () => {
  const { departmentId } = useParams(); // Extract departmentId from URL params
  const organizationId = localStorage.getItem('organizationId');
  const initialSkillState = {
    departmentId: departmentId,
    skillName: '',
    skillAuthor: '',
    skillCategory: '',
  };

  const [newSkill, setNewSkill] = useState(initialSkillState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({
      ...newSkill,
      [name]: value,
      organizationId: organizationId, // Add organizationId to newSkill state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/v1/skill/create`, newSkill);
      console.log('Skill created:', response.data);
      setNewSkill(initialSkillState);
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  const skillCategories = ['Programming Language', 'Libraries', 'Frameworks', 'Software Engineering'];

  return (
    <div>
      <form onSubmit={handleSubmit} className='skill-form-container'>
        <div>
          <label htmlFor="category">Skill Category:</label>
          <select
            id="category"
            name="skillCategory"
            value={newSkill.skillCategory}
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
          <label htmlFor="name">Skill Name:</label>
          <input
            type="text"
            id="name"
            name="skillName"
            value={newSkill.skillName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="skillAuthor"
            value={newSkill.skillAuthor}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Skill</button>
      </form>
    </div>
  );
};

export default SkillForm;
