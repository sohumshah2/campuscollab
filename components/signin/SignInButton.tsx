"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();
  console.log("session", session);

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
