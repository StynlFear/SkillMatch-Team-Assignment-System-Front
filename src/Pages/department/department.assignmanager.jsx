import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RoleFetcher from "../../utils/user.rolefetcher";
import "../../css/department.assignmembers.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const AssignManager = () => {
    const organizationName = localStorage.getItem('organizationName');
    const { departmentId } = useParams();
    const [usersData, setUsersData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [assignedManager, setAssignedManager] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/v1/organization/${organizationName}`);
                setUsersData(response.data || []);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsersData([]);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAssign = async (userId) => {
        try {
            await axios.post(`${apiUrl}/v1/department/assign-department-manager`, {
                departmentId,
                userId,
            });
            setSuccessMessage('Manager assigned successfully!');
        } catch (error) {
            console.error('Error assigning manager to department:', error);
        }
    };

    const filteredUsers = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='assign-members-container'>
            <RoleFetcher types={["admin"]} />
            <h1>Assign Manager to Department</h1>
            <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
            <select value={assignedManager} onChange={(event) => setAssignedManager(event.target.value)}>
                <option value="">Select a manager</option>
                {filteredUsers.map((user) => (
                    <option key={user.userId} value={user.userId}>
                        {user.name}
                    </option>
                ))}
            </select>
            {successMessage && <p>{successMessage}</p>}
            <button onClick={() => handleAssign(assignedManager)}>Assign Manager</button>
        </div>
    );
};

export default AssignManager;
