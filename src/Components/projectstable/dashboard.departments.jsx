import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "../../css/project.allprojects.css";
import EditPopup from '../popups/pop.edit'; // Import EditPopup component
import DeletePopup from '../popups/pop.delete'; // Import DeletePopup component

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const DepartmentList = () => {
  const organizationId = localStorage.getItem("organizationId");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentsData, setDepartmentsData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [popupDepartmentId, setPopupDepartmentId] = useState(null); // Track the departmentId for the popup
  const departmentsPerPage = 3;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/v1/organization/o/${organizationId}`);
      console.log("API Response:", response.data);
      setDepartmentsData(response.data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartmentsData([]);
    }
  };

  useEffect(() => {
    console.log("Organization ID:", organizationId);
    if (organizationId) {
      fetchData();
    }
  }, [organizationId]);

  const indexOfLastDepartment = (currentPage + 1) * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;

  const filterDepartments = (department) => {
    const values = Object.values(department);
    for (const value of values) {
      if (
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      if (
        Array.isArray(value) &&
        value.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };

  const filteredDepartments = departmentsData.filter(filterDepartments);
  const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEdit = (departmentId, action) => {
    if (action === 'edit') {
      setPopupDepartmentId(departmentId);
      setShowEditPopup(true);
    } else if (action === 'delete') {
      setPopupDepartmentId(departmentId);
      setShowDeletePopup(true);
    } else if (action === 'createskill') {
      navigate(`/createskill/${departmentId}`);
    } else if (action === 'assignmembers') {
      navigate(`/assigndepartment/${departmentId}`);
    } else if (action === 'viewmembers') {
      navigate(`/viewdepartment/${departmentId}`);
    }
    else if (action === 'assignmanager') {
      navigate(`/assignmanager/${departmentId}`);
    } else if (action === 'skills') {
      navigate(`/skilllist/${departmentId}`);
    }
  };

  const handleStatusChange = async (departmentId, status) => {
    try {
      await axios.put(`${apiUrl}/v1/department/${departmentId}`, {
        departmentStatus: status,
        organizationId: organizationId,
      });
      console.log('Department status updated successfully');
      setCurrentPage(0);
      fetchData();
    } catch (error) {
      console.error('Error updating department status:', error);
    }
  };

  return (
    <div className='project-management-container'>
      <input
        type="text"
        placeholder="Search departments"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='project-management-search-input'
      />
      <table className='project-management-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDepartments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentName}</td>
              <td>
                <select
                  onChange={(e) => {
                    handleEdit(department.departmentId, e.target.value);
                  }}
                >
                  <option value="">Actions</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                  <option value="createskill">Create Skill</option>
                  <option value="assignmembers">Assign Members</option>
                  <option value="assignmanager">Assign Department Manager</option>
                  <option value="viewmembers">View Employees</option>
                  <option value="skills">View Skills</option>
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
        pageCount={Math.ceil(filteredDepartments.length / departmentsPerPage)}
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
            if (popupDepartmentId) {
              navigate(`/editdepartment/${popupDepartmentId}`);
            }
          }}
        />
      )}
      {showDeletePopup && (
        <DeletePopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={async () => {
            setShowDeletePopup(false);
            if (popupDepartmentId) {
              try {
                const response = await axios.delete(`${apiUrl}/v1/department/${popupDepartmentId}`);
                console.log('Department deleted successfully:', response.data);
                const updatedDepartments = departmentsData.filter(department => department.departmentId !== popupDepartmentId);
                setDepartmentsData(updatedDepartments);
              } catch (error) {
                console.error('Error deleting department:', error);
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default DepartmentList;
