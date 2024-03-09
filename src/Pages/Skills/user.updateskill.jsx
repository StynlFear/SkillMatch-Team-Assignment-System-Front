import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/skill.createskill.css";

function SkillUpdateForm() {
  const { skillId } = useParams();

  // State variables to store skill information
  const [skill, setSkill] = useState({
    category: '',
    name: '',
    description: '',
    author: '',
    departments: [],
  });

  // State variable to store skill categories
  const [skillCategories, setSkillCategories] = useState(['Programming Language', 'Libraries', 'Frameworks', 'Software Engineering']);

  // State variable to store new skill category
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Function to fetch skill data from the API
    const fetchSkillData = async () => {
      try {
        const response = await axios.get(`YOUR_API_ENDPOINT/${skillId}`);
        const skillData = response.data; // Assuming response.data contains skill information
        // Update state with skill information
        setSkill({
          category: skillData.category,
          name: skillData.name,
          description: skillData.description,
          author: skillData.author,
          departments: skillData.departments,
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
    try {
      const response = await axios.put(`YOUR_API_ENDPOINT/${skillId}`, skill);
      // Handle response accordingly
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  // Function to handle input changes for skill category
  const handleCategoryChange = (e) => {
    setSkill({
      ...skill,
      category: e.target.value,
    });
  };

  // Function to handle input changes for other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkill({
      ...skill,
      [name]: value,
    });
  };

  // Function to handle adding a new skill category
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setSkillCategories([...skillCategories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='skill-form-container'>
        <div>
          <label htmlFor="category">Skill Category:</label>
          <select
            id="category"
            name="category"
            value={skill.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {skillCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="newCategory">Add New Category:</label>
          <input
            type="text"
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="new-category-input"
          />
          <button type="button" onClick={handleAddCategory} className="add-button">Add</button>
        </div>
        <div>
          <label htmlFor="name">Skill Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={skill.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={skill.description}
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
            value={skill.author}
            onChange={handleChange}
            required
          />
        </div>
        {/* Input field for adding new skill category */}
        <button type="submit">Update Skill</button>
      </form>
    </div>
  );
}

export default SkillUpdateForm;
