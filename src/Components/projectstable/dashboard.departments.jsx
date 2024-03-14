import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const DepartmentsList = ({ organizationId }) => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const departmentsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/v1/organization/o/${organizationId}`);
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
              </tr>
            </thead>
            <tbody>
              {currentDepartments.map(department => (
                <tr key={department.departmentId}>
                  <td>{department.departmentName}</td>
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
