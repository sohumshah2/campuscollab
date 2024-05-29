"use client";

import React from "react";
import Navbar from "@/components/navbar/navbar";
import SearchBar from "@/components/searchBar/searchBar";
import Logo from "@/components/logo/logo";
import EventCard from "@/components/eventcard/eventcard";
import "./page.css"; 

const events = [
  {
    title: "Event Title 1",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 2",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 3",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 4",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 5",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 6",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 7",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 8",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 9",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 10",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 11",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
  {
    title: "Event Title 12",
    description: "If you want to meet computer science nerds who haven't touched grass in months, come to this hackathon.",
    imageUrl: "/projectimage.jpg", 
    formUrl: "https://docs.google.com/forms",
  },
];

const Page: React.FC = () => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
