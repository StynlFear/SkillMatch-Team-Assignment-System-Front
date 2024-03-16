import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "../../css/project.allprojects.css";
import EditPopup from '../popups/pop.edit'; // Import EditPopup component
import DeletePopup from '../popups/pop.delete'; // Import DeletePopup component

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

const ProjectList = () => {
  const organizationId = localStorage.getItem("organizationId");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsData, setProjectsData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const projectsPerPage = 3;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/v1/organization/p/${organizationId}`);
      console.log("API Response:", response.data);
      setProjectsData(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjectsData([]);
    }
  };

  useEffect(() => {
    console.log("Organization ID:", organizationId);
    if (organizationId) {
      fetchData();
    }
  }, [organizationId]);

  const indexOfLastProject = (currentPage + 1) * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const filterProjects = (project) => {
    const values = Object.values(project);
    for (const value of values) {
      if (
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      if (
        Array.isArray(value) &&
        value.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
      ) {
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

  const handleEdit = (projectId) => {
    setShowEditPopup(true);
  };

  const handleDelete = async (projectId) => {
    setShowDeletePopup(true);
  };

  const handleStatusChange = async (projectId, status) => {
    try {
      await axios.put(`${apiUrl}/v1/project/${projectId}`, {
        projectStatus: status,
        organizationId: organizationId,
      });
      console.log('Project status updated successfully');
      setCurrentPage(0); // Reset currentPage to 0 after updating status
      fetchData(); // Fetch data again to refresh projects after updating status
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='project-management-container'>
      <input
        type="text"
        placeholder="Search projects"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='project-management-search-input'
      />
      <table className='project-management-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Project Period</th>
            <th>Start Date</th>
            <th>Deadline Date</th>
            <th>Technology Stack</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project) => (
            <tr key={project.projectId}>
              <td>{project.projectName}</td>
              <td>{project.projectDescription}</td>
              <td>
                <select
                  value={project.projectStatus}
                  onChange={(e) =>
                    handleStatusChange(project.projectId, e.target.value)
                  }
                >
                  <option value="not_started">Not Started</option>
                  <option value="starting">Starting</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closing">Closing</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td>{project.projectPeriod}</td>
              <td>{formatDate(project.projectStartDate)}</td>
              <td>{formatDate(project.projectDeadline)}</td>
              <td>
                {project.technologyStack ? project.technologyStack.join(', ') : '-'}
              </td>
              <td>
                <select
                  onChange={(e) => {
                    if (e.target.value === 'edit') {
                      handleEdit(project.projectId);
                    } else if (e.target.value === 'delete') {
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
      <ReactPaginate
        className='pagination'
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredProjects.length / projectsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      {showEditPopup && (
        <EditPopup
          onClose={() => setShowEditPopup(false)}
          onConfirm={() => {
            setShowEditPopup(false);
            // Navigate to the edit page
          }}
        />
      )}
      {showDeletePopup && (
        <DeletePopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={() => {
            setShowDeletePopup(false);
            // Handle deletion logic here
          }}
        />
      )}
    </div>
  );
};

export default ProjectList;
