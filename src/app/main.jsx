import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/authentification/auth.login.jsx';
import Register from '../Pages/authentification/auth.register.jsx';
import WorkerLink from '../Pages/authentification/auth.generatelink.jsx';
import WorkerRegister from '../Pages/authentification/auth.workerregister.jsx';
import UserDashboard from '../Pages/User/user.dashboard.jsx';
import Dashboard from '../Pages/User/user.dashboard2.jsx';
import "../css/auth.login.css"
import "../css/auth.generatelink.css"
import "../css/user.dashboard.css"
import 'boxicons/css/boxicons.min.css';
import ParentComponent from '../Components/SideBar/app.sidebar.parent.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<WorkerLink />} />
        <Route path="/worker/" element={<WorkerRegister />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        {/* Protected routes accessible only to authenticated users */}
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
