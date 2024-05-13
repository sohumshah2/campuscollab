"use client";

import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/searchBar/searchBar";
import ProjectCard from "@/components/projects/dashboard/projectCard/projectCard";
import Fuse from 'fuse.js';


import React, { useState } from "react";
import styles from "./styles.module.css";

const page = () => {
  const [visibilityNoSearch, setVisibilityNoSearch] = useState('hidden');
  const styles = {
    projectCardsContainer : {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '30px',
      padding: '30px',
    },
    noSearchResults: {
      padding: '10%',
      visibility: visibilityNoSearch,
      width: '100%',
      textAlign: 'center',
    }
  };


  // Sample Project Data. This is temp only. Data structure will change when decided
  // should likes be a list like messages
  const projectsData = [
    {
      projectName: 'COMP6080',
      description: 'Description of Project',
      tags: ['course', 'comp6080', 'hackathon', 'competition'],
      creators: ['Bob', 'Charlie', 'SomeGuy'],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'IMC Prosperity',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: ['Bob', 'Charlie', 'SomeGuy'],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",

    },
    {
      projectName: 'Mystery Planet',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: [],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'UNIHACK 2024',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: ['Bob', 'Charlie', 'SomeGuy'],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'Team Moon',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: ['Bob', 'Charlie', 'SomeGuy'],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'COMP1511',
      description: 'Description of Project 2',
      tags: ['course', 'comp6080', 'hackathon', 'competition'],
      creators: ['Charlie', 'SomeGuy', 'firstYear'],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'SENG2011',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: ['CoolGuy', 'Charlie', 'SomeGuy'],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: 'SENG3011',
      description: 'Description of Project 2',
      tags: ['events', 'comp6080', 'hackathon', 'competition'],
      creators: ['Bob', 'Charlie', 'SomeGuy'],
      likes: 10,
      messages: ['Hi', 'your project is cool'],
      imageUrl: "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
  ];

  const [showProjects, setShowProjects] = useState(projectsData);

  // Set to void for now
  const filterProjects = (userQuery: string): void => {
    const userQueryList = userQuery.split(',').map(query => query.trim());
    console.log(userQueryList);
    console.log(userQuery);

    // At the moment, it will use the last valid project name for fuzzy search
    let userQueryProjectName = '';
    userQueryList.forEach(query => {
      if (!/@|#/.test(query)) {
        userQueryProjectName = query;
      }
    });

    let queryTagsList: string[] = [];
    let queryCreatorsList: string[] = [];

    // Get all the tags in userquery
    userQueryList.forEach(query => {
        if (query.includes('#')) {
          let removeHash = query.replace(/#/g, "");
          queryTagsList.push(removeHash)
        };
    });

    // Get all the users in userquery
    userQueryList.forEach(query => {
      if (query.includes('@')) {
        let removeAt = query.replace(/@/g, "");
        queryCreatorsList.push(removeAt);
      };
    });
    console.log('taglist', queryTagsList);
    console.log('usersList', queryCreatorsList);

    console.log('userqueryProjectName', userQueryProjectName);
    
    let showFilteredResult = projectsData;
    showFilteredResult = [];

    if (userQueryProjectName.length > 0) {
      // Using fuse for fuzzy search using project titles
      const fuse = new Fuse(projectsData, {
        keys: ['projectName'],
      });
      const fuzzyResult = fuse.search(userQueryProjectName);
      showFilteredResult = fuzzyResult.map(obj => obj.item);
    }
    
    // Set showFilteredResult to project Data if size is 0
    if (showFilteredResult.length === 0) {
      showFilteredResult = projectsData;
    }
    console.log('showfilteredresult', showFilteredResult);

    
    const filteredTagCreator = showFilteredResult.filter(project => {
      let hasMatchingTag = queryTagsList.every(tag => project.tags.includes(tag));

    
      // Check if any creator matches the creator list
      let hasMatchingCreator = queryCreatorsList.every(creator => project.creators.includes(creator));


      // If tags list empty, set to true.
      if (queryTagsList.length === 0) {
        hasMatchingTag = true;
      }

      // If creator list is empty, set to true.
      if (queryCreatorsList.length === 0) {
        hasMatchingCreator = true;
      }
      console.log('project name', project.projectName, hasMatchingTag, hasMatchingCreator, hasMatchingTag && hasMatchingCreator)

      // return true if tag and creator matches
      return hasMatchingTag && hasMatchingCreator;
    });




    console.log(filteredTagCreator.length);
    setShowProjects(filteredTagCreator);

    if (filteredTagCreator.length > 0) {
      
      setVisibilityNoSearch('hidden');
    } else {
      setVisibilityNoSearch('visible');
    }

    // console.log(userQuery);
    // console.log(result);
  };
  return (
    <>
      <Navbar/>
      <SearchBar filterSearch={filterProjects}/>
      <div style={styles.projectCardsContainer}>
        {showProjects.map((project, index) => (
        <div key={index}>
          <ProjectCard projectName={project.projectName} description={project.description} imageUrl={project.imageUrl} tags={project.tags} likes={project.likes} numMessages={(project.messages).length} creators={project.creators}/>
        </div>
      ))}
      </div>
      <div style={styles.noSearchResults}>
        Oh no! Looks like nothing came up from you search result. Try a simpler search.
      </div>
    </>
  );
};

export default page;
