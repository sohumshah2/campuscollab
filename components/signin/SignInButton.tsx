"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

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
        }
      };
      fetchProfileData();
    }
  }, [status]);

  const handleSignIn = async () => {
    await signIn("google");
  };

  if (session && session.user) {
    return (
      <div>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return <button onClick={handleSignIn}>Sign in</button>;
};

export default SignInButton;
