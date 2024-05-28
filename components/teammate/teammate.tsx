import React from "react";
import { Image } from "react-bootstrap";
import Link from "next/link";
import "./teammate.css";

interface TeammateCardProps {
  name: string;
  description: string;
  skills: string[];
  username: string;
  profileImageUrl: string;
}

const TeammateCard: React.FC<TeammateCardProps> = ({
  name,
  description,
  skills,
  username,
  profileImageUrl,
}: TeammateCardProps) => {
  return (
    <Link
      href={`/people/${username}`}
      style={{ textDecoration: "none" }}
      passHref
    >
      <div className="teammate-card">
        <div className="profile-icon-img">
          <Image
            src={
              profileImageUrl ||
              "https://images.pexels.com/photos/16984810/pexels-photo-16984810/free-photo-of-cute-giraffe-head.jpeg"
            }
            roundedCircle
            className="profileImage"
          />
        </div>
        <div className="teammate-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <div className="skills">
            {skills.map((skill, index) => (
              <div key={index} className="skill">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeammateCard;
