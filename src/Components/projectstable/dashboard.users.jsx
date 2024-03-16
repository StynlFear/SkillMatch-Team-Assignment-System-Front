import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import "../../css/project.allprojects.css"; // Assuming this CSS file contains the styling for both components
import EditPopup from '../popups/pop.edit'; // Import EditPopup component
import DeletePopup from '../popups/pop.delete'; // Import DeletePopup component

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const apiuserUrl = import.meta.env.VITE_APP_USER_IP;

const UsersList = ({ organizationName }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const usersPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/organization/${organizationName}`);
        setUsersData(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsersData([]);
      }
    };

    if (organizationName) {
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
    setCurrentPage(0);
  };

  const handleEdit = (userId) => {
    setShowEditPopup(true);
  };

  const handleDelete = async (userId) => {
    setShowDeletePopup(true);
  };

  return (
    <div className='project-management-container'>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
        className='project-management-search-input' // Reuse the same search input class
      />
      <table className='project-management-table'> {/* Reuse the same table class */}
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
      <ReactPaginate
        className='pagination'
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
      {showEditPopup && (
        <EditPopup
          onClose={() => setShowEditPopup(false)}
          onConfirm={() => {
            setShowEditPopup(false);
            // Add logic to handle edit confirmation
          }}
        />
      )}
      {showDeletePopup && (
        <DeletePopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={() => {
            setShowDeletePopup(false);
            // Add logic to handle delete confirmation
          }}
        />
      )}
    </div>
  );
};

export default UsersList;
