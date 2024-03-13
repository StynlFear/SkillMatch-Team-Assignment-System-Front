import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
const projectsData = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    period: "3 months",
    startDate: "2023-01-01",
    deadlineDate: "2023-04-01",
    status: "In Progress",
    techStack: ["React", "Node.js"],
    selectedRoles: ["Frontend Developer", "Backend Developer"]
  },
  // Add more project objects as needed
];

const ProjectsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const projectsPerPage = 5;

  const indexOfLastProject = (currentPage + 1) * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const filterProjects = project => {
    const values = Object.values(project);
    for (const value of values) {
      if (typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      if (Array.isArray(value) && value.join(", ").toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  const filteredProjects = projectsData.filter(filterProjects);
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset pagination to first page when searching
  };

  return (
    <div className='pagination'>
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
          {currentProjects.map(project => (
            <tr key={project.title}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.period}</td>
              <td>{project.startDate}</td>
              <td>{project.deadlineDate}</td>
              <td>{project.status}</td>
              <td>{project.techStack.join(", ")}</td>
              <td>{project.selectedRoles.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredProjects.length / projectsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default ProjectsList;
