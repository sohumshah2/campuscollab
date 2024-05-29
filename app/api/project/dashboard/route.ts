import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Fetch the all project data
    const projects = await prisma.project.findMany();
    
    // Return the user object with projects
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
