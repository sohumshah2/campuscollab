// TeammateCard.tsx
import React from 'react';
import Image from 'next/image';
import './teammate.css';

interface TeammateCardProps {
    name: string;
    description: string;
    skills: string[]; 
}

const TeammateCard: React.FC<TeammateCardProps> = ({ name, description, skills }: TeammateCardProps) => {
  return (
    <div className="teammate-card">
      <div className="profile-icon-img">
        <Image
          src="/profile.png"
          alt="Profile Icon"
          width={100}
          height={100}
        />
      </div>
      <div className="teammate-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="skills">
          {skills.map((skill, index) => (
            <div key={index} className="skill">{skill}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeammateCard;
