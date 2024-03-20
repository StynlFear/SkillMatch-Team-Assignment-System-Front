import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/auth.postlink.css";   

const AuthPostLink = () => {
    const navigate = useNavigate();
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (link.trim() === '') {
            setError('Please insert a valid link.');
        } else {
            navigate(`/worker/${link}`);
        }
    };

    return (
        <div className="auth-post-link-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="linkInput">Insert your link:</label>
                <input
                    type="text"
                    id="linkInput"
                    value={link}
                    onChange={(e) => {
                        setLink(e.target.value);
                        setError(''); // Clear error when input changes
                    }}
                />
                <button type="submit">Submit</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AuthPostLink;
