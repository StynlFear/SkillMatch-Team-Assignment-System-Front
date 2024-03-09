import React, { useState } from 'react';
import Sidebar from './app.sidebard';
import UserDashboard from '../../Pages/User/user.dashboard';


function ParentComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (isOpen) => {
    setSidebarOpen(isOpen); // Update the state of the sidebar
  };

  return (
    <div className={sidebarOpen ? 'parent-container open' : 'parent-container'}>
      <Sidebar toggleSidebar={toggleSidebar} />
      <UserDashboard />
    </div>
  );
}

export default ParentComponent;
