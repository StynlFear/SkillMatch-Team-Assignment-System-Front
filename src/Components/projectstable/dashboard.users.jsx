import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const apiuserUrl = import.meta.env.VITE_APP_USER_IP;
const UsersList = ({ organizationName }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersData, setUsersData] = useState([]);
  const usersPerPage = 5;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/organization/${organizationName}`);
        setUsersData(response.data || []); // Set usersData to an empty array in case of error
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsersData([]); // Set usersData to an empty array in case of error
      }
    };

    if (organizationName) { // Fetch data only if organizationId is available
      fetchData();
    }
  }, [organizationName]);

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset pagination to first page when searching
  };

  const handleEdit = (userId) => {
    // Implement edit functionality
    navigate(`/updateuser/q/${userId}`); 
  };

  const handleDelete = async (userId) => {
    try {
      // Make DELETE request to delete the project
      const response = await axios.delete(`${apiuserUrl}/api/v1/user/${userId}`);
  
      // Log success message
      console.log("User deleted successfully:", response.data);
  
      // Refresh the page after deletion
      window.location.reload();
  
      // Optionally, update the state or perform any other actions after deletion
    } catch (error) {
      // Log error message if deletion fails
      console.error("Error deleting User:", error);
    }
  };

  return (
    <div className='pagination'>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Account Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.userId}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.accountType.join(", ")}</td>
              <td>
                <select
                  onChange={(e) => {
                    if (e.target.value === "edit") {
                      handleEdit(user.userId);
                    } else if (e.target.value === "delete") {
                      handleDelete(user.userId);
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
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
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

export default UsersList;
