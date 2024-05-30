import React from 'react';
import Image from 'next/image';
import './eventcard.css';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  formUrl: string;
  eventId: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, imageUrl, formUrl, eventId }) => {
  return (
    <div className="event-card">
      <Link href={`/events/${eventId}`} style={{ textDecoration: "none" }}>
      <div className="event-image">
        <Image src={imageUrl} alt="Event Image" width={600} height={400} />
      </div>
      <div className="event-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={formUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Register Your Interest Now !!!
        </a>
      </div>
      </Link>
    </div>
  );
};

export default EventCard;
