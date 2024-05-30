"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import TeammateCard from "@/components/teammate/teammate";
import ProjectName from "@/components/projectname/projectname";
import "./page.css";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

const App: React.FC = ({ params }: { params: { slug: string } }) => {
  const [eventName, setEventName] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<string>("");
  const [eventImage, setEventImage] = useState<string>("");
  const [teammates, setTeammates] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/event?eventId=" + params.slug)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            alert("Error fetching event details:\n" + data.message);
            router.push("/events");
            throw new Error("Failed to fetch event details");
          });
        }
      })
      .then((data) => {
        setEventName(data.eventName);
        setEventDetails(data.longDescription);
        setEventImage(data.imageUrl);

        
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
          <ProjectName name={eventName} />
          <div className="image-container">
            <img src={eventImage} alt="projectimage" width={600} />
          </div>
        </div>
        <div className="teammates-grid">

          
        </div>
      </div>
      <div className="description-container">
        <ReactMarkdown>{eventDetails}</ReactMarkdown>
      </div>
    </div>
  );
};

export default App;
