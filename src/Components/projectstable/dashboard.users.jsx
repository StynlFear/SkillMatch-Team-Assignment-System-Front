import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const usersData = [
  {
    userId: "9cdc7e10-40d0-499e-8254-0e6aecf27199",
    name: "Marian",
    email: "admin@marian.me",
    password: "$2b$10$.JBO4vdL8iNEEZZYpQAQFuLygt4YtEdpDN43eWNecKh3gFjgXSwfm",
    accountType: ["admin"]
  },
  {
    userId: "9cdc7e10-40d0-499e-8254-0e6aecf27199",
    name: "Marian3",
    email: "admin@marian.me",
    password: "$2b$10$.JBO4vdL8iNEEZZYpQAQFuLygt4YtEdpDN43eWNecKh3gFjgXSwfm",
    accountType: ["admin"]
  },
  {
    userId: "9cdc7e10-40d0-499e-8254-0e6aecf27199",
    name: "Marian4",
    email: "admin@marian.me",
    password: "$2b$10$.JBO4vdL8iNEEZZYpQAQFuLygt4YtEdpDN43eWNecKh3gFjgXSwfm",
    accountType: ["admin"]
  },
  {
    userId: "9cdc7e10-40d0-499e-8254-0e6aecf27199",
    name: "Marian",
    email: "admin@marian.me",
    password: "$2b$10$.JBO4vdL8iNEEZZYpQAQFuLygt4YtEdpDN43eWNecKh3gFjgXSwfm",
    accountType: ["admin"]
  },
  {
    userId: "9cdc7e10-40d0-499e-8254-0e6aecf27199",
    name: "Marian",
    email: "admin@marian.me",
    password: "$2b$10$.JBO4vdL8iNEEZZYpQAQFuLygt4YtEdpDN43eWNecKh3gFjgXSwfm",
    accountType: ["admin"]
  },
  {
    userId: "9cdc7e10-40d0-499e-8254-0e6aecf27199",
    name: "Marian",
    email: "admin@marian.me",
    password: "$2b$10$.JBO4vdL8iNEEZZYpQAQFuLygt4YtEdpDN43eWNecKh3gFjgXSwfm",
    accountType: ["admin"]
  },
  // Add more user objects as needed
];

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 5;

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
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.userId}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.accountType.join(", ")}</td>
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
