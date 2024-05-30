import { connectToDatabase } from "@/helpers/server-helpers";
import jwt from "jsonwebtoken";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Check if an authorisation token was sent in the request
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    console.log('token', token)
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    // Verify the JWT
    let email;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
      email = (decodedToken as { email: string }).email;
    } catch (verifyError) {
      return NextResponse.json({ message: "Invalid token" + verifyError.message }, { status: 401 });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get the project id from the request
    const projectId = request.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json({ message: "Project ID not found" }, { status: 400 });
    }

    // Check if the project exists
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // Check if the user is a teammate of the project
    if (!project.teammates.includes(user.username)) {
      return NextResponse.json({ message: "User is not a teammate of the project" }, { status: 403 });
    }

    return NextResponse.json({ project });




  } catch (error) {
    if (error.code === 'P2023' && error.meta && error.meta.modelName === 'Project') {
        // Handle the specific error for Project not found when the projectId format is incorrect since prisma throws a different error
        console.error("Project not found");
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    } else {
        // Handle other types of errors
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
}