"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import ProjectCard from "@/components/projects/dashboard/projectCard/projectCard";
import styles from "./styles.module.css";
import Navbar from "@/components/navbar/navbar";
import { useRouter } from "next/navigation";

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  const [profileData, setProfileData] = useState<any>(null);

  const router = useRouter();

  // Get the profile data from the database
  useEffect(() => {
    const fetchProfileData = async () => {
      const res = await fetch(`/api/profile?username=${params.slug}`);
      if (!res.ok) {
        alert("Failed to save profile\n" + (await res.json()).message);
        router.push("/people");
        return;
      }
      const data = await res.json();

      setProfileData(data);
    };

    fetchProfileData();
  }, []);

  if (!profileData) return <div>Loading...</div>;

  return (
    <>
      <Navbar />{" "}
      <Container className={styles.profileContainer}>
        <Row className="justify-content-center">
          <Col md={4} className="text-center">
            <Image
              src={
                profileData.profileImageUrl ||
                "https://images.pexels.com/photos/16984810/pexels-photo-16984810/free-photo-of-cute-giraffe-head.jpeg"
              }
              roundedCircle
              className={styles.profileImage}
            />
          </Col>
          <Col md={8} className={styles.profileDetails}>
            <h2>{profileData.fullName}</h2>
            <p>
              <strong>Username:</strong> {profileData.username}
            </p>
            <p>
              <strong>Bio:</strong> {profileData.bio}
            </p>
            <p>
              <strong>University:</strong> {profileData.university}
            </p>
            <p>
              <strong>Course:</strong> {profileData.course}
            </p>
            <ListGroup horizontal>
              {profileData.selectedTechnologiesOptions.map(
                (tech: string, techIndex: number) => (
                  <div key={techIndex} className={styles.tech}>
                    {tech}
                  </div>
                )
              )}
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4 justify-content-center">
          <Col>
            <p></p>
            <h3 className="text-center">Projects</h3>
            <div
              className={`d-flex flex-wrap justify-content-center ${styles.projectCardsContainer}`}
            >
              {profileData.projects.map((project: any, index: number) => (
                <div key={index} className="m-3">
                  <ProjectCard
                    projectName={project.projectName}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    tags={project.tags}
                    likes={project.likes}
                    numMessages={project.numMessages}
                    creators={project.teammates}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
