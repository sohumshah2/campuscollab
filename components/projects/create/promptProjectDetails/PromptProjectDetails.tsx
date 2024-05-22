import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";

interface PromptProjectDetailsProps {
  longDescription: string;
  setLongDescription: React.Dispatch<React.SetStateAction<string>>;
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
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
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

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

        <Button className={styles.buttonField} variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
    </div>
  );
};

export default PromptProjectDetails;
