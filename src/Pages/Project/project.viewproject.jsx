import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../../css/project.viewproject.css";
import Sidebar from "../../Components/SideBar/app.sidebard";

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

function ViewProjectPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/project/${projectId}`);
        const projectData = response.data.data;
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-project-container">
      <Sidebar/>
      <h2>View Project</h2>
      <div className="view-project-option">
        <strong className="view-project-title">Title:</strong>{" "}
        <input
          type="text"
          value={project.projectName}
          readOnly
        />
      </div>
      <div className="view-project-option">
        <strong className="view-project-title">Description:</strong>{" "}
        <textarea value={project.projectDescription} readOnly />
      </div>
      <div>
        <strong className="view-project-title">Period:</strong>{" "}
        <input
          type="text"
          value={project.projectPeriod}
          readOnly
        />
      </div>
      <div>
        <strong className="view-project-title">Start Date:</strong>{" "}
        <input
          type="date"
          value={project.projectStartDate}
          readOnly
        />
      </div>
      {project.projectPeriod === "fixed" && (
        <div>
          <strong className="view-project-title">Deadline Date:</strong>{" "}
          <input
            type="date"
            value={project.projectDeadline}
            readOnly
          />
        </div>
      )}
      <div>
        <strong className="view-project-title">Technology Stack:</strong>{" "}
        <textarea value={project.technologyStack.join(", ")} readOnly />
      </div>
      <div>
        <strong className="view-project-title">Status:</strong>{" "}
        <input
          type="text"
          value={project.projectStatus}
          readOnly
        />
      </div>

      {/* Button to redirect to /proposals/:projectId */}
      <Link to={`/proposals/${projectId}`}>
        <button>View Proposals</button>
      </Link>

      {/* Button to redirect to /team/:projectId */}
      <Link to={`/team/${projectId}`}>
        <button>View Team</button>
      </Link>
    </div>
  );
}

export default ViewProjectPage;
