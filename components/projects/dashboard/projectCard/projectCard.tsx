import React from "react";
// import ReactMarkdown from "react-markdown";
// import styles from "./styles.module.css";
import Tag from "../tag/tag";
import { HeartFill, ChatFill } from 'react-bootstrap-icons';
import defaultProfilePic from './default_profile_pic.jpeg';



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
  // const router = useRouter();
  // Add hover effect on card when you get how CSS works !!!!
  const styles = {
    card: {
      height: '450px',
      width: '300px',
      border: '1px solid #6A6A6A',
      borderRadius: '5px'
      // position: 'relative',
    },
    projectTitle : {
      fontSize: '1.5em',
      padding: '2% 0% 2% 2%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    projectDescription : {
      fontSize: '1.0em',
      padding: '2% 0% 2% 2%',
      height: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
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
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '5px'
    },
    image: {
      width: '299px',
      height: '180px',
      objectFit: 'cover',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '5px',

    },
    tagsContainer: {
      display: 'flex',
      gap: '5px',
      flexWrap: 'wrap',
      padding: '2% 0% 2% 2%',
      marginBottom: '5px'
    },
    creatorProfilePic: {
      width: '30px',
      height: '30px',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    moreCreators: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      textAlign: 'center',
      backgroundColor: '#F9C80E',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    creatorsContainer: {
      width: '67%',
      padding: '2% 0% 2% 2%',
      display: 'flex',
      gap: '2px',
      alignItems: 'center'
      
    },
    LikesContainer: {
      width: '33%',
      padding: '2% 0% 2% 2%',
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    LikeMesIcon: {
      marginRight: '3px',
      marginLeft: 'auto',
    }
  }
  const visibleCreators = () => {
    return creators.slice(0, 4);
  }
  // There could be a possible bug if we have too many tags for the project card. i.e it will not look nice

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
            <a href={`/projects/dashboard?tags=${tag}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div key={index} >
                <Tag tag={tag}/>
              </div>
            </a>
          ))}
        </div>
          <footer className="creatorsAndLikesContainer" style={styles.cardFooter}>
            <div className="creatorsContainer" style={styles.creatorsContainer}>
              {visibleCreators().map((creator, index) => (
                <div key={index}><img style={styles.creatorProfilePic} src="https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg" alt="creator profile picture" /></div>
              ))}
              { creators.length > 4 && (
                <div className="more-creators" style={styles.moreCreators}>
                  +{creators.length - 3}
                </div>
              )}
            </div>
            <div className="LikesContainer" style={styles.LikesContainer}>
                <div><HeartFill style={styles.LikeMesIcon}/>{likes}</div>
                <div><ChatFill style={styles.LikeMesIcon}/>{numMessages}</div>
            </div>
          </footer>        
      </div>
    </>
  );
};

export default ProjectCard;
