"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { BoxArrowInRight, BoxArrowInLeft } from "react-bootstrap-icons";

const SignInButton = () => {
  const { data: session, status } = useSession();
  console.log("session", session);

  // Redirect the user to the profile edit page if they haven't set up their profile
  useEffect(() => {
    if (
      status === "authenticated" &&
      window.location.pathname !== "/profile/edit"
    ) {
      const fetchProfileData = async () => {
        const response = await fetch("/api/profile/edit", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        });
        const data = await response.json();
        if (!data.username) {
          window.location.href = "/profile/edit";
        } else {
          localStorage.setItem("username", data.username);
        }
      };
      fetchProfileData();
    }
  }, [status]);

  const handleSignIn = async () => {
    await signIn("google");
    // Update the username in localstorage
    localStorage.setItem("username", session?.user?.username || "");
  };

  if (session && session.user) {
    return (
      <BoxArrowInLeft title="Sign Out" onClick={() => signOut()}>
        Sign out
      </BoxArrowInLeft>
    );
  }
  return (
    <BoxArrowInRight title="Sign In" onClick={handleSignIn}>
      Sign in
    </BoxArrowInRight>
  );
};

export default SignInButton;
