import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/project.viewproject.css";

const apiUrl = import.meta.env.VITE_APP_MASTER_IP;

function ViewProjectPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/project/${projectId}`);
        const projectData = response.data.data; // Accessing the data object from the API response
        setProject(projectData); // Setting the projectData into the project state
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
      <h2>View Project</h2>
      <div className="view-project-option">
        <strong className="view-project-title">Title:</strong>{" "}
        <input
          type="text"
          value={project.projectName} // Accessing projectName from project object
          readOnly
        />
      </div>
      <div className="view-project-option">
        <strong className="view-project-title">Description:</strong>{" "}
        <textarea value={project.projectDescription} readOnly /> {/* Accessing projectDescription */}
      </div>
      <div>
        <strong className="view-project-title">Period:</strong>{" "}
        <input
          type="text"
          value={project.projectPeriod} // Accessing projectPeriod
          readOnly
        />
      </div>
      <div>
        <strong className="view-project-title">Start Date:</strong>{" "}
        <input
          type="date"
          value={project.projectStartDate} // Accessing projectStartDate
          readOnly
        />
      </div>
      {project.projectPeriod === "fixed" && (
        <div>
          <strong className="view-project-title">Deadline Date:</strong>{" "}
          <input
            type="date"
            value={project.projectDeadline} // Accessing projectDeadline
            readOnly
          />
        </div>
      )}
      <div>
        <strong className="view-project-title">Technology Stack:</strong>{" "}
        <textarea value={project.technologyStack.join(", ")} readOnly /> {/* Accessing technologyStack */}
      </div>
      <div>
        <strong className="view-project-title">Status:</strong>{" "}
        <input
          type="text"
          value={project.projectStatus} // Accessing projectStatus
          readOnly
        />
      </div>
    </div>
  );
}

export default ViewProjectPage;
