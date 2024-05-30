"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import ProfileDetails from "@/components/profile/ProfileDetails";
import Navbar from "@/components/navbar/navbar";

// PAGE PROFILLEEEE
const Page = () => {

  const [firstName, setFirstName] = useState("Justin");
  const [lastName, setLastName] = useState("Yong");
  const [email, setEmail] = useState("tempMail@email.com");
  const [password, setPassword] = useState("Prahso1930!");
  const [description, setDescription] = useState(
    "Competitive coder - familiar with Python, C"
  );

  return (
    <div className={styles.pageContainer}>
      <Navbar/>
      <ProfileDetails
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default Page;
