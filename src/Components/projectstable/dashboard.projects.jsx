import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
const apiUrl = import.meta.env.VITE_APP_MASTER_IP;
const ProjectsList = ({ organizationId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsData, setProjectsData] = useState([]);
  const projectsPerPage = 5;
  const navigate= useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/organization/p/${organizationId}`
        );
        setProjectsData(response.data || []); // Set projectsData to an empty array in case of error
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectsData([]); // Set projectsData to an empty array in case of error
      }
    };

    if (organizationId) {
      // Fetch data only if organizationId is available
      fetchData();
    }
  }, [organizationId]);

  const indexOfLastProject = (currentPage + 1) * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const filterProjects = (project) => {
    const values = Object.values(project);
    for (const value of values) {
      if (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      if (
        Array.isArray(value) &&
        value.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };

  const filteredProjects = projectsData.filter(filterProjects);
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset pagination to first page when searching
  };

  const handleEdit = (projectId) => {
    // Implement edit functionality
    navigate(`/editproject/${projectId}`); 
  };
  const handleDelete = async (projectId) => {
    try {
      // Make DELETE request to delete the project
      const response = await axios.delete(`${apiUrl}/v1/project/${projectId}`);
  
      // Log success message
      console.log("Project deleted successfully:", response.data);
      window.location.reload();
      // Optionally, update the state or perform any other actions after deletion
    } catch (error) {
      // Log error message if deletion fails
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="pagination">
      <input
        type="text"
        placeholder="Search projects"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Period</th>
            <th>Start Date</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Technology Stack</th>
            <th>Selected Roles</th>
            <th>Actions</th> {/* Add Actions column */}
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project) => (
            <tr key={project.projectId}>
              <td>{project.projectName}</td>
              <td>{project.projectDescription}</td>
              <td>{project.projectPeriod}</td>
              <td>{project.projectStartDate}</td>
              <td>{project.projectDeadline}</td>
              <td>{project.projectStatus}</td>
              <td>
                {project.technologyStack
                  ? project.technologyStack.join(", ")
                  : "-"}
              </td>
              {/* Render other project details here */}
              <td>
                <select
                  onChange={(e) => {
                    if (e.target.value === "edit") {
                      handleEdit(project.projectId);
                    } else if (e.target.value === "delete") {
                      handleDelete(project.projectId);
                    }
                  }}
                >
                  <option value="">Actions</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredProjects.length / projectsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default ProjectsList;
