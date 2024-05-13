"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import Select from "react-select";

const UserProfile: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [selectedTechnologiesOptions, setSelectedTechnologiesOptions] =
    useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleSelectChange = (selectedOptions) => {
    setSelectedTechnologiesOptions(selectedOptions);
  };

  const technologiesOptions = [
    { value: "html-css", label: "HTML / CSS" },
    { value: "javascript-typescript", label: "JavaScript / TypeScript" },
    { value: "python", label: "Python" },
    { value: "c", label: "C" },
    { value: "c-sharp", label: "C#" },
    { value: "c-plus-plus", label: "C++" },
    { value: "java", label: "Java" },
    { value: "react", label: "React.js" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue.js" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "tailwind", label: "Tailwind" },
    { value: "sql", label: "SQL" },
    { value: "express", label: "Express.js" },
    { value: "next", label: "Next.js" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = {
      profileImageUrl,
      fullName,
      username,
      university,
      course,
      selectedTechnologiesOptions,
    };
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <h2>Set Up Your Profile</h2>
      <img
        src={
          profileImageUrl ||
          "https://images.pexels.com/photos/16984810/pexels-photo-16984810/free-photo-of-cute-giraffe-head.jpeg"
        }
        alt="Profile"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://images.pexels.com/photos/16984810/pexels-photo-16984810/free-photo-of-cute-giraffe-head.jpeg";
        }}
        className={styles.profileImage}
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="profileImage">
          <Form.Label>Profile Image URL</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="input"
            placeholder="Enter image URL"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="university">
          <Form.Label>University</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            placeholder="Enter university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="course">
          <Form.Label>Course</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            placeholder="Enter course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="languagesTechnologies">
          <Form.Label>Languages/Technologies Known</Form.Label>
          <Select
            isMulti
            options={technologiesOptions}
            value={selectedTechnologiesOptions}
            onChange={handleSelectChange}
          />
        </Form.Group>

        <Button className={styles.buttonField} variant="primary" type="submit">
          Save Profile
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;
