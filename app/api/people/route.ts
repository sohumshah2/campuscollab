import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get the username from the query string
    // const username = request.nextUrl.searchParams.get("username");
    // if (!username) {
    //   return NextResponse.json(
    //     { message: "Username not found" },
    //     { status: 400 }
    //   );
    // }

    // Fetch the user's profile data
    const users = await prisma.user.findMany();
    

    
    // Return the user object with projects
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}