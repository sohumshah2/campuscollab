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
      projectName,
      description,
      longDescription,
      imageUrl,
      selectedTeamMatesList,
      selectedTagsList,
    } = await request.json();
    // console.log('tags in route', tags);
    // console.log('selected teammmates in route', selectedTeammates);

    // Add in Tags later
    if (
      !projectName ||
      !description ||
      !longDescription
      // !selectedTeammates
    ) {
      return NextResponse.json(
        { message: `Please fill in all required fields ${projectName}, ${description}, ${longDescription}, ${imageUrl}, ${selectedTeamMatesList}` },
        { status: 400 }
      );
    }



    // // Check if an authorisation token was sent in the request
    // const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    // if (!token) {
    //   return NextResponse.json({ message: "Token not found" }, { status: 401 });
    // }

    // // Verify the JWT
    // let email;
    // try {
    //   const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    //   email = (decodedToken as { email: string }).email;
    // } catch (verifyError) {
    //   return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    // }

    // Hardcoded tags for now
    // const tags = ['hardcodedTag'];
    // const hardCodedTeamMates = ['hardcoded user']
    const newProject = await prisma.project.create({
      data: {
        projectName: projectName,
        description: description,
        longDescription: longDescription,
        imageUrl: imageUrl,
        teammates: selectedTeamMatesList,
        tags: selectedTagsList,
      },
    });

    if (!newProject) {
      return NextResponse.json(
        { message: {
          projectName: projectName,
          description: description,
          longDescription: longDescription,
          imageUrl: imageUrl,
          teammates: selectedTeamMatesList,
          tags: selectedTagsList,
        } },
        { status: 500 }
      );
    }
    

    return NextResponse.json(
      { message: "Project created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('create route error',error);
    console.log('create route error',error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
