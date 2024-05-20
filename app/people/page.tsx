"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Logo from "@/components/logo/logo";
import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/searchBar/searchBar";

const Page = () => {
// Sample People data
const peopleData = [
  {
    personName: 'James Liu',
    description: 'I’m a full-stack developer, passionate about AI',
    tags: ['HTML', 'CSS', 'Javascript'],
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    personName: 'Sam Peters',
    description: 'Looking for strong team members! Experienced Dev',
    tags: ['Java', 'C++', 'Haskell', 'Swift'],
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    personName: 'Mary Wang',
    description: 'First year, just looking for a new experience!',
    tags: ['Python', 'C'],
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
];

const [filteredPeople, setFilteredPeople] = useState(peopleData);

const filterPeople = (query) => {
  const queryList = query.split(',').map(q => q.trim());
  
  let filteredResults = peopleData.filter(person => {
    const nameMatch = person.personName.toLowerCase().includes(query.toLowerCase());
    const tagMatch = person.tags.some(tag => queryList.includes(`#${tag.toLowerCase()}`));
    
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
            <img
              src={person.imageUrl}
              alt={person.personName}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.personInfo}>
            <h2>{person.personName}</h2>
            <p>{person.description}</p>
            <div className={styles.tagsContainer}>
              {person.tags.map((tag, tagIndex) => (
                <div key={tagIndex} className={styles.tag}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Page;
