import React from 'react';
import styles from "./styles.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";


const Logo: React.FC = () => {
  return (
    <>
    <div className={styles.logoContainer}>
      <div className={styles.moonPresents}> Team Moon presents </div>
      <div className={styles.campusCollabLogo}><span className={styles.campusText}>Campus</span><span className={styles.collabText}>Collab</span></div>
      <div className={styles.subtext}>Find your perfect uni group for your projects</div>
    </div>
      
    </>
  );
}

export default Logo;