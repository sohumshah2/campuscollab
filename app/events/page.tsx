"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/searchBar/searchBar";
import Logo from "@/components/logo/logo";
import EventCard from "@/components/eventcard/eventcard";
import "./page.css";
import EventSearchBar from "@/components/eventSearchBar/eventSearchBar";

const Page: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);


  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        // Update the events array with the fetched data
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filterEvents = (query:string) => {
    const queryList = query.split(",").map((q) => q.trim().toLowerCase());
    console
    const filteredResults = events.filter((event) => {
      const nameMatch = event.eventName.toLowerCase().includes(query.toLowerCase());
      // const tagMatch = person.selectedTechnologiesOptions.some(
      //   (selectedTechnologiesOptions) =>
      //     queryList.includes(`#${selectedTechnologiesOptions.toLowerCase()}`)
      // );

      // return nameMatch || tagMatch;
      return nameMatch;

    });

    setFilteredEvents(filteredResults.length ? filteredResults : events);
  };

  return (
    <div>
      <Navbar />
      <div className="search-logo-container">
        <Logo />
        <EventSearchBar filterSearch={filterEvents} />
      </div>
      <div className="event-container">
        {filteredEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
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
