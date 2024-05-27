"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import TeammateCard from "@/components/teammate/teammate";
import ProjectName from "@/components/projectname/projectname";
import "./page.css";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

const App: React.FC = ({ params }: { params: { slug: string } }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDetails, setProjectDetails] = useState<string>("");
  const [projectImage, setProjectImage] = useState<string>("");
  const [teammates, setTeammates] = useState<string[]>([]);

  const descriptionContent = `
## About This Project

This project showcases the top football players around the world, including Neymar, Messi, and Ronaldo.

### Features

- Professional football players
- Dribbling, speed, technique
- Playmaking, precision
- Heading and athleticism

Enjoy exploring this project!

**Football Allstars Team**
  `;

  const router = useRouter();

  useEffect(() => {
    fetch("/api/project?projectId=" + params.slug)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            alert("Error fetching project details:\n" + data.message);
            router.push("/projects/dashboard");
            throw new Error("Failed to fetch project details");
          });
        }
      })
      .then((data) => {
        setProjectName(data.projectName);
        setProjectDetails(data.longDescription);
        setProjectImage(data.imageUrl);
        setTeammates(data.teammates);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="preview">
      <Navbar />
      <div className="content-container">
        <div className="project-name-container">
          <ProjectName name={projectName} />
          <div className="image-container">
            <img src={projectImage} alt="projectimage" width={600} />
          </div>
        </div>
        <div className="teammates-grid">
          <h2 className="team-header">TEAM:</h2>
          <TeammateCard
            name="Neymar Dos Santos"
            description="Professional football player known for his dribbling skills."
            skills={["Dribbling", "Speed", "Technique"]}
          />
          <TeammateCard
            name="Lionel Messi"
            description="Argentine footballer widely regarded as one of the greatest players of all time."
            skills={["Playmaking", "Precision"]}
          />
          <TeammateCard
            name="Cristiano Ronaldo"
            description="Portuguese footballer known for his goal-scoring ability and athleticism."
            skills={["Heading"]}
          />
        </div>
      </div>
      <div className="description-container">
        <ReactMarkdown>{projectDetails}</ReactMarkdown>
      </div>
    </div>
  );
};

export default App;
