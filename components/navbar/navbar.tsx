import React from 'react';
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonCircle } from 'react-bootstrap-icons';


const Navbar: React.FC = () => {
  return (
    <nav className={styles.mainNav}>
      <ul>
        <li ><a href="/">Home</a></li>
        <li><a href="/projects/dashboard">Projects</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/people">People</a></li>
        <li className="profile-icon"><a href="/profile"><PersonCircle/></a></li>

      </ul>
    </nav>
  );
}

export default Navbar;