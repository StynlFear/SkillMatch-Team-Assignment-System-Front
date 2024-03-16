import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("organizationName");

    // Redirect to login page
    navigate("/login");
  }, );

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default LogoutPage;
