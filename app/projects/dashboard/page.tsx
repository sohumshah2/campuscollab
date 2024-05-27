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

const page = () => {
  const [visibilityNoSearch, setVisibilityNoSearch] = useState("hidden");
  const inlineStyles = {
    noSearchResults: {
      visibility: visibilityNoSearch,
    },
  };
  const params = useSearchParams();

  // useEffect to filter projects based on query parameters when first reloaded.
  useEffect(() => {
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
      // userQueryObject.title = titleQuery;
      const tagsArray: string[] = tagsQuery.split(" ");
      userQueryObject.tags = tagsArray;
    }

    const creatorsQuery = params.get("creators");
    if (creatorsQuery !== null) {
      // userQueryObject.title = titleQuery;
      const creatorsArray: string[] = creatorsQuery.split(" ");
      userQueryObject.creators = creatorsArray;
    }

    filterProjectsParams(userQueryObject);
  }, []);

  // Sample Project Data. This is temp only. Data structure will change when decided
  // should likes be a list like messages
  const projectsData = [
    {
      projectName: "COMP6080",
      description: "Description of Project",
      tags: ["course", "comp6080", "hackathon", "competition"],
      creators: ["Bob", "Charlie", "SomeGuy", "Carl", "Abbie"],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: "IMC Prosperity",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum eros ullamcorper efficitur imperdiet. Aliquam fermentum eleifend arcu, et consequat massa mattis et. Maecenas nec est vitae massa lobortis sodales. Integer accumsan nibh sed eros egestas fermentum. Morbi at nunc et dui finibus commodo non a nisl. Mauris sit amet rhoncus leo, nec laoreet orci. Curabitur gravida mi eros, ut consequat sem lobortis vitae. Ut enim leo, tincidunt eu porta ut, finibus vitae sem. Sed libero augue, sodales eu aliquam sit amet, dapibus at tellus. Mauris aliquam ipsum sit amet pharetra iaculis. Duis ut mauris nec augue cursus ornare nec.",
      tags: ["events", "comp6080", "hackathon", "competition"],
      creators: ["Bob", "Charlie", "SomeGuy"],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: "Mystery Planet",
      description: "Description of Project 2",
      tags: ["events", "comp6080", "hackathon", "competition"],
      creators: [],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: "UNIHACK 2024",
      description: "Description of Project 2",
      tags: ["events", "comp6080", "hackathon", "competition"],
      creators: ["Bob", "Charlie", "SomeGuy"],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: "Team Moon",
      description: "Description of Project 2",
      tags: ["events", "comp6080", "hackathon", "competition"],
      creators: ["Bob", "Charlie", "SomeGuy"],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: "COMP1511",
      description: "Description of Project 2",
      tags: ["course", "comp6080", "hackathon", "competition"],
      creators: ["Charlie", "SomeGuy", "firstYear"],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: "SENG2011",
      description: "Description of Project 2",
      tags: ["events", "comp6080", "hackathon", "competition"],
      creators: ["CoolGuy", "Charlie", "SomeGuy"],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
    {
      projectName: "SENG3011",
      description: "Description of Project 2",
      tags: ["events", "comp6080", "hackathon", "competition"],
      creators: ["Bob", "Charlie", "SomeGuy"],
      likes: 10,
      messages: ["Hi", "your project is cool"],
      imageUrl:
        "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg",
    },
  ];

  const [showProjects, setShowProjects] = useState(projectsData);

  // This is a copy and paste of filter projects just taking in a different input.
  // I can probably make the code cleaner
  const filterProjectsParams = (userQuery: UserQuery): void => {
    let showFilteredResult = projectsData;
    showFilteredResult = [];

    if (userQuery.title.length > 0) {
      // Using fuse for fuzzy search using project titles
      const fuse = new Fuse(projectsData, {
        keys: ["projectName"],
      });
      const fuzzyResult = fuse.search(userQuery.title);
      showFilteredResult = fuzzyResult.map((obj) => obj.item);
    }

    // Set showFilteredResult to project Data if size is 0
    if (showFilteredResult.length === 0) {
      showFilteredResult = projectsData;
    }
    console.log("showfilteredresult", showFilteredResult);

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

    if (filteredTagCreator.length > 0) {
      setVisibilityNoSearch("hidden");
    } else {
      setVisibilityNoSearch("visible");
    }
  };

  // Set to void for now
  const filterProjects = (userQuery: string): void => {
    const userQueryList = userQuery.split(",").map((query) => query.trim());
    console.log(userQueryList);
    console.log(userQuery);

    // At the moment, it will use the last valid project name for fuzzy search
    let userQueryProjectName = "";
    userQueryList.forEach((query) => {
      if (!/@|#/.test(query)) {
        userQueryProjectName = query;
      }
    });

    let queryTagsList: string[] = [];
    let queryCreatorsList: string[] = [];

    // Get all the tags in userquery
    userQueryList.forEach((query) => {
      if (query.includes("#")) {
        let removeHash = query.replace(/#/g, "");
        queryTagsList.push(removeHash);
      }
    });

    // Get all the users in userquery
    userQueryList.forEach((query) => {
      if (query.includes("@")) {
        let removeAt = query.replace(/@/g, "");
        queryCreatorsList.push(removeAt);
      }
    });
    console.log("taglist", queryTagsList);
    console.log("usersList", queryCreatorsList);

    console.log("userqueryProjectName", userQueryProjectName);

    let showFilteredResult = projectsData;
    showFilteredResult = [];

    if (userQueryProjectName.length > 0) {
      // Using fuse for fuzzy search using project titles
      const fuse = new Fuse(projectsData, {
        keys: ["projectName"],
      });
      const fuzzyResult = fuse.search(userQueryProjectName);
      showFilteredResult = fuzzyResult.map((obj) => obj.item);
    }

    // Set showFilteredResult to project Data if size is 0
    if (showFilteredResult.length === 0) {
      showFilteredResult = projectsData;
    }
    console.log("showfilteredresult", showFilteredResult);

    const filteredTagCreator = showFilteredResult.filter((project) => {
      let hasMatchingTag = queryTagsList.every((tag) =>
        project.tags.includes(tag)
      );

      // Check if any creator matches the creator list
      let hasMatchingCreator = queryCreatorsList.every((creator) =>
        project.creators.includes(creator)
      );

      // If tags list empty, set to true.
      if (queryTagsList.length === 0) {
        hasMatchingTag = true;
      }

      // If creator list is empty, set to true.
      if (queryCreatorsList.length === 0) {
        hasMatchingCreator = true;
      }
      console.log(
        "project name",
        project.projectName,
        hasMatchingTag,
        hasMatchingCreator,
        hasMatchingTag && hasMatchingCreator
      );

      // return true if tag and creator matches
      return hasMatchingTag && hasMatchingCreator;
    });

    console.log(filteredTagCreator.length);
    setShowProjects(filteredTagCreator);

    if (filteredTagCreator.length > 0) {
      setVisibilityNoSearch("hidden");
    } else {
      setVisibilityNoSearch("visible");
    }
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
      <div className={styles.projectCardsContainer}>
        {showProjects.map((project, index) => (
          <div key={index}>
            <ProjectCard
              projectName={project.projectName}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              likes={project.likes}
              numMessages={project.messages.length}
              creators={project.creators}
            />
          </div>
        ))}
      </div>
      <div
        className={styles.noSearchResults}
        style={inlineStyles.noSearchResults}
      >
        Oh no! Looks like nothing came up from you search result. Try a simpler
        search.
      </div>
    </>
  );
};

export default page;
