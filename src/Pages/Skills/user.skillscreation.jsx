import React, { useState } from 'react';
import axios from 'axios';
import "../../css/skill.createskill.css";

const SkillForm = () => {
  const initialSkillState = {
    category: '',
    name: '',
    description: '',
    author: '',
    departments: [],
  };

  const [newSkill, setNewSkill] = useState(initialSkillState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({
      ...newSkill,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/skills', newSkill);
      console.log('Skill created:', response.data);
      setNewSkill(initialSkillState);
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  const skillCategories = ['Programming Language', 'Libraries', 'Frameworks', 'Software Engineering'];

  return (
    <div>
      <h2>Create a New Skill</h2>
      <form onSubmit={handleSubmit} className='skill-form-container'>
        <div>
          <label htmlFor="category">Skill Category:</label>
          <select
            id="category"
            name="category"
            value={newSkill.category}
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
            name="name"
            value={newSkill.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newSkill.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={newSkill.author}
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
