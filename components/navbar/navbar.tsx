"use client";

import React, { useEffect } from "react";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonCircle } from "react-bootstrap-icons";
import SignInButton from "../signin/SignInButton";

const Navbar: React.FC = () => {
  // Get username from localstorage
  const [username, setUsername] = React.useState("");
  useEffect(() => {
    // This code will only run on the client-side
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);
  }, []);

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        <div className={styles.leftSide}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/projects/dashboard">Projects</a>
          </li>
          <li>
            <a href="/events">Events</a>
          </li>
          <li>
            <a href="/people">People</a>
          </li>
        </div>
        <div className={styles.rightSide}>
          <li className={styles.profileIcon}>
            <a href={`/people/${username}`}>
              <PersonCircle title="Profile" />
            </a>
          </li>
          <li>
            <SignInButton />
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
