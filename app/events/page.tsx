"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/searchBar/searchBar";
import Logo from "@/components/logo/logo";
import EventCard from "@/components/eventcard/eventcard";
import "./page.css";

const Page: React.FC = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        // Update the events array with the fetched data
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="search-logo-container">
        <Logo />
        <SearchBar />
      </div>
      <div className="event-container">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
            formUrl={event.formUrl}
            eventId={event.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
