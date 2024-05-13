import React from "react";
// import ReactMarkdown from "react-markdown";
// import styles from "./styles.module.css";
import Tag from "../tag/tag";
import { HeartFill, ChatFill } from 'react-bootstrap-icons';
import defaultProfilePic from './default_profile_pic.jpeg'


interface projectCardProps {
  projectName: string;
  description: string;
  imageUrl: string;
  tags: Array<string>;
  likes : number;
  numMessages: number;
  creators: Array<string>;
}

const ProjectCard: React.FC<projectCardProps> = ({
  projectName,
  description,
  imageUrl,
  tags,
  likes,
  numMessages,
  creators,
}) => {
  // Add hover effect on card when you get how CSS works !!!!
  const styles = {
    card: {
      height: '450px',
      width: '300px',
      border: '1px solid #6A6A6A',
      // position: 'relative',
    },
    projectTitle : {
      fontSize: '1.5em',
      padding: '2% 0% 2% 2%',
    },
    projectDescription : {
      fontSize: '1.0em',
      padding: '2% 0% 2% 2%',
      height: '100px',
    },
    // creatorAndLikesContainer: {
    //   backgroundColor: '#C7C7C7',
    //   position: 'relative',
    //   height: '40px',
    // },
    cardFooter: {
      backgroundColor: '#C7C7C7',
      display: 'flex',
      // position: 'absoloute',
      height: '50px',
    },
    image: {
      width: '300px',
      height: '180px',
      objectFit: 'cover',
    },
    tagsContainer: {
      display: 'flex',
      gap: '5px',
      flexWrap: 'wrap',
      padding: '2% 0% 2% 2%',
    },
    creatorProfilePic: {
      width: '35px',
      height: '35px',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    creatorsContainer: {
      width: '50%',
      padding: '2% 0% 2% 2%',
      display: 'flex',
      gap: '2px'
    },
    LikesContainer: {
      width: '50%',
      padding: '2% 0% 2% 2%',
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    LikeMesIcon: {
      marginRight: '3px',
    }
  }
  // Set to void for now
  const filterProjects = (userQuery: string): void => {
    console.log(userQuery);
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
        {/* <div style={styles.creatorAndLikesContainer}> */}
          <footer className="creatorsAndLikesContainer" style={styles.cardFooter}>
            <div className="creatorsContainer" style={styles.creatorsContainer}>
              {creators.map((creator, index) => (
                <div key={index}><img style={styles.creatorProfilePic} src="https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg" alt="creator profile picture" /></div>
              ))}
            </div>
            <div className="LikesContainer" style={styles.LikesContainer}>
                <div><HeartFill style={styles.LikeMesIcon}/>{likes}</div>
                <div><ChatFill style={styles.LikeMesIcon}/>{numMessages}</div>
            </div>
          </footer>
        {/* </div> */}
        
      </div>
    </>
  );
};

export default ProjectCard;
