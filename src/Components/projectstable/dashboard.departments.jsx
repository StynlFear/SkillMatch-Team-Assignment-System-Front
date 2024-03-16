import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import "../../css/project.allprojects.css"; // Assuming this CSS file contains the styling for both components
import EditPopup from '../popups/pop.edit';
import DeletePopup from '../popups/pop.delete';

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const DepartmentsList = ({ organizationId }) => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const departmentsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/organization/o/${organizationId}`);
        setDepartmentsData(response.data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartmentsData([]);
      }
    };

    if (organizationId) {
      fetchData();
    }
  }, [organizationId]);

  const indexOfLastDepartment = (currentPage + 1) * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const filteredDepartments = departmentsData.filter(department =>
    department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handleEdit = (departmentId) => {
    setEditItemId(departmentId);
    setShowEditPopup(true);
  };

  const handleDelete = async (departmentId) => {
    setDeleteItemId(departmentId);
    setShowDeletePopup(true);
  };

  const handleEditConfirm = () => {
    navigate(`/editdepartment/${editItemId}`);
    setShowEditPopup(false);
  };

  const handleDeleteConfirm = async () => {
    // Handle delete confirm logic here
    setShowDeletePopup(false);
  };

  const handlePopupClose = () => {
    setShowEditPopup(false);
    setShowDeletePopup(false);
  };

  return (
    <div className='project-management-container'>
      <input
        type="text"
        placeholder="Search by department name"
        value={searchTerm}
        onChange={handleSearch}
        className='project-management-search-input' // Reuse the same search input class
      />
      {departmentsData.length > 0 ? (
        <table className='project-management-table'> {/* Reuse the same table class */}
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Actions</th> {/* Add Actions column */}
            </tr>
          </thead>
          <tbody>
            {currentDepartments.map(department => (
              <tr key={department.departmentId}>
                <td>{department.departmentName}</td>
                <td>
                  <select onChange={(e) => {
                    if (e.target.value === 'edit') {
                      handleEdit(department.departmentId);
                    } else if (e.target.value === 'delete') {
                      handleDelete(department.departmentId);
                    }
                  }}>
                    <option value="">Actions</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No departments found.</p>
      )}
      <ReactPaginate
        className='pagination'
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredDepartments.length / departmentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      {showEditPopup && (
        <EditPopup
          onClose={handlePopupClose}
          onConfirm={handleEditConfirm}
          onCancel={handlePopupClose}
        />
      )}
      {showDeletePopup && (
        <DeletePopup
          onClose={handlePopupClose}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default DepartmentsList;
