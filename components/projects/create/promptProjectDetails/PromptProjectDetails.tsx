import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import Select from "react-select";

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
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log({
      projectName,
      description,
      imageUrl,
      longDescription,
      teammates: selectedTeammates.map((teammate) => teammate.value),
    });
  };

  const teammatesOptions = [
    { value: 'sohumshah2', label: 'sohumshah2', imageUrl: 'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LnBuZw.png' },
    { value: 'hungryhippo', label: 'hungryhippo', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8SMSgLY1oyhq0pPR2O4ziMQxsBumRpw_l236G_K4KUA&s' },
  ];
    
    // Handle the change event for the teammates select input
    const handleSelectChange = (selectedOptions) => {
      setSelectedTeammates(selectedOptions);
    };

    const formatOptionLabel = ({ label, imageUrl }) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={imageUrl} alt={label} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />
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


        <Button className={styles.buttonField} variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
    </div>
  );
};

export default PromptProjectDetails;
