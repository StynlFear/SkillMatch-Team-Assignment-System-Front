import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/department.viewusers.css';
import Sidebar from '../../Components/SideBar/app.sidebard';
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const apiUserUrl = import.meta.env.VITE_APP_USER_IP;
const DepartmentViewUsers = () => {
    const { departmentId } = useParams();
    const [department, setDepartment] = useState(null);
    const [users, setUsers] = useState([]);
    const [managerName, setManagerName] = useState('');

    useEffect(() => {
        const fetchDepartmentData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/v1/department/${departmentId}`);
                const departmentData = response.data.data;
                if (!departmentData || !departmentData.memberIds) {
                    throw new Error('Invalid department data');
                }
                const memberIds = departmentData.memberIds.reduce((acc, curr) => acc.concat(curr), []);
                const usersData = await Promise.all(memberIds.map(userId => fetchUserData(userId)));
                setDepartment(departmentData);
                setUsers(usersData);
                // Fetch manager's name
                const managerData = await fetchUserData(departmentData.managerId);
                setManagerName(managerData);
            } catch (error) {
                console.error('Error fetching department data:', error);
                setDepartment(null);
                setUsers([]);
                setManagerName('');
            }
        };

        fetchDepartmentData();
    }, [departmentId]);

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`${apiUserUrl}/api/v1/user/${userId}`);
            return response.data.data.name;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return '';
        }
    };

    if (!department || users.length === 0 || !managerName) {
        return <div>Loading...</div>; // Return loading message if data is not yet available
    }

    return (
        <div>
            <Sidebar/>
        <div className='department-view-users'>
            <h1>Users in Department {department.departmentName}</h1>
            <h1>Manager: {managerName}</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default DepartmentViewUsers;
