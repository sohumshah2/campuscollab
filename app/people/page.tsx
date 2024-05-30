"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Logo from "@/components/logo/logo";
import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/peopleSearchBar/peopleSearchBar";

export const dynamic = "force-dynamic";

const Page = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("/api/people");
        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }
        const data = await response.json();
        setPeopleData(data);
        setFilteredPeople(data);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    fetchPeople();
  }, []);

  const filterPeople = (query) => {
    const queryList = query.split(",").map((q) => q.trim().toLowerCase());

    const filteredResults = peopleData.filter((person) => {
      const nameMatch = person.name.toLowerCase().includes(query.toLowerCase());
      const tagMatch = person.selectedTechnologiesOptions.some(
        (selectedTechnologiesOptions) =>
          queryList.includes(`#${selectedTechnologiesOptions.toLowerCase()}`)
      );

      return nameMatch || tagMatch;
    });

    setFilteredPeople(filteredResults.length ? filteredResults : peopleData);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <Logo />
      <SearchBar filterSearch={filterPeople} />
      <div className={styles.peopleContainer}>
        {filteredPeople.map((person, index) => (
          <div key={index} className={styles.personContainer}>
            <div className={styles.profileImageContainer}>
              <a href={`/people/${person.username}`}>
                <img
                  src={
                    person.profileImageUrl ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt={person.name}
                  className={styles.profileImage}
                />
              </a>
            </div>
            <div className={styles.personInfo}>
              <h2 className={styles.personName}>{person.name}</h2>
              <p className={styles.personBio}>{person.bio}</p>
              <div className={styles.tagsContainer}>
                {person.selectedTechnologiesOptions.map(
                  (selectedTechnologiesOptions, tagIndex) => (
                    <div key={tagIndex} className={styles.tag}>
                      {selectedTechnologiesOptions}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
