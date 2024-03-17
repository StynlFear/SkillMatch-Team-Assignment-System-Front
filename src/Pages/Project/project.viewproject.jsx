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
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td><input type="text" value={project.projectName} readOnly /></td>
          </tr>
          <tr>
            <td>Description:</td>
            <td><textarea value={project.projectDescription} readOnly /></td>
          </tr>
          <tr>
            <td>Period:</td>
            <td><input type="text" value={project.projectPeriod} readOnly /></td>
          </tr>
          <tr>
            <td>Start Date:</td>
            <td><input type="date" value={project.projectStartDate} readOnly /></td>
          </tr>
          {project.projectPeriod === "fixed" && (
            <tr>
              <td>Deadline Date:</td>
              <td><input type="date" value={project.projectDeadline} readOnly /></td>
            </tr>
          )}
          <tr>
            <td>Technology Stack:</td>
            <td><textarea value={project.technologyStack.join(", ")} readOnly /></td>
          </tr>
          <tr>
            <td>Status:</td>
            <td><input type="text" value={project.projectStatus} readOnly /></td>
          </tr>
        </tbody>
      </table>

      <div className="buttons-container">
        <Link to={`/proposals/${projectId}`}><button>View Proposals</button></Link>
        <Link to={`/createteam/${projectId}`}><button>Create Team</button></Link>
        <Link to={`/proposal/${projectId}`}><button>Create Proposal</button></Link>
        <Link to={`/viewteam/${projectId}`}><button>See Teams for this project</button></Link>
      </div>
    </div>
  );
}

export default ViewProjectPage;
