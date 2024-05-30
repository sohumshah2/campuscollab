"use client";

import PromptProjectDetails from "@/components/projects/create/promptProjectDetails/PromptProjectDetails";
import React, { useState } from "react";
import styles from "./styles.module.css";
import PreviewPage from "@/components/projects/create/previewPage/previewPage";
import Navbar from "@/components/navbar/navbar";

const Page = ({ params }: { params: { slug: string } }) => {
  const [projectName, setProjectName] = useState("My Project");
  const [description, setDescription] = useState(
    "This is a project description."
  );
  const [imageUrl, setImageUrl] = useState(
    "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg"
  );
  const [selectedTeammates, setSelectedTeammates] = useState([]);

  const [longDescription, setLongDescription] = useState(`### About the project
- This is a project about something.

### Who we're looking for
- We are looking for someone who is very good at something.


### Contact details
- Discord: @someone
- Email: someone@somedomain.com
`);
const [tags, setTags] = useState([]);


  console.log("params", params.slug);

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.leftHalf}>
          <PromptProjectDetails
            longDescription={longDescription}
            setLongDescription={setLongDescription}
            projectName={projectName}
            setProjectName={setProjectName}
            description={description}
            setDescription={setDescription}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            selectedTeammates={selectedTeammates}
            setSelectedTeammates={setSelectedTeammates}
            tags={tags}
            setTags={setTags}
          />
        </div>
        <div className={styles.rightHalf}>
          <div className={styles.previewContainer}>
            <h2>Preview</h2>
            <div className={styles.previewContent}>
              <PreviewPage
                longDescription={longDescription}
                projectName={projectName}
                description={description}
                imageUrl={imageUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
