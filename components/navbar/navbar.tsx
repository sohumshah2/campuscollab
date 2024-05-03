import React from 'react';
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.mainNav}>
      <ul className='main-nav-ul'>
        <li className='main-nav-li'><a href="/">Home</a></li>
        <li><a href="/projects/dashboard">Projects</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/people">People</a></li>
        <li><a href="/profile"><i className="bi bi-person-circle"></i></a></li>

      </ul>
    </nav>
  );
}

export default Navbar;