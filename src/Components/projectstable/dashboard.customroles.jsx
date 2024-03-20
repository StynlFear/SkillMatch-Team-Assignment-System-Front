import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "../../css/dashboard.listroles.css";
import EditPopup from '../popups/pop.edit'; // Import EditPopup component
import DeletePopup from '../popups/pop.delete'; // Import DeletePopup component

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const CustomRoles = () => {
    const organizationId = localStorage.getItem("organizationId");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [rolesData, setRolesData] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [popupRoleId, setPopupRoleId] = useState(null); // Track the roleId for the popup
    const rolesPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/v1/roles/o/${organizationId}`);
                console.log("API Response:", response.data);
                setRolesData(response.data.data || []); // Access the 'data' property of the response
            } catch (error) {
                console.error('Error fetching roles:', error);
                setRolesData([]);
            }
        };

        fetchData();
    }, [organizationId]);

    const indexOfLastRole = (currentPage + 1) * rolesPerPage;
    const indexOfFirstRole = indexOfLastRole - rolesPerPage;

    const filterRoles = (role) => {
        return role.customRoleName.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const filteredRoles = rolesData.filter(filterRoles);
    const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleEdit = (roleId) => {
        setPopupRoleId(roleId); // Set the roleId for later use
        setShowEditPopup(true); // Open the edit popup
    };

    const handleDelete = (roleId) => {
        setPopupRoleId(roleId); // Set the roleId for later use
        setShowDeletePopup(true); // Open the delete popup
    };

    return (
        <div className='role-management-container'>
            <input
                type="text"
                placeholder="Search roles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='role-management-search-input'
            />
            <table className='role-management-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRoles.map((role) => (
                        <tr key={role.customRoleId}>
                            <td>{role.customRoleName}</td>
                            <td>
                                <select
                                    onChange={(e) => {
                                        if (e.target.value === 'edit') {
                                            handleEdit(role.customRoleId);
                                        } else if (e.target.value === 'delete') {
                                            handleDelete(role.customRoleId);
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
                pageCount={Math.ceil(filteredRoles.length / rolesPerPage)}
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
                        if (popupRoleId) {
                        /* navigate(`/updaterole/${popupRoleId}`); // Navigate to the edit page */
                        }
                    }}
                />
            )}
            {showDeletePopup && (
                <DeletePopup
                    onClose={() => setShowDeletePopup(false)}
                    onDelete={async () => {
                        setShowDeletePopup(false);
                        if (popupRoleId) {
                            try {
                                const response = await axios.delete(`${apiUrl}/v1/roles/${popupRoleId}`);
                                console.log('Role deleted successfully:', response.data);
                                const updatedRoles = rolesData.filter(role => role.customRoleId !== popupRoleId);
                                setRolesData(updatedRoles);
                            } catch (error) {
                                console.error('Error deleting role:', error);
                            }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default CustomRoles;
