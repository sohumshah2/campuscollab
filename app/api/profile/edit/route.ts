import { connectToDatabase } from "@/helpers/server-helpers";
import jwt from "jsonwebtoken";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Check if an authorisation token was sent in the request
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    // Verify the JWT
    let email;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
      email = (decodedToken as { email: string }).email;
    } catch (verifyError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user's profile
    return NextResponse.json({ ...user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const {
      profileImageUrl,
      fullName,
      username,
      bio,
      university,
      course,
      selectedTechnologiesOptions,
    } = await request.json();

    console.log(bio);

    if (
      !fullName ||
      !username ||
      !bio ||
      !university ||
      !course ||
      !selectedTechnologiesOptions
    ) {
      return NextResponse.json(
        { message: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Check if an authorisation token was sent in the request
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    // Verify the JWT
    let email;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
      email = (decodedToken as { email: string }).email;
    } catch (verifyError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser && existingUser.email !== email) {
      return NextResponse.json(
        { message: "Username is already taken" },
        { status: 400 }
      );
    }

    // Update the user's profile
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        profileImageUrl,
        fullName,
        username,
        bio,
        university,
        course,
        selectedTechnologiesOptions,
      },
    });

    // If the username changed, update the username in the projects
    if (user.username !== username) {
      // Find all projects where the user is a teammate
      const projects = await prisma.project.findMany({
        where: { teammates: { has: user.username } },
      });

      // Update each project's teammates array
      for (const project of projects) {
        const updatedTeammates = project.teammates.map((teammate) =>
          teammate === user.username ? username : teammate
        );

        await prisma.project.update({
          where: { id: project.id },
          data: { teammates: updatedTeammates },
        });
      }
    }

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
