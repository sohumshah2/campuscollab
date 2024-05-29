import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get the project details of the project queried
    const projectId = request.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID not found" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...project }, { status: 200 });
  } catch (error) {
    if (
      error.message.includes(
        "provided hex string representation must be exactly 12 bytes"
      )
    ) {
      return NextResponse.json(
        { message: "Invalid project id" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
