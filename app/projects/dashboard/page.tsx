"use client";

import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/searchBar/searchBar";
import ProjectCard from "@/components/projects/dashboard/projectCard/projectCard";


import React, { useState } from "react";
import styles from "./styles.module.css";

const page = () => {
  
  const styles = {
    projectCardsContainer : {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '30px',
      padding: '30px',
    }
  };

  // Sample Project Data. This is temp only. Data structure will change when decided
  const projectsData = [
    {
      projectName: 'Name of Project',
      description: 'Description of Project',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: [],
      likes: 10,
      messages: 5,
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'Name of Project 2 ',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: [],
      likes: 10,
      messages: 5,
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",

    },
    {
      projectName: 'Name of Project 2',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: [],
      likes: 10,
      messages: 5,
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'Name of Project 2',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: [],
      likes: 10,
      messages: 5,
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'Name of Project 2',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: [],
      likes: 10,
      messages: 5,
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
  ];
  return (
    <>
      <Navbar/>
      <SearchBar/>
      <div style={styles.projectCardsContainer}>
        {projectsData.map((project, index) => (
        <div key={index}>
          <ProjectCard projectName={project.projectName} description={project.description} imageUrl={project.imageUrl} tags={project.tags} />
        </div>
      ))}
      </div>
    </>
  );
};

export default page;
