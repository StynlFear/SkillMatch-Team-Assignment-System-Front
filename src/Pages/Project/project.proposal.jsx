import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../../css/project.assignment.css";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const CreateProjectAssignment = () => {
    const organizationId = localStorage.getItem('organizationId');
    const { projectId } = useParams(); // Remove 'projectId' from 'useParams' since it's not needed
    const token = localStorage.getItem('refreshToken');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectId: projectId,
        userId: '', // Remove user from formData
        workHours: '',
        roles: [],
        comments: ''
    });
    const [customRoles, setCustomRoles] = useState([]);

    useEffect(() => {
        // Fetch custom roles
        const fetchCustomRoles = async () => {
            try {
                const response = await axios.get(`${apiUrl}/v1/roles/o/${organizationId}`);
                setCustomRoles(response.data.data);
            } catch (error) {
                console.error('Error fetching custom roles:', error);
            }
        };

        // Fetch custom roles when the component mounts
        fetchCustomRoles();
    }, [projectId, organizationId]); // Make sure to include any dependencies needed for the fetch operation

    useEffect(() => {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.userId; 
        setFormData(prevState => ({
            ...prevState,
            userId: userId
        }));
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/v1/project/p/propose-project-assignment`, formData);
            console.log('Assignment proposed successfully:', response.data);
            navigate("/dashboard")
            // Handle success or navigation after successful assignment
        } catch (error) {
            console.error('Error proposing project assignment:', error);
            // Handle error
        }
    };

    return (
        <div className='create-project-assignment-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="workHours">Work Hours:</label>
                    <input type="number" id="workHours" name="workHours" value={formData.workHours} onChange={handleChange} required />
                </div>
                <div>
                    <label>Custom Roles:</label>
                    <select name="customRoles" onChange={handleChange} value={formData.customRoles} required>
                        <option value="">Select a custom role</option>
                        {customRoles.map(role => (
                            <option key={role.id} value={role.id}>{role.customRoleName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="comments">Comments:</label>
                    <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateProjectAssignment;
