import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "../../css/dashboard.listskills.css";
import EditPopup from '../popups/pop.edit'; // Import EditPopup component
import DeletePopup from '../popups/pop.delete'; // Import DeletePopup component
import RoleChecker from '../../utils/role-checker';

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const SkillList = () => {
  const organizationId = localStorage.getItem("organizationId");
  const {departmentId} = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillsData, setSkillsData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [popupSkillId, setPopupSkillId] = useState(null); // Track the skillId for the popup
  const skillsPerPage = 3;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/v1/skill/all/${departmentId}`);
      console.log("API Response:", response.data);
      setSkillsData(response.data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkillsData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastSkill = (currentPage + 1) * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;

  const filterSkills = (skill) => {
    const values = Object.values(skill);
    for (const value of values) {
      if (
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };

  const filteredSkills = skillsData.filter(filterSkills);
  const currentSkills = filteredSkills.slice(indexOfFirstSkill, indexOfLastSkill);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEdit = (skillId) => {
    setPopupSkillId(skillId); // Set the skillId for later use
    setShowEditPopup(true); // Open the edit popup
  };
  
  const handleDelete = (skillId) => {
    setPopupSkillId(skillId); // Set the skillId for later use
    setShowDeletePopup(true); // Open the delete popup
  };
  
  return (
    <div className='skill-management-container'>
      <input
        type="text"
        placeholder="Search skills"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='skill-management-search-input'
      />
      <table className='skill-management-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        
        <tbody>
          
          {currentSkills.map((skill) => (
            <tr key={skill.skillId}>
              <td>{skill.skillName}</td>
              <td>
                <select
                  onChange={(e) => {
                    if (e.target.value === 'edit') {
                      handleEdit(skill.skillId);
                    } else if (e.target.value === 'delete') {
                      handleDelete(skill.skillId);
                    }
                  }}
                >
                  
                  <option value="">Actions</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className='pagination'
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredSkills.length / skillsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      {showEditPopup && (
        <EditPopup
          onClose={() => setShowEditPopup(false)}
          onConfirm={() => {
            setShowEditPopup(false);
            if (popupSkillId) {
              navigate(`/updateskill/${popupSkillId}`); // Navigate to the edit page
            }
          }}
        />
      )}
      {showDeletePopup && (
        <DeletePopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={async () => {
            setShowDeletePopup(false);
            if (popupSkillId) {
              try {
                const response = await axios.delete(`${apiUrl}/v1/skill/${popupSkillId}`);
                console.log('Skill deleted successfully:', response.data);
                const updatedSkills = skillsData.filter(skill => skill.skillId !== popupSkillId);
                setSkillsData(updatedSkills);
              } catch (error) {
                console.error('Error deleting skill:', error);
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default SkillList;
