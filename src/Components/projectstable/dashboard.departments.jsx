import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const departmentsData = [
  {
    departmentId: "e1b54905-8e9b-4fd5-b392-77512115576c",
    departmentName: "Developer"
  },
  // Add more department objects as needed
];

const DepartmentsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const departmentsPerPage = 5;

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
  );
};

export default DepartmentsList;
