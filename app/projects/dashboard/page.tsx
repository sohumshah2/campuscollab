"use client";

import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/searchBar/searchBar";
import Logo from "@/components/logo/logo";
import ProjectCard from "@/components/projects/dashboard/projectCard/projectCard";
import Fuse from "fuse.js";
import { PlusCircleFill } from "react-bootstrap-icons";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface UserQuery {
  title: string;
  tags: Array<string>;
  creators: Array<string>;
}

const Page = () => {
  // Controls the display CSS of noSearchResult div and projectContainer
  // Set to none if we want to make it hidden
  // To display set to inline for noSearch and grid for project container. 
  const [displayNoSearch, setdisplayNoSearch] = useState("none");
  const [displayProjectContainer, setdisplayProjectContainer] = useState("grid");

  // Styles for the no search results and the projects container
  const inlineStyles = {
    noSearchResults: {
      display: displayNoSearch,
      padding: '10%',
      width: '100%',
      textAlign: 'center',
      fontSize: '1.5em',
      
    },
    projectContainer: {
      display: displayProjectContainer,
    },
  };
  const params = useSearchParams();

  // Loads up projects initally based on query from url
  useEffect(() => {
    const fetchProjectsData = async () => {
      const res = await fetch(`/api/project/dashboard`);
      if (!res.ok) {
        alert("Failed to get projects\n" + (await res.json()).message);
        return;
      }
      const data = await res.json();
      setShowProjects(data);
      let userQueryObject: UserQuery = {
        title: "",
        tags: [],
        creators: [],
      };
      const titleQuery = params.get("title");
      if (titleQuery !== null) {
        userQueryObject.title = titleQuery;
      }
      const tagsQuery = params.get("tags");
      if (tagsQuery !== null) {
        const tagsArray: string[] = tagsQuery.split(" ");
        userQueryObject.tags = tagsArray;
      }

      const creatorsQuery = params.get("creators");
      if (creatorsQuery !== null) {
        const creatorsArray: string[] = creatorsQuery.split(" ");
        userQueryObject.creators = creatorsArray;
      }

      filterProjectsParams(userQueryObject, data);
    };
    fetchProjectsData();
  }, []);

  // Creates a user query type based on string input
  // Used by filterProjects
  const createUserQuery = (queryString: string) => {
    let userQuery: UserQuery = {
      title: "",
      tags: [],
      creators: [],
    };
    const userQueryList = queryString.split(",").map((query) => query.trim());
    userQueryList.forEach((query) => {
      if (!/@|#/.test(query)) {
        userQuery.title = query;
      }
    });

    // Get all the tags in userquery
    userQueryList.forEach((query) => {
      if (query.includes("#")) {
        let removeHash = query.replace(/#/g, "");
        userQuery.tags.push(removeHash);
      }
    });

    // Get all the users in userquery
    userQueryList.forEach((query) => {
      if (query.includes("@")) {
        let removeAt = query.replace(/@/g, "");
        userQuery.creators.push(removeAt);
      }
    });

    return userQuery;
  };

  // State for projects to be shown based on user query
  const [showProjects, setShowProjects] = useState([]);

  // Does all the filtering of projects by giving the user query and project data
  const filterProjectsParams = (userQuery: UserQuery, projectData): void => {
    let showFilteredResult = projectData;
    showFilteredResult = [];

    if (userQuery.title.length > 0) {
      const fuse = new Fuse(projectData, {
        keys: ["projectName"],
      });
      const fuzzyResult = fuse.search(userQuery.title);
      showFilteredResult = fuzzyResult.map((obj) => obj.item);
    }

    // Set showFilteredResult to project Data if size is 0
    if (showFilteredResult.length === 0) {
      showFilteredResult = projectData;
    }
    const filteredTagCreator = showFilteredResult.filter((project) => {
      let hasMatchingTag = userQuery.tags.every((tag) =>
        project.tags.includes(tag)
      );

      // Check if any creator matches the creator list
      let hasMatchingCreator = userQuery.creators.every((creator) =>
        project.creators.includes(creator)
      );

      // If tags list empty, set to true.
      if (userQuery.tags.length === 0) {
        hasMatchingTag = true;
      }

      // If creator list is empty, set to true.
      if (userQuery.creators.length === 0) {
        hasMatchingCreator = true;
      }

      // return true if tag and creator matches
      return hasMatchingTag && hasMatchingCreator;
    });
    
    setShowProjects(filteredTagCreator);
    // If there are no projects to be show i.e filteredTagCreator === 0
    // Then make noSearch appear and projectContainer disappear
    // vice versa
    if (filteredTagCreator.length > 0) {
      setdisplayNoSearch("none");
      setdisplayProjectContainer("grid");
    } else {
      console.log('else trig', userQuery)
      setdisplayNoSearch("inline");
      setdisplayProjectContainer("none");
    }
  };

  // Set to void for now
  // Does the filter projects when user enters a query string in the search bar
  // Calls filter project params
  const filterProjects = (userQuery: string): void => {
    const fetchProjectsData = async () => {
      const res = await fetch(`/api/project/dashboard`);

      const data = await res.json();

      const userQueryObject = createUserQuery(userQuery);
      filterProjectsParams(userQueryObject, data);
    };

    fetchProjectsData();
  };
  return (
    <>
      <Navbar />
      <div className={styles.dashLogoContainer}>
        <Logo />
        <div className={styles.btnContainer}>
          <a href="/projects/create">
            <button className={styles.addProjectBtn}>
              <div className={styles.btnTextContainer}>
                <span className={styles.plusIconSpan}>
                  <PlusCircleFill />
                </span>
                <div className={styles.addBtnText}>Add your project</div>
              </div>
            </button>
          </a>
        </div>
      </div>
      <SearchBar filterSearch={filterProjects} />
      <div
        className={styles.bodyContainer}
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "1fr 80px",
          gap: "8px",
          width: "100%",
        }}
      >
        <div 
          className={styles.projectCardsContainer}
          style={inlineStyles.projectContainer}
        >
          {showProjects.map((project, index) => (
            <div key={index}>
              <ProjectCard
                projectName={project.projectName}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={project.tags}
                projectId={project.id}
                // likes={project.likes}
                // numMessages={project.messages.length}
                creators={project.teammates}
              />
            </div>
          ))}
        </div>
        <div
          className={styles.noSearchResults}
          style={inlineStyles.noSearchResults}
        >
          Oh no! Looks like nothing came up from your search result. Try a
          simpler search.
        </div>
      </div>
    </>
  );
};

export default Page;
