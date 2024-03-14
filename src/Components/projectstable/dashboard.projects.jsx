import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ProjectsList = ({ organizationId }) => {
  console.log(organizationId);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsData, setProjectsData] = useState([]);
  const projectsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/v1/organization/p/${organizationId}`
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
