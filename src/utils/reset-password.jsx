import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode from the correct library
import "../css/password.resetpassword.css";
const apiUrl = import.meta.env.VITE_APP_USER_IP;
const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('refreshToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.userId;

    const handleResetPassword = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await axios.put(`${apiUrl}/api/v1/user/${userId}`, {
                email: email,
                password: password
            });

            // Assuming the server returns a success message upon password reset
            console.log('Password reset successful:', response.data);

            // Additional logic or UI updates for success

        } catch (error) {
            // Handle errors
            console.error('Password reset failed:', error.message);
            setError(error.message); // Set error message state
        }
    };

    return (
        <div class= "reset-password-container">
            {error && <p>{error}</p>} {/* Display error message if there's an error */}
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPassword;
