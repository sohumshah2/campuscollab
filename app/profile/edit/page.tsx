"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import Select from "react-select";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserProfile: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [selectedTechnologiesOptions, setSelectedTechnologiesOptions] =
    useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://images.pexels.com/photos/16984810/pexels-photo-16984810/free-photo-of-cute-giraffe-head.jpeg"
  );
  const [bio, setBio] = useState("Aspiring developer");

  const accessToken = useSession().data?.user?.accessToken;
  const { data: session, status } = useSession();

  // Redirect the user to the sign in page if they are not signed in
  useEffect(() => {
    if (status !== "loading" && !session) {
      signIn("google");
    }
  }, [session, status]);

  useEffect(() => {
    // Fetch the user's profile data from the database
    const fetchProfileData = async () => {
      const res = await fetch("/api/profile/edit", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        console.error("Failed to fetch profile");
        return;
      }
      const {
        id,
        name,
        email,
        profileImageUrl,
        fullName,
        username,
        bio,
        university,
        course,
        selectedTechnologiesOptions,
      } = await res.json();

      setFullName(fullName);
      setUsername(username);
      setUniversity(university);
      setCourse(course);
      setProfileImageUrl(profileImageUrl);
      setBio(bio);
      setSelectedTechnologiesOptions(
        technologiesOptions.filter((option) =>
          selectedTechnologiesOptions.includes(option.value)
        )
      );
    };
    fetchProfileData();
  }, [accessToken]);

  // Options for the technologies select input
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

  // Handle the change event for the technologies select input
  const handleSelectChange = (selectedOptions) => {
    setSelectedTechnologiesOptions(selectedOptions);
  };

  const router = useRouter();

  // Handle the form submission, sending the form data to the server
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = {
      profileImageUrl,
      fullName,
      username,
      bio,
      university,
      course,
      selectedTechnologiesOptions: selectedTechnologiesOptions.map(
        (option) => option.value
      ),
    };

    // Send the form data to the server, to the /api/profile/edit endpoint
    const res = await fetch("/api/profile/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      console.error("Failed to save profile");

      // Alert the error message
      alert("Failed to save profile\n" + (await res.json()).message);

      return;
    }
    console.log("Profile saved successfully");

    // Redirect to the profile page
    router.push("/profile");
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
      <p></p>

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
            required={true}
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
            required={true}
          />
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            className={styles.inputField}
            as="input"
            placeholder="Enter a brief description about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required={true}
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
            required={true}
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
            required={true}
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
