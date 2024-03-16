import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/authentification/auth.login.jsx";
import Register from "../Pages/authentification/auth.register.jsx";
import WorkerLink from "../Pages/authentification/auth.generatelink.jsx";
import WorkerRegister from "../Pages/authentification/auth.workerregister.jsx";
import UserDashboard from "../Pages/User/user.dashboard.jsx";
import Dashboard from "../Pages/User/user.dashboard2.jsx";
import CreateProjectPage from "../Pages/Project/project.createproject.jsx";
import UpdateUserPage from "../Pages/User/user.updateuser.jsx";
import SkillForm from "../Pages/Skills/user.skillscreation.jsx";
import SkillUpdateForm from "../Pages/Skills/user.updateskill.jsx";
import SkillAssignment from "../Pages/Skills/user.skillassignment.jsx";
import EmployeeSearch from "../Pages/TeamFind/team.available.jsx";
import ViewProjectPage from "../Pages/Project/project.viewproject.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import ProjectList from "../Components/projectstable/dashboard.projects.jsx";
import UsersList from "../Components/projectstable/dashboard.users.jsx";
import DepartmentsList from "../Components/projectstable/dashboard.departments.jsx";
import UpdateProjectPage from "../Pages/Project/project.updateproject.jsx";
import CreateDepartmentPage from "../Pages/department/department.create.jsx";
import JwtDecoder from "../utils/jwt-decoder.jsx";
import "../css/auth.login.css";
import "../css/auth.generatelink.css";
import "../css/user.dashboard.css";
import "boxicons/css/boxicons.min.css";
import ParentComponent from "../Components/SideBar/app.sidebar.parent.jsx";
import EditDepartmentPage from "../Pages/department/department.edit.jsx";
import LogoutPage from "../Pages/authentification/logoutpage.jsx";
import AvailableWorkersPage from "../Pages/TeamFind/team.assignwtop.jsx";
import ProjectManagement from "../Pages/Project/project.allprojects.jsx";

const App = () => {
  const project = {
    title: "Project Title",
    description: "Project Description",
    period: "fixed",
    startDate: "2024-03-10",
    deadlineDate: "2024-03-20",
    techStack: "React, Node.js",
    status: "not_started",
    selectedRoles: ["Developer", "Designer"],
  };
  return (
    <BrowserRouter>

      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projectlist" element={<ProjectList />} />
        <Route path="/userlist" element={<UsersList />} />
        <Route path="/decoder" element={<JwtDecoder />} />
        <Route path="/departmentlist/:organizationId" element={<DepartmentsList />} />
        <Route path="/worker/:organizationId" element={<WorkerRegister />} />
        <Route element={<ProtectedRoute  />}>
        <Route path="/dashboard/" element={<UserDashboard />} />
        <Route path="/generatelink" element={<WorkerLink />} />
        <Route path="/createdepartment" element={<CreateDepartmentPage />} />
        <Route path="/editdepartment/:departmentId" element={<EditDepartmentPage />} />
        <Route path="/createproject/" element={<CreateProjectPage />} />
        <Route path="/logout/" element={<LogoutPage />} />
        <Route path="/editproject/:projectId" element={<UpdateProjectPage />} />
        <Route path="/updateuser/q/:userid" element={<UpdateUserPage />} />
        <Route path="/createskill/" element={<SkillForm />} />
        <Route path="/updateskill/q/:skillid" element={<SkillUpdateForm />} />
        <Route path="/skillassignment/:userId" element={<SkillAssignment />} />
        <Route path="/teamassignment" element={<AvailableWorkersPage />} /> 
        <Route path="/allprojects" element={<ProjectManagement />} />    
        <Route
          path="/viewproject"
          element={<ViewProjectPage project={project} />}
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
