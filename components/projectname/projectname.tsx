import React from 'react';
import './projectname.css';

interface ProjectNameProps {
  name: string;
}

const ProjectName: React.FC<ProjectNameProps> = ({ name }) => {
  return (
    <div className="project-name-container">
      <h2 className="project-name">{name}</h2>
    </div>
  );
}

export default ProjectName;
