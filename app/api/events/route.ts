import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const events = await prisma.event.findMany();
    return NextResponse.json(events);

  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}