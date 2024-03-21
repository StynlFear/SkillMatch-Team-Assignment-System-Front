import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const UserAssignedSkills = () => {
    const [assignedSkills, setAssignedSkills] = useState([]);
    const {userId} = useParams();
    useEffect(() => {
        const fetchAssignedSkills = async () => {
            try {
                const response = await axios.get(`${apiUrl}/v1/skill/u/${userId}`, {
                    data: {
                        userId: userId
                    }
                });
                const { data } = response.data;
                setAssignedSkills(data);
            } catch (error) {
                console.error('Error fetching assigned skills:', error);
            }
        };

        fetchAssignedSkills();
    }, [userId]);

    return (
        <div>
            <h2>Assigned Skills</h2>
            <ul>
                {assignedSkills.map((skill, index) => (
                    <li key={index}>
                        <strong>Skill Level:</strong> {skill.skillLevel},{' '}
                        <strong>Skill Experience:</strong> {skill.skillExperience}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAssignedSkills;
