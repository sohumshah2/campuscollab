import React from "react";
import styles from "./styles.module.css";
import { Montserrat } from "next/font/google";

// import "bootstrap/dist/css/bootstrap.min.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weights: ["400", "700"],
});

const Logo: React.FC = () => {
  return (
    <>
      <div className={`${styles.logoContainer} ${montserrat.className}`}>
        <div className={styles.moonPresents}> Team Moon presents </div>
        <div className={styles.campusCollabLogo}>
          <span className={styles.campusText}>Campus</span>
          <span className={styles.collabText}>Collab</span>
        </div>
        <div className={styles.subtext}>
          Find your perfect uni group for your projects
        </div>
      </div>
    </>
  );
};

export default Logo;
