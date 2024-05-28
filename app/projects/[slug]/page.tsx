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
  const [teammates, setTeammates] = useState([]);

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

        // For each teammate, fetch the teammate details
        data.teammates.forEach((teammateId: string) => {
          fetch("/api/profile?username=" + teammateId)
            .then((response) => {
              if (response.ok) return response.json();
              console.error("Error fetching teammate details:", response);
            })
            .then((data) => {
              if (!data) return;
              console.log("data", data);
              console.log("profileImageUrl", data.profileImageUrl);
              setTeammates((prevTeammates) => [
                ...prevTeammates,
                {
                  name: data.name,
                  description: data.bio,
                  skills: data.selectedTechnologiesOptions,
                  username: data.username,
                  profileImageUrl: data.profileImageUrl,
                },
              ]);
            });
        });
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

          {teammates.map((teammate) => (
            <TeammateCard
              name={teammate.name}
              description={teammate.description}
              skills={teammate.skills}
              username={teammate.username}
              profileImageUrl={teammate.profileImageUrl}
            />
          ))}
        </div>
      </div>
      <div className="description-container">
        <ReactMarkdown>{projectDetails}</ReactMarkdown>
      </div>
    </div>
  );
};

export default App;
