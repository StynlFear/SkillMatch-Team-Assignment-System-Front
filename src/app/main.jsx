import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/auth.login.jsx';
import Register from '../Pages/auth.register.jsx';
import WorkerLink from '../Pages/auth.generatelink.jsx';
import WorkerRegister from '../Pages/auth.workerregister.jsx';
import "../css/auth.login.css"
import "../css/auth.generatelink.css"
const App = () => {
  // You can use useAuth here, and it should work as AuthProvider wraps the App component
  return (
    <Router>
      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<WorkerLink />} />
        <Route path="/worker/" element={<WorkerRegister />} />
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
 