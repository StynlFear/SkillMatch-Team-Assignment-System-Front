import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RoleFetcher from "../../utils/user.rolefetcher";
import Sidebar from "../../Components/SideBar/app.sidebard";
const apiuserUrl = import.meta.env.VITE_APP_USER_IP;
import "../../css/user.type.css";
function UpdateUserAccounttype() {
  const { userId } = useParams();
  const organizationId = localStorage.getItem("organizationId");
  const [accountTypes, setAccountTypes] = useState([]);
  const [newAccountType, setNewAccountType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState([
    { value: 'admin', label: 'Admin' },
    { value: 'employee', label: 'Employee' },
    { value: 'projectManager', label: 'Project Manager' },
    { value: 'departmentManager', label: 'Department Manager' }
  ]);

  useEffect(() => {
    const fetchUserAccountTypes = async () => {
      try {
        const response = await axios.get(`${apiuserUrl}/api/v1/user/${userId}`);
        const userData = response.data.data;
        setAccountTypes(userData.accountType || []);
        // Filter out options that the user already has
        setSelectOptions(prevOptions => prevOptions.filter(option => !userData.accountType.includes(option.value)));
      } catch (error) {
        console.error('Error fetching user account types:', error);
      }
    };

    fetchUserAccountTypes();
  }, [userId]);

  const handleAddAccountType = async () => {
    if (newAccountType.trim() === '') return;
    setIsLoading(true);
    try {
      const updatedAccountTypes = [...accountTypes, newAccountType];
      await axios.put(`${apiuserUrl}/api/v1/user/${userId}`, { accountType: updatedAccountTypes });
      setAccountTypes(updatedAccountTypes);
      setNewAccountType('');
      // Remove the added account type from select options
      setSelectOptions(prevOptions => prevOptions.filter(option => option.value !== newAccountType));
    } catch (error) {
      console.error('Error adding account type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccountType = async (accountTypeToDelete) => {
    setIsLoading(true);
    try {
      const updatedAccountTypes = accountTypes.filter(type => type !== accountTypeToDelete);
      await axios.put(`${apiuserUrl}/api/v1/user/${userId}`, { accountType: updatedAccountTypes });
      setAccountTypes(updatedAccountTypes);
    } catch (error) {
      console.error('Error deleting account type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Sidebar/>
    <div className='update-user-account-type-container'>
      
      <RoleFetcher types={["admin"]} />
      <h2>Update User Account Type</h2>
      <div>
        <h3>Current Account Types:</h3>
        <ul>
          {accountTypes.map((type, index) => (
            <li key={index}>{type} 
              <button onClick={() => handleDeleteAccountType(type)} disabled={isLoading}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add Account Type:</h3>
        <select
          value={newAccountType}
          onChange={(e) => setNewAccountType(e.target.value)}
        >
          <option value="">Select role</option>
          {selectOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button onClick={handleAddAccountType} disabled={isLoading}>Add Account Type</button>
      </div>
    </div>
    </div>
  );
}

export default UpdateUserAccounttype;
