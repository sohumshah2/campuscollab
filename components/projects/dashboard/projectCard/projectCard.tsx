import React from "react";
// import ReactMarkdown from "react-markdown";
// import styles from "./styles.module.css";
import Tag from "../tag/tag"

interface projectCardProps {
  projectName: string;
  description: string;
  imageUrl: string;
  tags: Array<string>;
}

const ProjectCard: React.FC<projectCardProps> = ({
  projectName,
  description,
  imageUrl,
  tags
}) => {
  // Add hover effect on card when you get how CSS works !!!!
  const styles = {
    card: {
      height: '400px',
      width: '300px',
      border: '1px solid #6A6A6A'
    },
    projectTitle : {
      fontSize: '1.5em',
      padding: '2% 0% 2% 2%',
    },
    projectDescription : {
      fontSize: '1.0em',
      padding: '2% 0% 2% 2%',
    },
    creatorAndLikesContainer: {
      backgroundColor: '#C7C7C7',

    },
    image: {
      width: '300px',
      height: '180px'
    },
    tagsContainer: {
      display: 'flex',
      gap: '5px',
      flexWrap: 'wrap',
      padding: '2% 0% 2% 2%',
    }
  }

  return (
    <>
      <div className="card" style={styles.card}>
        <img src={imageUrl} alt="project image" style={styles.image}/>
        <div className="projectTitle" style={styles.projectTitle}>
          {projectName}
        </div>
        <div style={styles.projectDescription}>
          {description}
        </div>
        <div className="tagsContainer" style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <div key={index}>
              <Tag tag={tag}/>
            </div>
          ))}
        </div>
        <div className="creatorsAndLikesContainer">
        
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
