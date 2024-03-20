import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiuserUrl = import.meta.env.VITE_APP_USER_IP;

const RoleFetcher = ({ types }) => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const decodedToken = jwtDecode(refreshToken);
      const userId = decodedToken.user.userId;

      const fetchUserAccountTypes = async () => {
        try {
          const response = await axios.get(
            `${apiuserUrl}/api/v1/user/${userId}`
          );
          const userData = response.data.data;
          const userAccountTypes = userData.accountType || [];
          setAccountTypes(userAccountTypes);
          setSelectOptions((prevOptions) =>
            prevOptions.filter(
              (option) => !userAccountTypes.includes(option.value)
            )
          );

          // Redirect the user to the specified route if accountType doesn't match any type
          const matchedType =
            userAccountTypes.length > 0 &&
            types.some((t) => userAccountTypes.includes(t));

          if (!matchedType) {
            console.log("User does not have the required account type");
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching user account types:", error);
        }
      };

      fetchUserAccountTypes();
    } else {
      
        console.error("No refresh token found");
    }
  }, [types, navigate]);

  return null;
};

export default RoleFetcher;
