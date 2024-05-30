import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get the username from the query string
    const username = request.nextUrl.searchParams.get("username");
    if (!username) {
      return NextResponse.json(
        { message: "Username not found" },
        { status: 400 }
      );
    }

    // Fetch the user's profile data
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Grab the user's projects
    // Find the projects where the usernaem is in the teammates array
    const projects = await prisma.project.findMany({
      where: { teammates: { has: username } },
    });

    // Remove the email property from the user object
    const { id, email, ...userWithoutEmail } = user;

    // Add the projects property to the user object
    const userWithProjects = { ...userWithoutEmail, projects };

    // Return the user object with projects
    return NextResponse.json(userWithProjects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
