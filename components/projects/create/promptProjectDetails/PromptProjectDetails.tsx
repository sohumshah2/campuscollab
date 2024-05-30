import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import Select from "react-select";
import axios from "axios";
import { useRouter } from "next/navigation";

import TagsSelect from "./TagsSelect";

interface PromptProjectDetailsProps {
  longDescription: string;
  setLongDescription: React.Dispatch<React.SetStateAction<string>>;
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  selectedTeammates: any;
  setSelectedTeammates: any;
  tags: any;
  setTags: any;
}

const PromptProjectDetails: React.FC<PromptProjectDetailsProps> = ({
  longDescription,
  setLongDescription,
  projectName,
  setProjectName,
  description,
  setDescription,
  imageUrl,
  setImageUrl,
  selectedTeammates,
  setSelectedTeammates,
  tags,
  setTags,
}) => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("selected", selectedTeammates);
    const teamMatesList = selectedTeammates.map((teammate) => teammate.value);
    try {
      const response = await axios.post("/api/project/create", {
        projectName,
        description,
        imageUrl,
        longDescription,
        teamMatesList,
      });
      console.log("Project created:", response.data);
      router.push("/projects/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("failed to create project");
    }
    console.log({
      projectName,
      description,
      imageUrl,
      longDescription,
      teammates: selectedTeammates.map((teammate) => teammate.value),
      tags: tags.map((tag) => tag.value),
    });
  };

  const [teammatesOptions, setTeammatesOptions] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("/api/people");
        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }
        const data = await response.json();
        setTeammatesOptions(
          data.map((person) => ({
            value: person.username,
            label: person.username,
            imageUrl: person.profileImageUrl,
          }))
        );
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    fetchPeople();
  }, []);

  // Handle the change event for the teammates select input
  const handleSelectChange = (selectedOptions) => {
    setSelectedTeammates(selectedOptions);
  };

  const formatOptionLabel = ({ label, imageUrl }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={imageUrl}
        alt={label}
        style={{ width: 30, height: 30, borderRadius: "50%", marginRight: 10 }}
      />
      <span>{label}</span>
    </div>
  );

  return (
    <div>
      <h2>Create New Project</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className={styles.textareaField}
            as="textarea"
            rows={3}
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            className={styles.inputField}
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="longDescription">
          <Form.Label>Provide more details</Form.Label>
          <Form.Control
            as="textarea"
            className={`${styles.textareaField} ${styles.longDescription}`}
            placeholder="Add more details about the project"
            value={longDescription}
            onChange={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + 10 + "px";
              setLongDescription(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="collaborators">
          <Form.Label>Teammates</Form.Label>
          <Select
            isMulti
            options={teammatesOptions}
            formatOptionLabel={formatOptionLabel}
            value={selectedTeammates}
            onChange={handleSelectChange}
          />
        </Form.Group>

        <p></p>

        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <TagsSelect tags={tags} setTags={setTags} />
        </Form.Group>
        <p></p>

        <Button className={styles.buttonField} variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
    </div>
  );
};

export default PromptProjectDetails;
