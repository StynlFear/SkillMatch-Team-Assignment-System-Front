import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const DepartmentsList = ({ organizationId }) => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const departmentsPerPage = 5;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/organization/o/${organizationId}`);
        setDepartmentsData(response.data || []); // Set departmentsData to an empty array in case of error
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartmentsData([]); // Set departmentsData to an empty array in case of error
      }
    };

    if (organizationId) { // Fetch data only if organizationId is available
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
    setCurrentPage(0); // Reset pagination to first page when searching
  };

  const handleEdit = (departmentId) => {
    // Implement edit functionality
    navigate(`/editdepartment/${departmentId}`); 
  };

  const handleDelete = async (departmentId) => {
    try {
      // Make DELETE request to delete the project
      const response = await axios.delete(`${apiUrl}/v1/department/${departmentId}`);
  
      // Log success message
      console.log("Project Department successfully:", response.data);
      window.location.reload();
      // Optionally, update the state or perform any other actions after deletion
    } catch (error) {
      // Log error message if deletion fails
      console.error("Error deleting Department:", error);
    }
  };

  return (
    <div className='pagination'>
      <input
        type="text"
        placeholder="Search by department name"
        value={searchTerm}
        onChange={handleSearch}
      />
      {departmentsData.length > 0 ? (
        <div>
          <table>
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
          <div className="pagination-container">
            <ReactPaginate
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
          </div>
        </div>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );
};

export default DepartmentsList;
