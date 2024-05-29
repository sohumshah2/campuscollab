import React from 'react';
import Image from 'next/image';
import './EventCard.css';

interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  formUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, imageUrl, formUrl }) => {
  return (
    <div className="event-card">
      <div className="event-image">
        <Image src={imageUrl} alt="Event Image" width={600} height={400} />
      </div>
      <div className="event-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={formUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Interested
        </a>
      </div>
    </div>
  );
};

export default EventCard;
