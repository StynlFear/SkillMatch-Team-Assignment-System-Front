import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiuserUrl = import.meta.env.VITE_APP_USER_IP;

const useUserAccountTypes = () => {
  const [accountTypes, setAccountTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const decodedToken = jwtDecode(refreshToken);
          const userId = decodedToken.user.userId;
          const response = await axios.get(`${apiuserUrl}/api/v1/user/${userId}`);
          const userData = response.data.data;
          const userAccountTypes = userData.accountType || [];
          setAccountTypes(userAccountTypes);
        } catch (error) {
          console.error('Error fetching user account types:', error);
          setAccountTypes([]);
        }
      } else {
        console.error('No refresh token found');
        setAccountTypes([]);
      }
    };

    fetchData();
  }, []);

  return accountTypes;
};

export { useUserAccountTypes }; // Exporting the hook directly instead of default
