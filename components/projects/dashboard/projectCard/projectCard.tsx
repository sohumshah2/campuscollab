import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import styles from "./styles.module.css";
import Tag from "../tag/tag";
import { HeartFill, ChatFill } from "react-bootstrap-icons";

interface projectCardProps {
  projectName: string;
  description: string;
  imageUrl: string;
  tags: Array<string>;
  creators: any;
  projectId: any;
}

const ProjectCard: React.FC<projectCardProps> = ({
  projectName,
  description,
  imageUrl,
  tags,
  // likes,
  // numMessages,
  creators,
  projectId,
}) => {
  // CSS for project Card
  const styles = {
    card: {
      height: "450px",
      width: "300px",
      border: "1px solid #6A6A6A",
      borderRadius: "5px",
      // position: 'relative',
    },
    projectTitle: {
      fontSize: "1.5em",
      padding: "2% 0% 2% 2%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: 'nowrap',
    },
    projectDescription: {
      fontSize: "1.0em",
      padding: "2% 0% 2% 2%",
      height: "100px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    // creatorAndLikesContainer: {
    //   backgroundColor: '#C7C7C7',
    //   position: 'relative',
    //   height: '40px',
    // },
    cardFooter: {
      backgroundColor: "#C7C7C7",
      display: "flex",
      // position: 'absoloute',
      height: "50px",
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "5px",
      marginTop: "auto",
    },
    image: {
      width: "299px",
      height: "180px",
      objectFit: "cover",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "5px",
    },
    tagsContainer: {
      display: "flex",
      gap: "5px",
      flexWrap: "wrap",
      padding: "2% 2% 2% 2%",
      marginBottom: "5px",
      height: "68.91px",
    },
    creatorProfilePic: {
      width: "30px",
      height: "30px",
      objectFit: "cover",
      borderRadius: "50%",
    },
    moreCreators: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      textAlign: "center",
      backgroundColor: "#F9C80E",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    creatorsContainer: {
      width: "67%",
      padding: "2% 0% 2% 2%",
      display: "flex",
      gap: "2px",
      alignItems: "center",
    },
    LikesContainer: {
      width: "33%",
      padding: "2% 0% 2% 2%",
      display: "flex",
      gap: "15px",
      alignItems: "center",
    },
    LikeMesIcon: {
      marginRight: "3px",
      marginLeft: "auto",
    },
  };
  // {username: imageUrl}
  // Contains an object of username -> key and imageUrl value
  const [profileImages, setProfileImages] = useState({});

  // Returns creators that will be visible on the project card
  // Rest will be a number i.e +2 if there are 2 that were not shown
  const visibleCreators = () => {
    if (creators === undefined || creators === null) {
      return [];
    }
    // Currently max 7 creators will be shown
    return creators.slice(0, 7);
  };

  // Fetch profiles based on creators/teammates string usernames
  useEffect(() => {
    const fetchProfileImages = async () => {
      const profileImagePromises = creators.map(async (username) => {
        const response = await fetch(`/api/profile?username=${username}`);
        const data = await response.json();
        return { username, profileImage: data.profileImageUrl };
      });

      const profileImagesArray: any = await Promise.all(profileImagePromises);
      
      const profileImagesMap = profileImagesArray.reduce((acc, { username, profileImage }) => {
        acc[username] = profileImage;
        return acc;
      }, {});
      setProfileImages(profileImagesMap);
    };

    fetchProfileImages();
  }, [creators]);

  return (
    <>
      <div className="card" style={styles.card}>
        <a
          href={`/projects/${projectId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={imageUrl} alt="project image" style={styles.image} />
          <div className="projectTitle" style={styles.projectTitle}>
            {projectName}
          </div>
          <div style={styles.projectDescription}>{description}</div>
          <div className="tagsContainer" style={styles.tagsContainer}>
            {tags && tags.map((tag, index) => (
                <a
                  href={`/projects/dashboard?tags=${tag}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={index}
                >
                  <div key={index}>
                    <Tag tag={tag} />
                  </div>
                </a>
              ))}
          </div>
          <footer
            className="creatorsAndLikesContainer"
            style={styles.cardFooter}
          >
            <div className="creatorsContainer" style={styles.creatorsContainer}>
              {visibleCreators().map((creator, index) => (
                <a
                  href={`/people/${creator}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={index}
                >
                  <div key={index}>
                    <img
                      style={styles.creatorProfilePic}
                      src={profileImages[creator] || "/default_profile_pic2.jpeg"}
                      alt="creator profile picture"
                    />
                  </div>
                </a>
              ))}
              {creators.length > 7 && (
                <div className="more-creators" style={styles.moreCreators}>
                  +{creators.length - 6}
                </div>
              )}
            </div>
          </footer>
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
